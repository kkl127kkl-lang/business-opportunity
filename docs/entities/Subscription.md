# 엔티티: Subscription

## 정의
사용자의 구독/충전 정보

## 필드

| 필드명 | 타입 | 필수 여부 | 설명 |
|--------|------|-----------|------|
| id | uuid | 필수 | 고유 식별자 |
| userId | uuid | 필수 | 구독 대상 User ID (시니어) |
| payerId | uuid | 필수 | 결제자 User ID (자녀 또는 본인) |
| plan | enum | 필수 | FREE_TRIAL / LIGHT / STANDARD / FAMILY / CREDIT |
| status | enum | 필수 | ACTIVE / CANCELLED / EXPIRED / TRIAL |
| creditBalance | int | 선택 | 충전 잔액 (충전제만 사용) |
| trialEndsAt | datetime | 선택 | 무료 체험 종료일 |
| currentPeriodStart | datetime | 필수 | 현재 결제 주기 시작일 |
| currentPeriodEnd | datetime | 필수 | 현재 결제 주기 종료일 |
| createdAt | datetime | 필수 | 최초 구독일 |

## 비즈니스 규칙
- 7일 무료 체험 후 자동 전환 (사전 동의 필수)
- 해지 시 현재 주기 끝까지 서비스 이용 가능
- 충전제는 잔액 소진 시 추가 충전 안내
- 자녀가 결제자인 경우 payerId ≠ userId

## 코드 위치
- DB 스키마: Supabase `subscriptions` 테이블
- 타입 정의: `src/types/subscription.ts`

## 관련 유스케이스
- subscribe (usecases/subscribe.md)
- gift-subscription (usecases/gift-subscription.md)
