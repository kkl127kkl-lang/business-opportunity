# 엔티티: ChatSession

## 정의
시니어 1명의 연속된 카카오톡 대화 세션. AI 응답 컨텍스트 유지 단위.

## 필드

| 필드명 | 타입 | 필수 여부 | 설명 |
|--------|------|-----------|------|
| id | uuid | 필수 | 고유 식별자 |
| userId | uuid | 필수 | 시니어 User ID |
| category | enum | 선택 | 17개 카테고리 중 하나 (AI가 자동 분류) |
| status | enum | 필수 | ACTIVE / ESCALATED / RESOLVED |
| resolvedBy | enum | 선택 | AI / AGENT (누가 해결했는지) |
| createdAt | datetime | 필수 | 세션 시작 시각 |
| updatedAt | datetime | 필수 | 최종 메시지 시각 |

## 비즈니스 규칙
- 30분 동안 메시지 없으면 자동 종료
- ESCALATED 상태가 되면 상담원 대시보드에 표시
- 하나의 세션에서 카테고리가 바뀔 수 있음 (AI가 재분류)

## 코드 위치
- DB 스키마: Supabase `chat_sessions` 테이블
- 타입 정의: `src/types/chat.ts`

## 관련 유스케이스
- send-message (usecases/send-message.md)
- ai-respond (usecases/ai-respond.md)
- escalate (usecases/escalate.md)
