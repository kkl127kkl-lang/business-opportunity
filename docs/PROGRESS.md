# 프로젝트 진행 현황

## 현재 상태
Phase 0 완료 + Phase 1 완료 + Phase 2 인증 시스템 코드 완료 (테스트 70개 통과)
- Supabase 프로젝트 생성 대기 중 (kllko 계정)

## 마스터 체크리스트 — 디지털 집사 MVP

### Phase 0: 사전 설정
- [x] docs/CODING_CONVENTION.md 준비 완료 (기존 보완)
- [x] 프로젝트 초기화 및 폴더 구조 생성
- [x] DDD 문서 작성 (도메인 5개, 엔티티 5개, 유스케이스 3개)
- [x] Supabase DB 스키마 SQL 설계 (6테이블 + 7 enum + RLS 정책)
- [ ] Supabase 프로젝트 생성 + SQL 실행 (kllko 계정으로 진행 예정)
- [ ] 환경 변수 설정 (.env.local) — Supabase 키 입력 대기
- [x] 공통 UI 컴포넌트 (Button, Card, SectionWrapper) — 3개 완료

### Phase 1: 랜딩 페이지 — "서비스를 처음 본 사람이 가입하게 만든다"
- [x] Header (로고 + 부모님께 선물하기 CTA + 로그인)
- [x] Hero 섹션 (메인 카피 + 카톡 시작/선물하기 버튼 + 신뢰 배지)
- [x] 고객 고통 공감 섹션 (카드 4개)
- [x] 서비스 소개 3단계 섹션
- [x] 17개 카테고리 그리드 섹션
- [x] 가족 연결 섹션
- [x] 요금제 섹션 (충전제 + 3개 구독 플랜)
- [x] 고객 후기 섹션
- [x] Footer
- [x] 반응형 (모바일/태블릿/데스크톱)

### Phase 2: 인증 시스템 — "가족이 로그인하고, 시니어가 카톡으로 연결된다"
- [x] Supabase Auth 클라이언트 설정 (client/server/middleware)
- [x] 가족 회원가입/로그인 페이지 (카카오 + 이메일)
- [x] 상담원/관리자 이메일 로그인
- [x] 역할 기반 접근 제어 (미들웨어 — 4역할 × 경로 매핑)
- [x] 로그인 상태 관리 (AuthContext + 쿠키 세션)
- [x] OAuth 콜백 API (카카오 로그인 후 users 테이블 자동 upsert)
- [ ] Supabase Dashboard에서 카카오 OAuth 프로바이더 설정 (대기)

### Phase 3: 카카오톡 AI 집사 — "시니어가 카톡으로 요청하면 AI가 답한다"
- [ ] 카카오톡 채널 API 연동 (Webhook)
- [ ] Claude API 연동 (시니어 맞춤 시스템 프롬프트)
- [ ] 대화 세션 관리 (생성/조회/종료)
- [ ] 메시지 저장 (요청/응답)
- [ ] 17개 카테고리 자동 분류
- [ ] 보이스피싱 의심 감지
- [ ] 상담원 에스컬레이션 처리

### Phase 4: 상담원 대시보드 — "상담원이 AI 못 푼 요청을 처리한다"
- [ ] 대시보드 레이아웃 (사이드바 + 메인)
- [ ] 에스컬레이션 요청 목록 (실시간)
- [ ] 고객 대화 히스토리 뷰
- [ ] 상담원 → 카톡 직접 응답
- [ ] 요청 통계 (유형/처리시간/만족도)

### Phase 5: 가족 웹앱 (PWA) — "자녀가 부모님 구독을 선물하고 활동을 확인한다"
- [ ] 가족 대시보드 레이아웃
- [ ] 부모님 연결 (초대/수락)
- [ ] 부모님 활동 요약 (건수만 표시)
- [ ] 성취 알림 표시
- [ ] 긴급 알림 (보이스피싱)
- [ ] 구독 관리 (플랜 변경/해지)

### Phase 6: 구독/결제 — "자녀가 부모님께 구독을 선물하고, 충전제로 체험한다"
- [ ] 요금제 선택 UI (3개 플랜 + 충전제)
- [ ] 토스페이먼츠 PG 연동
- [ ] 구독 선물 흐름 (자녀→부모)
- [ ] 7일 무료 체험 로직
- [ ] 결제 내역 조회
- [ ] 구독 해지/변경

### Phase 7: 검수 및 통합
- [ ] 전체 기능 통합 테스트
- [ ] 성능 최적화 (Lighthouse 90+ 목표)
- [ ] 접근성 검수 (시니어 유니버설 디자인)
- [ ] 보안 점검 (환경변수, XSS, CSRF)
- [ ] Vercel 배포 + 도메인 설정

### Phase 8: 최종 보고
- [ ] 전체 상태 점검
- [ ] 사용자 보고서 작성

## 최근 진행 기록

### 2026-03-27
- 완료: 사업계획서 v2 + PRD v2 + PPT v2 작성
- 완료: 프로젝트 초기 구조 생성 (Next.js 14 + TypeScript + Tailwind)
- 완료: DDD 문서 작성 (도메인 5 + 엔티티 5 + 유스케이스 3)
- 완료: 코딩 컨벤션 보완 (함수명 규칙, 주석 규칙 추가)
- 완료: 마스터 체크리스트 수립 (Phase 0~8)
- 완료: 공통 UI 컴포넌트 3개 (Button, Card, SectionWrapper)
- 완료: 랜딩 페이지 9개 섹션 구현 (Header, Hero, Pain, Service, Category, Family, Pricing, Testimonial, Footer)
- 완료: 반응형 디자인 (모바일/태블릿/데스크톱) + 시니어 친화 유니버설 디자인 (44px 터치)
- 완료: 테스트 39개 작성 및 전체 통과 (단위 + 통합 + 시나리오)
- 완료: 코드 리뷰 통과 (header.tsx 스크롤 리스너 메모리 누수 수정)
- 진행 중: Phase 0 나머지 (Supabase 스키마, 환경변수)
- 이슈: 없음

### 2026-03-30
- 완료: DB 스키마 SQL 설계 (6테이블, 7 enum, RLS 정책, 인덱스, 트리거)
  - users, chat_sessions, chat_messages, tickets, subscriptions, family_links
- 완료: TypeScript 타입 정의 7파일 (user, chat, ticket, subscription, family, database, index)
- 완료: Supabase 클라이언트 3파일 (client, server, middleware 헬퍼)
- 완료: 인증 시스템 전체 구현
  - AuthProvider (컨텍스트) — 카카오/이메일 로그인, 로그아웃, 세션 관리
  - 로그인 페이지 — 카카오 CTA + 이메일 폼 (비밀번호 보기/숨기기)
  - 회원가입 페이지 — 카카오 3초가입 + 이메일 폼 (비밀번호 강도 체크)
  - OAuth 콜백 API — 카카오 code→세션 교환 + users 테이블 자동 upsert
  - Next.js 미들웨어 — 공개/비공개 경로 분리, 역할별 접근 제어
- 완료: Header에 로그인/선물하기 링크 연결 (a태그 → Link 컴포넌트)
- 완료: layout.tsx에 AuthProvider 래퍼 적용
- 완료: 테스트 31개 신규 (미들웨어 20개 + 타입 11개), 전체 70개 통과
- 완료: tsc 에러 0건
- 대기: Supabase 프로젝트 생성 (kllko 계정) + .env.local 설정 + 카카오 OAuth 설정
