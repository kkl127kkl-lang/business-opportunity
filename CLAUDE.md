# 디지털 집사 (Digital Butler)

## 프로젝트 개요
디지털이 어려운 중장년이 카톡 한 줄로 모든 디지털 문제를 즉시 해결받는 AI+인간 하이브리드 도우미 서비스

## 기술 스택
- Next.js 14.2 (App Router) + React 18 + TypeScript 5
- Tailwind CSS 3.4 + Lucide Icons
- Supabase (PostgreSQL + Auth + Storage)
- Claude API (AI 엔진)
- 카카오톡 채널 API (시니어 채널)
- 토스페이먼츠 (PG 결제)
- Vercel (배포, 서울 리전)

## 폴더 구조
```
./
├── CLAUDE.md                 # 프로젝트 컨텍스트
├── README.md                 # 프로젝트 개요 및 실행 방법
├── .gitignore
├── .env.example              # 환경변수 템플릿
├── docs/
│   ├── CHANGELOG.md          # 변경 이력
│   ├── PRD.md                # 기획서 (v2.0)
│   ├── CODING_CONVENTION.md  # 코딩 규칙 + 테스트 기준
│   ├── MISTAKE_LOG.md        # 실수 기록
│   ├── DEPLOY_ISSUE.md       # 배포 이슈
│   ├── PROGRESS.md           # 전체 진행 현황 및 TODO
│   ├── ARCHITECTURE.md       # 프로젝트 파일/폴더 구조
│   ├── 사업계획서_디지털집사.md  # 사업계획서 v2
│   ├── domains/              # DDD 도메인 문서
│   ├── entities/             # DDD 엔티티 문서
│   └── usecases/             # DDD 유스케이스 문서
└── src/
    └── app/                  # Next.js App Router
```

## 코딩 컨벤션 요약
- 변수/함수: camelCase
- 파일명: kebab-case
- 컴포넌트: PascalCase
- 에러 처리: try-catch
- 주석: 한국어로 작성
- 함수: 단일 책임 원칙 (한 함수 = 한 가지 일)
- 에러 처리: 예외 처리 필수, 에러 메시지는 구체적으로
- 환경변수: .env 사용, 절대 하드코딩 금지

상세 내용 → docs/CODING_CONVENTION.md

## 문서 업데이트 규칙 (작업 완료 시 반드시 이행)

모든 작업 결과가 문서에 즉시 반영되어야 대화가 바뀌어도 프로젝트 상태를 정확히 파악할 수 있습니다.

1. 모든 작업 완료 → docs/CHANGELOG.md 업데이트 (예외 없음)
2. 기능 추가/변경 → docs/PRD.md 업데이트
3. 버그/이슈 발생 → docs/MISTAKE_LOG.md + docs/DEPLOY_ISSUE.md 업데이트
4. 코딩 규칙 변경 → docs/CODING_CONVENTION.md 업데이트

## 빌드 및 실행
- 설치: `npm install`
- 실행: `npm run dev`
- 빌드: `npm run build`
- 테스트: `npm test`
