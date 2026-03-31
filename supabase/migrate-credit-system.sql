/**
 * @description 크레딧(충전제) 시스템 마이그레이션
 * 실행 시점: Supabase 프로젝트 생성 후, schema.sql 실행 이후
 *
 * 추가 테이블 2개: credit_wallets, credit_transactions
 * 추가 Enum 2개: service_tier, credit_transaction_type
 * 추가 함수 1개: deduct_credit (동시성 안전 차감)
 */

-- ============================================
-- 1. ENUM 타입
-- ============================================

-- 서비스 등급 (크레딧 차감 단가 기준)
CREATE TYPE service_tier AS ENUM (
  'AI_CHAT',           -- AI 상담 (무료)
  'SIMPLE_AGENCY',     -- 간단 대행 (1,500원)
  'STANDARD_AGENCY',   -- 일반 대행 (3,000원)
  'COMPLEX_AGENCY'     -- 복합 대행 (5,000원)
);

-- 크레딧 트랜잭션 유형
CREATE TYPE credit_transaction_type AS ENUM (
  'CHARGE',         -- 충전
  'USE',            -- 사용 (차감)
  'REFUND',         -- 환불
  'BONUS',          -- 보너스
  'EXPIRE',         -- 만료
  'WELCOME',        -- 가입 환영 크레딧
  'FAMILY_CHARGE'   -- 가족 대리 충전
);

-- ============================================
-- 2. 크레딧 지갑 테이블
-- ============================================

CREATE TABLE credit_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  balance INT NOT NULL DEFAULT 0 CHECK (balance >= 0),  -- 잔액 (음수 불가)
  total_charged INT NOT NULL DEFAULT 0,                  -- 누적 충전액
  total_used INT NOT NULL DEFAULT 0,                     -- 누적 사용액
  expiry_date TIMESTAMPTZ,                               -- 크레딧 만료일 (충전 시 연장)
  welcome_credit_given BOOLEAN NOT NULL DEFAULT false,   -- 환영 크레딧 지급 여부
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)  -- 사용자당 지갑 1개
);

CREATE INDEX idx_credit_wallets_user_id ON credit_wallets(user_id);

-- ============================================
-- 3. 크레딧 트랜잭션 이력 테이블
-- ============================================

CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  wallet_id UUID NOT NULL REFERENCES credit_wallets(id) ON DELETE CASCADE,
  type credit_transaction_type NOT NULL,
  amount INT NOT NULL,                                   -- 양수: 충전/환불/보너스, 음수: 사용
  balance_after INT NOT NULL,                            -- 트랜잭션 후 잔액
  description TEXT NOT NULL,                             -- "일반 대행 — 쿠팡 주문" 등
  service_tier service_tier,                             -- 사용 시에만
  session_id UUID REFERENCES chat_sessions(id),          -- 채팅 세션 연결 (선택)
  charged_by UUID REFERENCES users(id),                  -- 가족 충전 시 충전자 ID (자녀 등)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_credit_tx_user_id ON credit_transactions(user_id);
CREATE INDEX idx_credit_tx_wallet_id ON credit_transactions(wallet_id);
CREATE INDEX idx_credit_tx_created_at ON credit_transactions(created_at DESC);
CREATE INDEX idx_credit_tx_type ON credit_transactions(type);

-- ============================================
-- 4. 크레딧 차감 함수 (동시성 안전)
-- ============================================
-- FOR UPDATE로 행 잠금 → race condition 방지
-- 잔액 부족 시 예외 발생

CREATE OR REPLACE FUNCTION deduct_credit(
  p_user_id UUID,
  p_amount INT,
  p_description TEXT,
  p_service_tier service_tier DEFAULT NULL,
  p_session_id UUID DEFAULT NULL
) RETURNS TABLE(new_balance INT, transaction_id UUID) AS $$
DECLARE
  v_wallet credit_wallets%ROWTYPE;
  v_new_balance INT;
  v_tx_id UUID;
BEGIN
  -- 지갑 조회 + 행 잠금 (다른 트랜잭션 대기)
  SELECT * INTO v_wallet
  FROM credit_wallets
  WHERE user_id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION '지갑이 존재하지 않습니다 (user_id: %)', p_user_id;
  END IF;

  -- 무료 서비스 (AI 상담)는 차감 없이 이력만 기록
  IF p_amount = 0 THEN
    INSERT INTO credit_transactions (user_id, wallet_id, type, amount, balance_after, description, service_tier, session_id)
    VALUES (p_user_id, v_wallet.id, 'USE', 0, v_wallet.balance, p_description, p_service_tier, p_session_id)
    RETURNING id INTO v_tx_id;

    RETURN QUERY SELECT v_wallet.balance, v_tx_id;
    RETURN;
  END IF;

  -- 잔액 확인
  v_new_balance := v_wallet.balance - p_amount;
  IF v_new_balance < 0 THEN
    RAISE EXCEPTION '잔액이 부족합니다 (현재: %원, 필요: %원)', v_wallet.balance, p_amount;
  END IF;

  -- 잔액 차감
  UPDATE credit_wallets
  SET balance = v_new_balance,
      total_used = total_used + p_amount,
      updated_at = NOW()
  WHERE id = v_wallet.id;

  -- 트랜잭션 기록
  INSERT INTO credit_transactions (user_id, wallet_id, type, amount, balance_after, description, service_tier, session_id)
  VALUES (p_user_id, v_wallet.id, 'USE', -p_amount, v_new_balance, p_description, p_service_tier, p_session_id)
  RETURNING id INTO v_tx_id;

  RETURN QUERY SELECT v_new_balance, v_tx_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 5. 크레딧 충전 함수
-- ============================================

CREATE OR REPLACE FUNCTION charge_credit(
  p_user_id UUID,
  p_amount INT,
  p_bonus INT DEFAULT 0,
  p_description TEXT DEFAULT '충전'
) RETURNS TABLE(new_balance INT, transaction_id UUID) AS $$
DECLARE
  v_wallet credit_wallets%ROWTYPE;
  v_new_balance INT;
  v_tx_id UUID;
BEGIN
  -- 지갑 없으면 자동 생성
  INSERT INTO credit_wallets (user_id, balance, total_charged)
  VALUES (p_user_id, 0, 0)
  ON CONFLICT (user_id) DO NOTHING;

  -- 지갑 조회 + 행 잠금
  SELECT * INTO v_wallet
  FROM credit_wallets
  WHERE user_id = p_user_id
  FOR UPDATE;

  -- 충전 금액 반영
  v_new_balance := v_wallet.balance + p_amount + p_bonus;

  UPDATE credit_wallets
  SET balance = v_new_balance,
      total_charged = total_charged + p_amount + p_bonus,
      expiry_date = NOW() + INTERVAL '365 days',  -- 충전 시 만료일 연장 (1년)
      updated_at = NOW()
  WHERE id = v_wallet.id;

  -- 충전 트랜잭션
  INSERT INTO credit_transactions (user_id, wallet_id, type, amount, balance_after, description)
  VALUES (p_user_id, v_wallet.id, 'CHARGE', p_amount, v_wallet.balance + p_amount, p_description)
  RETURNING id INTO v_tx_id;

  -- 보너스가 있으면 별도 트랜잭션
  IF p_bonus > 0 THEN
    INSERT INTO credit_transactions (user_id, wallet_id, type, amount, balance_after, description)
    VALUES (p_user_id, v_wallet.id, 'BONUS', p_bonus, v_new_balance, '충전 보너스 +' || p_bonus || '원');
  END IF;

  RETURN QUERY SELECT v_new_balance, v_tx_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 6. RLS 정책 (Row Level Security)
-- ============================================

ALTER TABLE credit_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- 본인 지갑만 조회 가능
CREATE POLICY "wallet_select_own" ON credit_wallets
  FOR SELECT USING (user_id = auth.uid());

-- 본인 트랜잭션만 조회 가능
CREATE POLICY "tx_select_own" ON credit_transactions
  FOR SELECT USING (user_id = auth.uid());

-- INSERT/UPDATE/DELETE는 서버 측 (service_role)에서만 가능
-- 클라이언트에서 직접 잔액 수정 불가

-- ============================================
-- 7. 서비스 단가 테이블 (관리자 수정 가능)
-- ============================================

CREATE TABLE service_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier service_tier NOT NULL UNIQUE,
  name TEXT NOT NULL,
  price INT NOT NULL DEFAULT 0,
  description TEXT,
  examples TEXT[],                        -- 예시 배열
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 초기 단가 데이터
INSERT INTO service_pricing (tier, name, price, description, examples) VALUES
  ('AI_CHAT', 'AI 상담', 0, 'AI가 바로 답변하는 교육/안내', ARRAY['와이파이 연결 방법', '앱 설치 안내', '스마트폰 설정 도움']),
  ('SIMPLE_AGENCY', '간단 대행', 1500, '검색/조회 등 간단한 대행', ARRAY['상품 가격 비교', '날씨/뉴스 확인', '전화번호 찾기']),
  ('STANDARD_AGENCY', '일반 대행', 3000, '주문/예약 등 일반 대행', ARRAY['쇼핑 주문', '음식 배달 주문', '병원 예약']),
  ('COMPLEX_AGENCY', '복합 대행', 5000, '여러 단계가 필요한 복합 대행', ARRAY['KTX 예매 + 좌석 변경', '공인인증서 갱신', '보험 청구 접수']);
