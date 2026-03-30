/**
 * @description 디지털 집사 — Supabase DB 스키마
 * DDD 엔티티 문서(docs/entities/) 기반으로 설계
 *
 * 테이블 5개: users, chat_sessions, chat_messages, tickets, subscriptions
 * Enum 7개: user_role, session_status, session_category, message_role,
 *           ticket_status, ticket_priority, subscription_plan, subscription_status
 * RLS 정책: 역할별 접근 제어
 *
 * 실행 방법: Supabase Dashboard → SQL Editor → 이 파일 전체 붙여넣기 → Run
 */

-- ============================================
-- 1. ENUM 타입 생성
-- ============================================

-- 사용자 역할: 시니어/가족/상담원/관리자
CREATE TYPE user_role AS ENUM ('SENIOR', 'FAMILY', 'AGENT', 'ADMIN');

-- 대화 세션 상태: 진행중/상담원전달/해결됨
CREATE TYPE session_status AS ENUM ('ACTIVE', 'ESCALATED', 'RESOLVED');

-- 17개 서비스 카테고리
CREATE TYPE session_category AS ENUM (
  'KIOSK',           -- 키오스크 주문
  'DELIVERY',        -- 배달앱 주문
  'BANKING',         -- 모바일뱅킹
  'TRANSPORT',       -- 교통 예매 (KTX/항공)
  'HOSPITAL',        -- 병원 예약
  'GOVERNMENT',      -- 정부24/민원
  'SHOPPING',        -- 온라인 쇼핑
  'PHONE_SETTINGS',  -- 스마트폰 설정
  'APP_INSTALL',     -- 앱 설치/삭제
  'WIFI',            -- 와이파이/인터넷
  'PHOTO',           -- 사진/영상 관리
  'SNS',             -- SNS/메신저
  'SECURITY',        -- 보이스피싱 방어
  'INSURANCE',       -- 보험/공과금
  'ENTERTAINMENT',   -- 영화/공연 예매
  'FOOD_ORDER',      -- 음식 주문
  'OTHER'            -- 기타
);

-- 메시지 발신자: 사용자/AI/상담원
CREATE TYPE message_role AS ENUM ('USER', 'AI', 'AGENT');

-- 상담 티켓 상태
CREATE TYPE ticket_status AS ENUM ('PENDING', 'IN_PROGRESS', 'RESOLVED');

-- 상담 티켓 우선순위
CREATE TYPE ticket_priority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- 구독 플랜
CREATE TYPE subscription_plan AS ENUM ('FREE_TRIAL', 'CREDIT', 'LIGHT', 'STANDARD', 'FAMILY');

-- 구독 상태
CREATE TYPE subscription_status AS ENUM ('ACTIVE', 'CANCELLED', 'EXPIRED', 'TRIAL');

-- 해결 주체
CREATE TYPE resolved_by_type AS ENUM ('AI', 'AGENT');


-- ============================================
-- 2. 테이블 생성
-- ============================================

-- ---- users: 서비스 사용자 (시니어, 가족, 상담원, 관리자) ----
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT NOT NULL,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'SENIOR',
  kakao_id TEXT UNIQUE,           -- 카카오톡 연동 ID (시니어)
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 인덱스: 카카오 ID로 시니어 빠른 조회
CREATE INDEX idx_users_kakao_id ON users(kakao_id) WHERE kakao_id IS NOT NULL;
CREATE INDEX idx_users_role ON users(role);

-- updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ---- chat_sessions: 카카오톡 대화 세션 ----
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category session_category,
  status session_status NOT NULL DEFAULT 'ACTIVE',
  resolved_by resolved_by_type,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX idx_chat_sessions_status ON chat_sessions(status);

CREATE TRIGGER set_chat_sessions_updated_at
  BEFORE UPDATE ON chat_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ---- chat_messages: 개별 메시지 ----
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role message_role NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB,                 -- AI 분석 결과, 카테고리, 신뢰도, 피싱 감지 등
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at);


-- ---- tickets: 상담원 에스컬레이션 티켓 ----
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  assigned_agent_id UUID REFERENCES users(id),
  status ticket_status NOT NULL DEFAULT 'PENDING',
  priority ticket_priority NOT NULL DEFAULT 'MEDIUM',
  category session_category NOT NULL,
  resolved_at TIMESTAMPTZ,
  satisfaction INT CHECK (satisfaction >= 1 AND satisfaction <= 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_assigned_agent ON tickets(assigned_agent_id);
CREATE INDEX idx_tickets_priority ON tickets(priority);


-- ---- subscriptions: 구독/충전 정보 ----
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  payer_id UUID NOT NULL REFERENCES users(id),  -- 결제자 (자녀 또는 본인)
  plan subscription_plan NOT NULL DEFAULT 'FREE_TRIAL',
  status subscription_status NOT NULL DEFAULT 'TRIAL',
  credit_balance INT DEFAULT 0,                   -- 충전 잔액 (충전제만)
  trial_ends_at TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);


-- ---- family_links: 가족 연결 (자녀 ↔ 부모) ----
CREATE TABLE family_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,   -- 자녀
  senior_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,   -- 부모
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACCEPTED', 'REJECTED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(family_id, senior_id)
);

CREATE INDEX idx_family_links_family ON family_links(family_id);
CREATE INDEX idx_family_links_senior ON family_links(senior_id);


-- ============================================
-- 3. RLS (Row Level Security) 정책
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_links ENABLE ROW LEVEL SECURITY;

-- users: 본인 정보만 조회/수정, ADMIN은 전체 접근
CREATE POLICY "users_select_own" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_select_admin" ON users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ADMIN')
  );

CREATE POLICY "users_update_own" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "users_insert_own" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- chat_sessions: 본인 세션 + 상담원/관리자는 ESCALATED 세션 접근
CREATE POLICY "sessions_select_own" ON chat_sessions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "sessions_select_agent" ON chat_sessions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('AGENT', 'ADMIN'))
  );

-- chat_messages: 세션 접근 가능하면 메시지도 접근 가능
CREATE POLICY "messages_select" ON chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM chat_sessions cs
      WHERE cs.id = chat_messages.session_id
      AND (cs.user_id = auth.uid()
           OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('AGENT', 'ADMIN')))
    )
  );

-- tickets: 상담원/관리자만 접근
CREATE POLICY "tickets_select_agent" ON tickets
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('AGENT', 'ADMIN'))
  );

-- subscriptions: 본인 구독 + 결제자 접근
CREATE POLICY "subs_select" ON subscriptions
  FOR SELECT USING (user_id = auth.uid() OR payer_id = auth.uid());

-- family_links: 연결된 가족만 접근
CREATE POLICY "family_select" ON family_links
  FOR SELECT USING (family_id = auth.uid() OR senior_id = auth.uid());

CREATE POLICY "family_insert" ON family_links
  FOR INSERT WITH CHECK (family_id = auth.uid());


-- ============================================
-- 4. 초기 데이터 (테스트용)
-- ============================================
-- Supabase Auth에서 사용자 생성 후, users 테이블에 INSERT 필요
-- 시드 데이터는 별도 seed.sql 또는 앱에서 처리
