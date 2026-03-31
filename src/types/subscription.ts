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

// ─────────────────────────────────────────────────────
// 충전제 크레딧 시스템
// ─────────────────────────────────────────────────────

/** 서비스 난이도 등급 — 크레딧 차감 단가 결정 기준 */
export type ServiceTier = 'AI_CHAT' | 'SIMPLE_AGENCY' | 'STANDARD_AGENCY' | 'COMPLEX_AGENCY';

/** 서비스 등급별 단가 및 설명 */
export const SERVICE_TIER_PRICING: Record<ServiceTier, {
  name: string;
  price: number;
  description: string;
  examples: string[];
}> = {
  AI_CHAT: {
    name: 'AI 상담',
    price: 0,
    description: 'AI가 바로 답변하는 교육/안내',
    examples: ['와이파이 연결 방법', '앱 설치 안내', '스마트폰 설정 도움'],
  },
  SIMPLE_AGENCY: {
    name: '간단 대행',
    price: 1500,
    description: '검색/조회 등 간단한 대행',
    examples: ['상품 가격 비교', '날씨/뉴스 확인', '전화번호 찾기'],
  },
  STANDARD_AGENCY: {
    name: '일반 대행',
    price: 3000,
    description: '주문/예약 등 일반 대행',
    examples: ['쇼핑 주문', '음식 배달 주문', '병원 예약'],
  },
  COMPLEX_AGENCY: {
    name: '복합 대행',
    price: 5000,
    description: '여러 단계가 필요한 복합 대행',
    examples: ['KTX 예매 + 좌석 변경', '공인인증서 갱신', '보험 청구 접수'],
  },
};

/** 충전 금액 옵션 */
export const CREDIT_CHARGE_OPTIONS = [
  { amount: 10000, label: '1만원', bonus: 0, description: '간단 대행 6회 또는 일반 대행 3회' },
  { amount: 30000, label: '3만원', bonus: 2000, description: '일반 대행 10회 + 보너스 2,000원' },
  { amount: 50000, label: '5만원', bonus: 5000, description: '복합 대행 11회 + 보너스 5,000원' },
  { amount: 100000, label: '10만원', bonus: 15000, description: '복합 대행 23회 + 보너스 15,000원 (최대 혜택!)' },
];

/** 카테고리 → 서비스 등급 매핑 (AI가 자동 분류) */
export const CATEGORY_TO_TIER: Record<string, ServiceTier> = {
  // AI 상담 (무료) — 교육/안내 성격
  PHONE_SETTINGS: 'AI_CHAT',
  APP_INSTALL: 'AI_CHAT',
  WIFI: 'AI_CHAT',
  PHOTO: 'AI_CHAT',
  SNS: 'AI_CHAT',
  SECURITY: 'AI_CHAT',
  OTHER: 'AI_CHAT',
  // 간단 대행 — 검색/조회
  INSURANCE: 'SIMPLE_AGENCY',
  // 일반 대행 — 주문/예약
  SHOPPING: 'STANDARD_AGENCY',
  DELIVERY: 'STANDARD_AGENCY',
  FOOD_ORDER: 'STANDARD_AGENCY',
  HOSPITAL: 'STANDARD_AGENCY',
  KIOSK: 'STANDARD_AGENCY',
  // 복합 대행 — 다단계 처리
  BANKING: 'COMPLEX_AGENCY',
  TRANSPORT: 'COMPLEX_AGENCY',
  GOVERNMENT: 'COMPLEX_AGENCY',
  ENTERTAINMENT: 'COMPLEX_AGENCY',
};

/** 크레딧 트랜잭션 유형 */
export type CreditTransactionType = 'CHARGE' | 'USE' | 'REFUND' | 'BONUS' | 'EXPIRE' | 'WELCOME' | 'FAMILY_CHARGE';

/** 크레딧 트랜잭션 (충전/차감 이력) */
export interface CreditTransaction {
  id: string;
  userId: string;
  type: CreditTransactionType;
  amount: number;                    // 양수: 충전/환불/보너스, 음수: 사용
  balanceAfter: number;              // 트랜잭션 후 잔액
  description: string;               // "AI 상담 — 와이파이 연결", "충전 30,000원" 등
  serviceTier?: ServiceTier;         // 사용 시에만
  sessionId?: string;                // 채팅 세션 연결
  chargedBy?: string;                // 가족 충전 시 충전자 ID (자녀 등)
  createdAt: string;
}

// ─────────────────────────────────────────────────────
// 가입 환영 크레딧 (글로벌 조사: 무료 크레딧 시작이 기간제 체험보다 전환율 높음)
// ─────────────────────────────────────────────────────

/** 가입 시 제공하는 무료 체험 크레딧 */
export const WELCOME_CREDIT = {
  amount: 5000,
  description: '🎉 가입 축하 무료 크레딧 5,000원',
  /** 무료 크레딧으로 체험 가능한 서비스 예시 */
  canDo: [
    '간단 대행 3회 (가격 비교, 전화번호 찾기)',
    '일반 대행 1회 (쇼핑 주문, 배달 주문)',
    '복합 대행 1회 (KTX 예매)',
    'AI 상담은 항상 무료!',
  ],
};

// ─────────────────────────────────────────────────────
// 크레딧 만료 정책 (글로벌 조사: 12개월 만료 + 충전 시 연장이 표준)
// ─────────────────────────────────────────────────────

/** 크레딧 만료 정책 */
export const CREDIT_EXPIRY_POLICY = {
  /** 충전 후 유효 기간 (일) */
  validDays: 365,
  /** 추가 충전 시 기존 잔액도 만료일 연장 */
  extendOnRecharge: true,
  /** 만료 사전 알림 (일 전) */
  warningDaysBefore: [30, 7, 1],
  /** 안내 문구 */
  description: '충전 후 1년간 유효 · 추가 충전 시 전체 잔액 만료일 연장',
};

// ─────────────────────────────────────────────────────
// 잔액 알림 (글로벌 조사: 부족 알림 + 가족 알림이 재충전율 높임)
// ─────────────────────────────────────────────────────

/** 잔액 부족 알림 임계값 */
export const LOW_BALANCE_THRESHOLDS = {
  /** 일반 알림: 잔액이 이 금액 이하면 "잔액이 부족해요" 표시 */
  warning: 3000,
  /** 긴급 알림: 잔액이 이 금액 이하면 빨간색 경고 + 가족 알림 발송 */
  critical: 1000,
  /** 가족 알림 문구 */
  familyAlertMessage: '어머니(아버지)의 디지털 집사 잔액이 부족합니다. 충전이 필요해요!',
};

// ─────────────────────────────────────────────────────
// 가족 충전 (글로벌 조사: 자녀가 부모 대신 구매하는 패턴이 지배적)
// ─────────────────────────────────────────────────────

/** 가족 충전 요청 */
export interface FamilyCreditChargeRequest {
  /** 충전 받는 시니어 사용자 ID */
  seniorUserId: string;
  /** 충전하는 가족 구성원 ID */
  familyMemberId: string;
  /** 충전 금액 */
  amount: number;
  /** 메시지 (선택) */
  message?: string;
}
