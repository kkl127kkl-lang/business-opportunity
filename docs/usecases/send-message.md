# 유스케이스: 카톡 메시지 보내기 (send-message)

## 목적
시니어가 카카오톡으로 디지털 문제를 요청하면 시스템이 접수하고 AI가 자동 응답한다

## 트리거
시니어가 카카오톡 채널에서 메시지를 전송할 때

## 입력값
- kakaoUserId: 카카오톡 사용자 ID
- message: 메시지 본문 (텍스트)

## 처리 흐름
1. 카카오톡 Webhook으로 메시지 수신
2. kakaoUserId로 User 조회 (없으면 자동 생성)
3. 활성 ChatSession 조회 (없거나 30분 초과면 새로 생성)
4. ChatMessage 저장 (role: USER)
5. Claude API로 전달 → AI 응답 생성 (usecases/ai-respond.md)
6. AI 응답을 ChatMessage로 저장 (role: AI)
7. 카카오톡 채널로 응답 전송

## 출력값
- 성공: 카카오톡에 AI 응답 메시지 전송
- 실패: "잠시 문제가 생겼어요. 다시 말씀해 주세요" 안내

## 에러 케이스
| 상황 | 처리 |
|------|------|
| 카카오 API 오류 | 재시도 1회 후 에러 로깅 |
| Claude API 오류 | "잠시 후 다시 시도해주세요" 응답 |
| 메시지 길이 초과 | "메시지가 너무 길어요. 짧게 말씀해주세요" 안내 |

## 코드 위치
- API: `src/app/api/kakao/webhook/route.ts`
- 서비스: `src/lib/kakao/webhook-handler.ts`

## 관련 엔티티
- User (entities/User.md)
- ChatSession (entities/ChatSession.md)
- ChatMessage (entities/ChatMessage.md)
