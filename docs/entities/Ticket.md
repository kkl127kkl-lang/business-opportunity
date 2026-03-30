# 엔티티: Ticket

## 정의
AI가 해결하지 못해 상담원에게 넘어온 요청 건

## 필드

| 필드명 | 타입 | 필수 여부 | 설명 |
|--------|------|-----------|------|
| id | uuid | 필수 | 고유 식별자 |
| sessionId | uuid | 필수 | 연관 ChatSession ID |
| assignedAgentId | uuid | 선택 | 배정된 상담원 ID |
| status | enum | 필수 | PENDING / IN_PROGRESS / RESOLVED |
| priority | enum | 필수 | LOW / MEDIUM / HIGH / URGENT |
| category | enum | 필수 | 17개 카테고리 |
| resolvedAt | datetime | 선택 | 해결 시각 |
| satisfaction | int | 선택 | 만족도 (1~5) |
| createdAt | datetime | 필수 | 생성 시각 |

## 비즈니스 규칙
- 보이스피싱 관련은 자동으로 URGENT 우선순위
- 5분 내 미배정 시 모든 상담원에게 알림
- 해결 후 시니어에게 만족도 질문 전송

## 코드 위치
- DB 스키마: Supabase `tickets` 테이블
- 타입 정의: `src/types/ticket.ts`

## 관련 유스케이스
- escalate (usecases/escalate.md)
- handle-ticket (usecases/handle-ticket.md)
