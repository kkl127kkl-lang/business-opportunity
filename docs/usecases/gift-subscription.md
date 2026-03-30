# 유스케이스: 부모님 구독 선물하기 (gift-subscription)

## 목적
자녀가 부모님을 위해 구독 플랜을 결제하고 선물한다

## 트리거
자녀가 가족 웹앱에서 "부모님께 선물하기" 버튼을 누를 때

## 입력값
- payerId: 결제자 (자녀) User ID
- parentPhone: 부모님 전화번호 (또는 카카오톡 연결)
- plan: 선택한 플랜 (LIGHT / STANDARD / FAMILY / CREDIT)
- paymentMethod: 결제 수단 (카카오페이 / 카드)

## 처리 흐름
1. 자녀 인증 확인
2. 부모님 User 존재 여부 확인 (없으면 초대 링크 생성)
3. 구독 플랜 생성 (payerId = 자녀, userId = 부모님)
4. 토스페이먼츠 결제 API 호출
5. 결제 성공 → Subscription ACTIVE 전환
6. 부모님에게 카톡 안내 ("자녀분이 디지털 집사를 선물하셨어요!")
7. 자녀에게 결제 확인 이메일/알림

## 출력값
- 성공: 구독 활성화 + 부모님/자녀 양쪽 알림
- 실패: 결제 실패 안내 + 재시도 유도

## 에러 케이스
| 상황 | 에러 코드 | 사용자 메시지 |
|------|-----------|---------------|
| 결제 실패 | PAYMENT_FAILED | 결제에 실패했어요. 다시 시도해주세요 |
| 이미 구독 중 | ALREADY_SUBSCRIBED | 부모님이 이미 구독 중이에요 |
| 부모님 미연결 | PARENT_NOT_FOUND | 먼저 부모님을 초대해주세요 |

## 코드 위치
- API: `src/app/api/subscriptions/gift/route.ts`
- 서비스: `src/lib/toss/payment-service.ts`

## 관련 엔티티
- Subscription (entities/Subscription.md)
- User (entities/User.md)
