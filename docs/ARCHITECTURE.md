# 프로젝트 구조

## 디렉토리 구조
```
./
├── CLAUDE.md                     # 프로젝트 컨텍스트 + 규칙
├── README.md                     # 프로젝트 개요
├── .env.example                  # 환경변수 템플릿
├── .gitignore
├── package.json                  # (생성 예정)
├── tsconfig.json                 # (생성 예정)
├── next.config.mjs               # (생성 예정)
├── tailwind.config.ts            # (생성 예정)
├── docs/
│   ├── PRD.md                    # 기획서 v2.0
│   ├── 사업계획서_디지털집사.md     # 사업계획서 v2
│   ├── CHANGELOG.md              # 변경 이력
│   ├── CODING_CONVENTION.md      # 코딩 규칙
│   ├── MISTAKE_LOG.md            # 실수 기록
│   ├── DEPLOY_ISSUE.md           # 배포 이슈
│   ├── PROGRESS.md               # 진행 현황
│   ├── ARCHITECTURE.md           # 이 파일
│   ├── domains/                  # DDD 도메인 문서
│   ├── entities/                 # DDD 엔티티 문서
│   └── usecases/                 # DDD 유스케이스 문서
└── src/
    ├── app/                      # Next.js App Router 페이지
    │   ├── layout.tsx            # 루트 레이아웃
    │   ├── page.tsx              # 랜딩 페이지
    │   ├── (auth)/               # 인증 관련 페이지
    │   ├── family/               # 가족 대시보드
    │   ├── admin/                # 상담원 대시보드
    │   └── api/                  # API 라우트
    ├── components/               # 재사용 컴포넌트
    │   ├── ui/                   # 공통 UI (Button, Card 등)
    │   ├── landing/              # 랜딩 페이지 컴포넌트
    │   ├── family/               # 가족 대시보드 컴포넌트
    │   ├── admin/                # 상담원 대시보드 컴포넌트
    │   └── chat/                 # 챗봇 관련 컴포넌트
    ├── lib/                      # 유틸리티, 서비스
    │   ├── supabase/             # Supabase 클라이언트
    │   ├── claude/               # Claude API 클라이언트
    │   ├── kakao/                # 카카오톡 API
    │   ├── toss/                 # 토스페이먼츠
    │   └── utils/                # 공통 유틸리티
    └── types/                    # TypeScript 타입 정의
```

## 주요 파일 설명
| 파일/폴더 | 역할 |
|-----------|------|
| CLAUDE.md | 프로젝트 컨텍스트 + 코딩 컨벤션 + 문서 업데이트 규칙 |
| README.md | 프로젝트 개요 및 실행 방법 |
| docs/ | 프로젝트 관련 문서 모음 |
| docs/domains/ | DDD 도메인 문서 (비즈니스 영역 정의) |
| docs/entities/ | DDD 엔티티 문서 (데이터 구조 정의) |
| docs/usecases/ | DDD 유스케이스 문서 (기능 흐름 정의) |
| src/app/ | Next.js App Router 페이지 |
| src/components/ | 재사용 컴포넌트 |
| src/lib/ | 비즈니스 로직, API 클라이언트 |
| src/types/ | TypeScript 타입 |

## 기술 스택
- Next.js 14 (App Router) + React 18 + TypeScript 5
- Tailwind CSS 3.4
- Supabase (PostgreSQL + Auth + Storage)
- Claude API (AI 상담)
- 카카오톡 채널 API
- 토스페이먼츠 (결제)
- Vercel (배포)

## 변경 이력
구조 변경 시 이 문서를 즉시 업데이트합니다.
