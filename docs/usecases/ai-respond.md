# 유스케이스: AI 자동 응답 (ai-respond)

## 목적
시니어의 요청을 Claude API가 분석하고, 17개 카테고리로 분류하여 적절한 답변을 생성한다

## 트리거
send-message 유스케이스에서 메시지 접수 후 자동 호출

## 입력값
- sessionId: 현재 ChatSession ID
- messages: 이전 대화 히스토리 (컨텍스트 유지용)
- newMessage: 시니어의 새 메시지

## 처리 흐름
1. 이전 대화 히스토리 조회 (최근 20개)
2. 시스템 프롬프트 구성 (시니어 맞춤 응답 가이드)
3. Claude API 호출 (대화 히스토리 + 새 메시지)
4. 응답에서 카테고리 + 신뢰도 추출
5. 보이스피싱 키워드 감지 시 → detect-phishing 유스케이스 호출
6. 신뢰도 낮으면 (< 0.6) → escalate 유스케이스 호출
7. 신뢰도 높으면 → 응답 반환

## 출력값
- 성공: { content: "응답 텍스트", category: "카테고리", confidence: 0.85 }
- 에스컬레이션: { escalated: true, reason: "복잡한 요청" }

## 에러 케이스
| 상황 | 처리 |
|------|------|
| Claude API 타임아웃 | 30초 타임아웃, 재시도 1회 |
| 신뢰도 너무 낮음 | 상담원 에스컬레이션 |
| 부적절한 요청 | 정중한 거절 + 도움 가능한 범위 안내 |

## 코드 위치
- 서비스: `src/lib/claude/chat-service.ts`
- 프롬프트: `src/lib/claude/prompts.ts`

## 관련 엔티티
- ChatSession (entities/ChatSession.md)
- ChatMessage (entities/ChatMessage.md)
