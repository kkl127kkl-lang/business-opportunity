# 엔티티: ChatMessage

## 정의
카카오톡 대화의 개별 메시지 (시니어 요청 또는 AI/상담원 응답)

## 필드

| 필드명 | 타입 | 필수 여부 | 설명 |
|--------|------|-----------|------|
| id | uuid | 필수 | 고유 식별자 |
| sessionId | uuid | 필수 | 소속 ChatSession ID |
| role | enum | 필수 | USER / AI / AGENT (누가 보낸 메시지인지) |
| content | text | 필수 | 메시지 본문 |
| metadata | jsonb | 선택 | AI 분석 결과, 카테고리, 신뢰도 등 |
| createdAt | datetime | 필수 | 메시지 전송 시각 |

## 비즈니스 규칙
- AI 응답에는 metadata에 카테고리, 신뢰도(confidence) 저장
- 보이스피싱 감지 시 metadata에 `{ phishing: true, risk: 'high' }` 표시
- 상담원 응답도 카톡 채널을 통해 시니어에게 전달

## 코드 위치
- DB 스키마: Supabase `chat_messages` 테이블
- 타입 정의: `src/types/chat.ts`

## 관련 유스케이스
- send-message (usecases/send-message.md)
- ai-respond (usecases/ai-respond.md)
