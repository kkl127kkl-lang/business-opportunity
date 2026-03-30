/**
 * @description 프로젝트 구조 문서
 * 최종 업데이트: 2026-03-30
 */

# 프로젝트 구조

## 디렉토리 구조
```
./
├── CLAUDE.md                     # 프로젝트 컨텍스트 + 규칙
├── README.md                     # 프로젝트 개요
├── .env.example                  # 환경변수 템플릿
├── .gitignore
├── package.json                  # Next.js 14 + 의존성
├── tsconfig.json                 # TypeScript 설정 (@/* 별칭)
├── next.config.mjs               # 보안 헤더 포함
├── tailwind.config.ts            # 브랜드 컬러 (primary-500: #D4551B)
├── vitest.config.mts             # 테스트 환경 (jsdom + @vitejs/plugin-react)
├── supabase/
│   └── schema.sql                # DB 스키마 (6테이블 + 7 enum + RLS + 인덱스)
├── docs/
│   ├── PRD.md                    # 기획서 v2.0
│   ├── 사업계획서_디지털집사.md     # 사업계획서 v2
│   ├── CHANGELOG.md              # 변경 이력
│   ├── CODING_CONVENTION.md      # 코딩 규칙
│   ├── MISTAKE_LOG.md            # 실수 기록
│   ├── DEPLOY_ISSUE.md           # 배포 이슈
│   ├── PROGRESS.md               # 진행 현황
│   ├── ARCHITECTURE.md           # 이 파일
│   ├── domains/                  # DDD 도메인 문서 (chat, counseling, family, payment, auth)
│   ├── entities/                 # DDD 엔티티 문서 (User, ChatSession, ChatMessage, Ticket, Subscription)
│   └── usecases/                 # DDD 유스케이스 문서 (send-message, ai-respond, gift-subscription)
└── src/
    ├── middleware.ts              # Next.js 미들웨어 (인증 + 역할 기반 접근 제어)
    ├── app/                      # Next.js App Router 페이지
    │   ├── globals.css           # Tailwind + 시니어 친화 기본값 (16px root, 44px 터치)
    │   ├── layout.tsx            # 루트 레이아웃 (AuthProvider 포함)
    │   ├── providers.tsx         # 클라이언트 프로바이더 래퍼
    │   ├── page.tsx              # 랜딩 페이지 (9개 섹션 조합)
    │   ├── (auth)/               # 인증 관련 페이지
    │   │   ├── login/page.tsx    # 로그인 (카카오 + 이메일)
    │   │   └── signup/page.tsx   # 회원가입 (카카오 + 이메일)
    │   ├── auth/
    │   │   └── callback/route.ts # OAuth 콜백 (카카오 code→세션 교환)
    │   ├── family/               # 가족 대시보드 (예정)
    │   ├── admin/                # 상담원 대시보드 (예정)
    │   └── api/                  # API 라우트 (예정)
    ├── components/               # 재사용 컴포넌트
    │   ├── ui/                   # 공통 UI
    │   │   ├── button.tsx        # Button (5 variant, 3 size, fullWidth, disabled)
    │   │   ├── card.tsx          # Card (hover, highlighted)
    │   │   ├── section-wrapper.tsx # SectionWrapper (bg: white/gray/cream)
    │   │   └── __tests__/        # UI 컴포넌트 테스트 (button 11개, card 6개)
    │   ├── landing/              # 랜딩 페이지 컴포넌트
    │   │   ├── header.tsx        # 상단 고정 헤더 (스크롤 감지 + 로그인/가입 링크)
    │   │   ├── hero-section.tsx  # 히어로 (메인 카피 + CTA + 신뢰 배지)
    │   │   ├── pain-section.tsx  # 고통 공감 (카드 4개, 2017건 데이터)
    │   │   ├── service-section.tsx # 서비스 3단계 (카톡 대화 목업)
    │   │   ├── category-section.tsx # 17개 카테고리 그리드
    │   │   ├── family-section.tsx # 가족 연결 (폰 목업 + 기능)
    │   │   ├── pricing-section.tsx # 요금제 4개 플랜
    │   │   ├── testimonial-section.tsx # 고객 후기 3건
    │   │   ├── footer.tsx        # 3열 푸터
    │   │   └── __tests__/        # 랜딩 테스트 (22개 — 단위+통합+시나리오)
    │   ├── family/               # 가족 대시보드 컴포넌트 (예정)
    │   ├── admin/                # 상담원 대시보드 컴포넌트 (예정)
    │   └── chat/                 # 챗봇 관련 컴포넌트 (예정)
    ├── lib/                      # 비즈니스 로직, 서비스
    │   ├── auth/
    │   │   └── auth-context.tsx  # AuthProvider + useAuth() 훅 (세션/로그인/로그아웃)
    │   ├── supabase/
    │   │   ├── client.ts         # 브라우저용 Supabase 클라이언트 (anon key)
    │   │   ├── server.ts         # 서버용 Supabase 클라이언트 (service role)
    │   │   ├── middleware.ts     # 미들웨어 헬퍼 (공개경로, 역할-경로 매핑)
    │   │   └── __tests__/        # 미들웨어 헬퍼 테스트 (20개)
    │   ├── claude/               # Claude API (예정)
    │   ├── kakao/                # 카카오톡 채널 API (예정)
    │   ├── toss/                 # 토스페이먼츠 (예정)
    │   └── utils/                # 공통 유틸리티 (예정)
    ├── types/                    # TypeScript 타입 정의
    │   ├── index.ts              # 통합 내보내기
    │   ├── user.ts               # User 엔티티 타입
    │   ├── chat.ts               # ChatSession + ChatMessage 타입 + 17개 카테고리
    │   ├── ticket.ts             # Ticket 타입
    │   ├── subscription.ts       # Subscription 타입 + 플랜 가격
    │   ├── family.ts             # FamilyLink 타입
    │   ├── database.ts           # Supabase Database 타입 (Row/Insert/Update)
    │   └── __tests__/            # 타입 상수 테스트 (11개)
    └── test/
        └── setup.ts              # 테스트 환경 설정 (@testing-library/jest-dom)
```

## 주요 파일 설명
| 파일/폴더 | 역할 |
|-----------|------|
| CLAUDE.md | 프로젝트 컨텍스트 + 코딩 컨벤션 + 문서 업데이트 규칙 |
| README.md | 프로젝트 개요 및 실행 방법 |
| supabase/schema.sql | DB 스키마 (Supabase SQL Editor에서 실행) |
| src/middleware.ts | Next.js 미들웨어 (인증 + 역할 접근 제어) |
| src/lib/auth/auth-context.tsx | 인증 컨텍스트 (로그인 상태 전역 관리) |
| src/lib/supabase/ | Supabase 클라이언트 (브라우저/서버/미들웨어) |
| src/types/database.ts | Supabase 테이블 타입 (Row/Insert/Update) |
| docs/ | 프로젝트 관련 문서 모음 |
| docs/domains/ | DDD 도메인 문서 (비즈니스 영역 정의) |
| docs/entities/ | DDD 엔티티 문서 (데이터 구조 정의) |
| docs/usecases/ | DDD 유스케이스 문서 (기능 흐름 정의) |

## 기술 스택
- Next.js 14 (App Router) + React 18 + TypeScript 5
- Tailwind CSS 3.4 + Lucide Icons
- Supabase (PostgreSQL + Auth + Storage + RLS)
- Claude API (AI 상담)
- 카카오톡 채널 API
- 토스페이먼츠 (결제)
- Vercel (배포)

## 변경 이력
구조 변경 시 이 문서를 즉시 업데이트합니다.
