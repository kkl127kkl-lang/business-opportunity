/**
 * @description 구독/결제 타입 정의
 * DDD 엔티티: docs/entities/Subscription.md
 * DB 테이블: subscriptions
 */

/** 구독 플랜 */
export type SubscriptionPlan = 'FREE_TRIAL' | 'CREDIT' | 'LIGHT' | 'STANDARD' | 'FAMILY';

/** 구독 상태 */
export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'TRIAL';

/** 플랜별 가격 정보 */
export const PLAN_PRICES: Record<SubscriptionPlan, { name: string; price: number; description: string }> = {
  FREE_TRIAL: { name: '7일 무료 체험', price: 0, description: '모든 기능 7일간 무료' },
  CREDIT: { name: '충전제', price: 10000, description: '10,000원 선불 충전, 건당 차감' },
  LIGHT: { name: '라이트', price: 19900, description: '월 30건 기본 요청' },
  STANDARD: { name: '스탠다드', price: 34900, description: '무제한 요청 + 우선 처리' },
  FAMILY: { name: '패밀리', price: 49900, description: '가족 2명 + 전담 상담원' },
};

/** 구독 정보 */
export interface Subscription {
  id: string;
  userId: string;             // 서비스 사용자 (시니어)
  payerId: string;            // 결제자 (자녀 또는 본인)
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  creditBalance: number;      // 충전 잔액 (충전제만)
  trialEndsAt: string | null;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  createdAt: string;
}

/** 구독 선물 요청 (자녀 → 부모) */
export interface GiftSubscriptionRequest {
  seniorUserId: string;       // 부모님 ID
  plan: SubscriptionPlan;
}
