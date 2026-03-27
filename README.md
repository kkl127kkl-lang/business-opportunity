# 디지털 집사 (Digital Butler)

디지털이 어려운 중장년이 카톡 한 줄로 모든 디지털 문제를 즉시 해결받는 AI+인간 하이브리드 도우미 서비스

## 기술 스택
- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS 3.4
- Supabase (PostgreSQL + Auth + Storage)
- Claude API (AI 상담)
- 카카오톡 채널 API
- 토스페이먼츠 (결제)
- Vercel (배포)

## 시작하기

### 설치
```bash
npm install
```

### 환경 변수 설정
`.env.example`을 복사하여 `.env.local` 파일을 만들고 값을 채우세요.
```bash
cp .env.example .env.local
```

### 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

## 프로젝트 구조
```
src/
├── app/              # Next.js App Router 페이지
├── components/       # 재사용 컴포넌트
├── lib/              # 유틸리티, API 클라이언트
└── types/            # TypeScript 타입 정의
```

## 문서
- docs/PRD.md — 기획서 (v2.0)
- docs/PROGRESS.md — 진행 현황
- docs/CHANGELOG.md — 변경 이력
- docs/사업계획서_디지털집사.md — 사업계획서 v2
