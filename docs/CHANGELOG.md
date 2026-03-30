# 변경 이력

모든 기능 추가, 수정, 버그 수정 내역을 기록합니다.

---

## [2026-03-30] - Phase 0 DB 스키마 + Phase 2 인증 시스템

**유형**: 기능추가
**변경 내용**: DB 설계 + TypeScript 타입 + Supabase 클라이언트 + 인증 시스템 전체 구현

### Phase 0 — DB 스키마 설계
- SQL 파일: supabase/schema.sql (6테이블, 7 enum, RLS, 인덱스, 트리거)
- 테이블: users, chat_sessions, chat_messages, tickets, subscriptions, family_links
- TypeScript 타입 7파일: user, chat, ticket, subscription, family, database, index
- Supabase 클라이언트 3파일: client (브라우저용), server (API용), middleware (헬퍼)

### Phase 2 — 인증 시스템
- AuthProvider: Supabase Auth 세션 관리, 카카오/이메일 로그인, 로그아웃
- 로그인 페이지: 카카오 CTA + 이메일 폼 (비밀번호 보기/숨기기)
- 회원가입 페이지: 카카오 3초가입 + 이메일 (비밀번호 강도 체크)
- OAuth 콜백 API: code→세션 교환 + users 테이블 upsert
- Next.js 미들웨어: 공개/비공개 경로 분리 + 4역할 접근 제어
- Header 링크 연결: 로그인/선물하기 → /login, /signup
- layout.tsx: AuthProvider 래퍼 적용

### 영향 범위
- 신규 파일 16개: supabase/ (1), src/types/ (7), src/lib/supabase/ (3), src/lib/auth/ (1), src/app/ (4)
- 수정 파일 2개: layout.tsx, header.tsx
- 테스트: 39개 → 70개 (+31개 신규)
- tsc 에러: 0건

---

## [2026-03-27] - 프로젝트 초기화

**유형**: 구조변경
**변경 내용**: 프로젝트 초기 구조 생성
**영향 범위**: 전체 프로젝트
**세부 사항**:
- CLAUDE.md, README.md, .env.example, .gitignore 생성
- docs/ 하위 문서 생성 (CHANGELOG, CODING_CONVENTION, MISTAKE_LOG, DEPLOY_ISSUE, PROGRESS, ARCHITECTURE)
- DDD 문서 폴더 생성 (domains/, entities/, usecases/)
- 사업계획서 v2 + PRD v2 작성 완료

## [2026-03-27] - 기능추가 Phase 0 공통 UI + Phase 1 랜딩 페이지 MVP

### 변경 내용
- 공통 UI 컴포넌트 3개: Button (5가지 variant), Card (hover/highlighted), SectionWrapper
- 랜딩 페이지 9개 섹션: Header, Hero, Pain, Service, Category, Family, Pricing, Testimonial, Footer
- 반응형 디자인 (모바일/태블릿/데스크톱)
- 시니어 친화 유니버설 디자인 (44px 터치 영역, 큰 텍스트)
- 테스트 환경 구축 (vitest + @testing-library/react)
- 테스트 39개 작성 및 전체 통과

### 영향 범위
- 신규 파일 16개: src/components/ui/ (3), src/components/landing/ (9), src/test/ (1), vitest.config.mts, __tests__ (3)
- 수정 파일 1개: src/app/page.tsx

---

## [2026-03-27] - 사업계획서 + PRD v2 작성

**유형**: 문서
**변경 내용**: 사업계획서 v2 (2,017건 데이터 기반) + PRD v2 + PPT v2 생성
**세부 사항**:
- 데이터: 393건 → 2,017건 (뉴스 1,242 + 댓글 775)
- 서비스 카테고리: 8개 → 17개 (WTP 분석 포함)
- 시장: TAM 4.8조 / SAM 4,800억 / SOM 48억
- 비즈니스 모델: 7가지
- 성공 확률: 87/100
