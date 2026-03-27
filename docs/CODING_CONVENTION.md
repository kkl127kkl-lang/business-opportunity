# 코딩 컨벤션

## 기술 스택
- Next.js 14 (App Router) + React 18 + TypeScript 5
- Tailwind CSS 3.4
- Supabase (PostgreSQL + Auth + Storage)
- Claude API
- Vercel

## 네이밍 규칙
| 대상 | 규칙 | 예시 |
|------|------|------|
| 변수/함수 | camelCase | `getUserData`, `isLoading` |
| 파일명 | kebab-case | `user-profile.tsx`, `auth-utils.ts` |
| 컴포넌트 | PascalCase | `UserProfile`, `ChatWindow` |
| 상수 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `API_BASE_URL` |
| 타입/인터페이스 | PascalCase | `UserData`, `ChatMessage` |
| CSS 클래스 | Tailwind utility classes | `className="flex items-center"` |

## 함수/메서드 이름 규칙
- 형태: 동사 + 명사 (예: `getUser`, `addLog`, `createCart`, `deleteItem`)
- 조회: `get` / `fetch`로 시작
- 생성: `create` / `add`로 시작
- 수정: `update` / `edit`로 시작
- 삭제: `delete` / `remove`로 시작
- 확인: `is` / `has` / `check`로 시작

## 코드 구조
- 함수는 단일 책임 원칙 준수 (한 함수 = 한 가지 일)
- 파일 1개당 최대 300줄 권장
- 복잡한 로직에는 반드시 한국어 주석
- 컴포넌트는 `src/components/` 하위에 도메인별 폴더로 구분

## 에러 처리
- 모든 비동기 처리에 try-catch 적용
- 에러 메시지는 원인과 해결 방향을 포함
- 에러를 조용히 무시하는 것 금지 (catch에서 최소한 console.error)
- API 응답은 일관된 형식: `{ success: boolean, data?: T, error?: string }`

## 환경 변수
- 민감 정보는 절대 하드코딩 금지
- .env.local 파일 사용
- .env.example로 키 목록 공유
- 클라이언트에서 접근 필요한 변수만 NEXT_PUBLIC_ 접두사

## 테스트 기준
- 핵심 기능은 반드시 테스트 작성
- 버그 수정 시 재발 방지 테스트 추가
- 성공 케이스 + 실패 케이스 + 경계값 모두 작성
- 테스트 실행: `npm test`

## 주석 규칙
- 모든 함수/클래스에 한국어 주석 필수
- 파일 상단에 파일 목적 블록 주석 필수 (`/** @description ... */`)
- "왜 이렇게 했는지"를 설명하는 주석 권장 (무엇을 하는지보다 이유가 중요)

## 커밋 규칙
- `feat`: 새 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `refactor`: 코드 개선
- `test`: 테스트 추가/수정
- `chore`: 기타 (설정, 빌드 등)
