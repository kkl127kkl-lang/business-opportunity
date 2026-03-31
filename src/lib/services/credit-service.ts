/**
 * @description 크레딧(충전제) 서비스 — 잔액 관리 + 트랜잭션 이력
 * 로컬 모드: localStorage 기반 모의 데이터
 * Supabase 연동 시: credit_wallets + credit_transactions 테이블 사용
 */

import {
  CreditTransaction,
  CreditTransactionType,
  ServiceTier,
  SERVICE_TIER_PRICING,
  CREDIT_CHARGE_OPTIONS,
  WELCOME_CREDIT,
  CREDIT_EXPIRY_POLICY,
  LOW_BALANCE_THRESHOLDS,
} from '@/types/subscription';

// ─────────────────────────────────────────────────────
// localStorage 키
// ─────────────────────────────────────────────────────
const STORAGE_KEY_BALANCE = 'credit_balance';
const STORAGE_KEY_TRANSACTIONS = 'credit_transactions';

// ─────────────────────────────────────────────────────
// 잔액 조회/변경
// ─────────────────────────────────────────────────────

/** 현재 크레딧 잔액 조회 */
export function getCreditBalance(): number {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem(STORAGE_KEY_BALANCE);
  return stored ? parseInt(stored, 10) : 0;
}

/** 잔액 설정 (내부용) */
function setCreditBalance(amount: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_BALANCE, String(Math.max(0, amount)));
}

// ─────────────────────────────────────────────────────
// 트랜잭션 이력
// ─────────────────────────────────────────────────────

/** 전체 트랜잭션 이력 조회 (최신순) */
export function getTransactions(): CreditTransaction[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
  if (!stored) return [];
  const list: CreditTransaction[] = JSON.parse(stored);
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/** 트랜잭션 추가 (내부용) */
function addTransaction(tx: Omit<CreditTransaction, 'id' | 'createdAt'>): CreditTransaction {
  const full: CreditTransaction = {
    ...tx,
    id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  const list = getTransactions();
  list.unshift(full);
  localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(list));
  return full;
}

// ─────────────────────────────────────────────────────
// 환영 크레딧 (가입 시 무료 지급)
// ─────────────────────────────────────────────────────

const STORAGE_KEY_WELCOME_GIVEN = 'credit_welcome_given';

/** 가입 축하 무료 크레딧 지급 (최초 1회) */
export function grantWelcomeCredit(): { granted: boolean; transaction: CreditTransaction | null } {
  if (typeof window === 'undefined') return { granted: false, transaction: null };

  // 이미 지급했으면 스킵
  if (localStorage.getItem(STORAGE_KEY_WELCOME_GIVEN) === 'true') {
    return { granted: false, transaction: null };
  }

  const currentBalance = getCreditBalance();
  const newBalance = currentBalance + WELCOME_CREDIT.amount;
  setCreditBalance(newBalance);

  const tx = addTransaction({
    userId: 'local_user',
    type: 'WELCOME' as CreditTransactionType,
    amount: WELCOME_CREDIT.amount,
    balanceAfter: newBalance,
    description: WELCOME_CREDIT.description,
  });

  localStorage.setItem(STORAGE_KEY_WELCOME_GIVEN, 'true');
  return { granted: true, transaction: tx };
}

// ─────────────────────────────────────────────────────
// 잔액 상태 확인
// ─────────────────────────────────────────────────────

/** 잔액 부족 상태 확인 */
export function getBalanceStatus(): { level: 'ok' | 'warning' | 'critical'; balance: number; message?: string } {
  const balance = getCreditBalance();

  if (balance <= LOW_BALANCE_THRESHOLDS.critical) {
    return {
      level: 'critical',
      balance,
      message: '잔액이 거의 없습니다. 충전이 필요해요!',
    };
  }

  if (balance <= LOW_BALANCE_THRESHOLDS.warning) {
    return {
      level: 'warning',
      balance,
      message: '잔액이 부족해요. 충전하시겠어요?',
    };
  }

  return { level: 'ok', balance };
}

/** 잔액으로 이용 가능한 서비스 횟수 (사용자에게 "몇 회 남았는지" 보여주기용) */
export function getRemainingServiceCounts(): Record<ServiceTier, number> {
  const balance = getCreditBalance();
  return {
    AI_CHAT: Infinity,
    SIMPLE_AGENCY: SERVICE_TIER_PRICING.SIMPLE_AGENCY.price > 0 ? Math.floor(balance / SERVICE_TIER_PRICING.SIMPLE_AGENCY.price) : Infinity,
    STANDARD_AGENCY: SERVICE_TIER_PRICING.STANDARD_AGENCY.price > 0 ? Math.floor(balance / SERVICE_TIER_PRICING.STANDARD_AGENCY.price) : Infinity,
    COMPLEX_AGENCY: SERVICE_TIER_PRICING.COMPLEX_AGENCY.price > 0 ? Math.floor(balance / SERVICE_TIER_PRICING.COMPLEX_AGENCY.price) : Infinity,
  };
}

// ─────────────────────────────────────────────────────
// 만료 정보
// ─────────────────────────────────────────────────────

const STORAGE_KEY_EXPIRY_DATE = 'credit_expiry_date';

/** 크레딧 만료일 조회 */
export function getExpiryDate(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY_EXPIRY_DATE);
}

/** 크레딧 만료일 설정/연장 (충전 시 호출) */
function extendExpiryDate(): void {
  if (typeof window === 'undefined') return;
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + CREDIT_EXPIRY_POLICY.validDays);
  localStorage.setItem(STORAGE_KEY_EXPIRY_DATE, expiryDate.toISOString());
}

/** 만료까지 남은 일수 */
export function getDaysUntilExpiry(): number | null {
  const expiry = getExpiryDate();
  if (!expiry) return null;
  const diff = new Date(expiry).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86400000));
}

// ─────────────────────────────────────────────────────
// 가족 충전 (자녀 → 부모)
// ─────────────────────────────────────────────────────

/** 가족이 대신 충전 */
export function familyCharge(
  amount: number,
  familyMemberId: string,
  message?: string
): { success: boolean; transaction: CreditTransaction | null; newBalance: number } {
  const option = CREDIT_CHARGE_OPTIONS.find((o) => o.amount === amount);
  if (!option) {
    return { success: false, transaction: null, newBalance: getCreditBalance() };
  }

  const bonus = option.bonus;
  const totalCharge = amount + bonus;
  const currentBalance = getCreditBalance();
  const newBalance = currentBalance + totalCharge;

  setCreditBalance(newBalance);
  extendExpiryDate();

  const desc = message
    ? `가족 충전 ${amount.toLocaleString()}원 — "${message}"`
    : `가족 충전 ${amount.toLocaleString()}원`;

  const tx = addTransaction({
    userId: 'local_user',
    type: 'FAMILY_CHARGE' as CreditTransactionType,
    amount: amount,
    balanceAfter: bonus > 0 ? currentBalance + amount : newBalance,
    description: desc,
    chargedBy: familyMemberId,
  });

  if (bonus > 0) {
    addTransaction({
      userId: 'local_user',
      type: 'BONUS' as CreditTransactionType,
      amount: bonus,
      balanceAfter: newBalance,
      description: `충전 보너스 +${bonus.toLocaleString()}원`,
    });
  }

  return { success: true, transaction: tx, newBalance };
}

// ─────────────────────────────────────────────────────
// 충전
// ─────────────────────────────────────────────────────

/** 크레딧 충전 */
export function chargeCredit(amount: number): { success: boolean; transaction: CreditTransaction | null; newBalance: number } {
  // 유효한 충전 금액인지 확인
  const option = CREDIT_CHARGE_OPTIONS.find((o) => o.amount === amount);
  if (!option) {
    return { success: false, transaction: null, newBalance: getCreditBalance() };
  }

  const bonus = option.bonus;
  const totalCharge = amount + bonus;
  const currentBalance = getCreditBalance();
  const newBalance = currentBalance + totalCharge;

  setCreditBalance(newBalance);
  extendExpiryDate(); // 충전 시 만료일 연장

  // 충전 트랜잭션
  const tx = addTransaction({
    userId: 'local_user',
    type: 'CHARGE' as CreditTransactionType,
    amount: amount,
    balanceAfter: bonus > 0 ? currentBalance + amount : newBalance,
    description: `충전 ${amount.toLocaleString()}원`,
  });

  // 보너스가 있으면 별도 트랜잭션
  if (bonus > 0) {
    addTransaction({
      userId: 'local_user',
      type: 'BONUS' as CreditTransactionType,
      amount: bonus,
      balanceAfter: newBalance,
      description: `충전 보너스 +${bonus.toLocaleString()}원`,
    });
  }

  return { success: true, transaction: tx, newBalance };
}

// ─────────────────────────────────────────────────────
// 사용 (차감)
// ─────────────────────────────────────────────────────

/** 서비스 이용 시 크레딧 차감 */
export function useCredit(
  serviceTier: ServiceTier,
  description: string,
  sessionId?: string
): { success: boolean; transaction: CreditTransaction | null; newBalance: number; insufficientAmount?: number } {
  const price = SERVICE_TIER_PRICING[serviceTier].price;

  // AI 상담은 무료
  if (price === 0) {
    const tx = addTransaction({
      userId: 'local_user',
      type: 'USE' as CreditTransactionType,
      amount: 0,
      balanceAfter: getCreditBalance(),
      description: `AI 상담 — ${description}`,
      serviceTier,
      sessionId,
    });
    return { success: true, transaction: tx, newBalance: getCreditBalance() };
  }

  const currentBalance = getCreditBalance();

  // 잔액 부족
  if (currentBalance < price) {
    return {
      success: false,
      transaction: null,
      newBalance: currentBalance,
      insufficientAmount: price - currentBalance,
    };
  }

  const newBalance = currentBalance - price;
  setCreditBalance(newBalance);

  const tierName = SERVICE_TIER_PRICING[serviceTier].name;
  const tx = addTransaction({
    userId: 'local_user',
    type: 'USE' as CreditTransactionType,
    amount: -price,
    balanceAfter: newBalance,
    description: `${tierName} — ${description}`,
    serviceTier,
    sessionId,
  });

  return { success: true, transaction: tx, newBalance };
}

// ─────────────────────────────────────────────────────
// 환불
// ─────────────────────────────────────────────────────

/** 대행 실패 시 크레딧 환불 */
export function refundCredit(
  amount: number,
  description: string,
  sessionId?: string
): CreditTransaction {
  const currentBalance = getCreditBalance();
  const newBalance = currentBalance + amount;
  setCreditBalance(newBalance);

  return addTransaction({
    userId: 'local_user',
    type: 'REFUND' as CreditTransactionType,
    amount: amount,
    balanceAfter: newBalance,
    description: `환불 — ${description}`,
    sessionId,
  });
}

// ─────────────────────────────────────────────────────
// 통계/요약
// ─────────────────────────────────────────────────────

/** 이번 달 사용 요약 */
export function getMonthlyUsageSummary(): {
  totalUsed: number;
  totalCharged: number;
  transactionCount: number;
  byTier: Record<string, { count: number; total: number }>;
} {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const transactions = getTransactions().filter((tx) => tx.createdAt >= monthStart);

  let totalUsed = 0;
  let totalCharged = 0;
  let transactionCount = 0;
  const byTier: Record<string, { count: number; total: number }> = {};

  for (const tx of transactions) {
    if (tx.type === 'USE' && tx.amount < 0) {
      totalUsed += Math.abs(tx.amount);
      transactionCount++;
      if (tx.serviceTier) {
        if (!byTier[tx.serviceTier]) byTier[tx.serviceTier] = { count: 0, total: 0 };
        byTier[tx.serviceTier].count++;
        byTier[tx.serviceTier].total += Math.abs(tx.amount);
      }
    } else if (tx.type === 'CHARGE' || tx.type === 'BONUS' || tx.type === 'WELCOME' || tx.type === 'FAMILY_CHARGE') {
      totalCharged += tx.amount;
    }
  }

  return { totalUsed, totalCharged, transactionCount, byTier };
}

// ─────────────────────────────────────────────────────
// 모의 데이터 생성 (테스트용)
// ─────────────────────────────────────────────────────

/** 테스트용 샘플 데이터 생성 */
export function seedMockData(): void {
  if (typeof window === 'undefined') return;

  // 이미 데이터가 있으면 스킵
  if (getTransactions().length > 0) return;

  // 초기화
  setCreditBalance(0);
  localStorage.removeItem(STORAGE_KEY_TRANSACTIONS);
  localStorage.removeItem(STORAGE_KEY_WELCOME_GIVEN);

  // 가입 축하 크레딧 5,000원
  grantWelcomeCredit();

  // 3만원 충전 (+ 2천원 보너스 = 총 37,000원)
  chargeCredit(30000);

  // 가족 충전 예시 (딸이 1만원 충전)
  familyCharge(10000, '딸 수진', '엄마 편하게 쓰세요 💕');

  // 샘플 사용 이력 추가
  const sampleUsages: { tier: ServiceTier; desc: string; daysAgo: number }[] = [
    { tier: 'AI_CHAT', desc: '와이파이 연결 방법 안내', daysAgo: 7 },
    { tier: 'STANDARD_AGENCY', desc: '쿠팡 로켓배송 휴지 주문', daysAgo: 5 },
    { tier: 'AI_CHAT', desc: '카카오톡 글자 크기 변경', daysAgo: 4 },
    { tier: 'SIMPLE_AGENCY', desc: '이마트 전단지 가격 확인', daysAgo: 3 },
    { tier: 'COMPLEX_AGENCY', desc: 'KTX 서울→부산 예매', daysAgo: 2 },
    { tier: 'STANDARD_AGENCY', desc: '배달의민족 치킨 주문', daysAgo: 1 },
    { tier: 'AI_CHAT', desc: '스마트폰 벨소리 변경 방법', daysAgo: 0 },
  ];

  for (const usage of sampleUsages) {
    const price = SERVICE_TIER_PRICING[usage.tier].price;
    const currentBalance = getCreditBalance();
    const newBalance = currentBalance - price;

    if (price > 0) {
      setCreditBalance(newBalance);
    }

    const tx: CreditTransaction = {
      id: `tx_mock_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      userId: 'local_user',
      type: 'USE',
      amount: price === 0 ? 0 : -price,
      balanceAfter: price === 0 ? currentBalance : newBalance,
      description: `${SERVICE_TIER_PRICING[usage.tier].name} — ${usage.desc}`,
      serviceTier: usage.tier,
      createdAt: new Date(Date.now() - usage.daysAgo * 86400000).toISOString(),
    };

    const list = getTransactions();
    list.push(tx);
    localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(list));
  }
}
