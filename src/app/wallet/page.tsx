/**
 * @description 크레딧 지갑 (마이페이지) — 잔액 확인 + 충전 + 사용 내역
 * 시니어 사용자와 자녀(결제자) 모두 접근 가능
 * 로컬 모드: localStorage 기반 동작
 */
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  getCreditBalance,
  getTransactions,
  chargeCredit,
  getMonthlyUsageSummary,
  seedMockData,
  getBalanceStatus,
  getDaysUntilExpiry,
  getRemainingServiceCounts,
} from '@/lib/services/credit-service';
import {
  CreditTransaction,
  SERVICE_TIER_PRICING,
  CREDIT_CHARGE_OPTIONS,
  CREDIT_EXPIRY_POLICY,
  ServiceTier,
} from '@/types/subscription';

/** 트랜잭션 타입별 스타일 */
const TX_TYPE_STYLES: Record<string, { label: string; color: string; sign: string }> = {
  CHARGE: { label: '충전', color: 'text-blue-600 bg-blue-50', sign: '+' },
  USE: { label: '사용', color: 'text-red-500 bg-red-50', sign: '' },
  REFUND: { label: '환불', color: 'text-green-600 bg-green-50', sign: '+' },
  BONUS: { label: '보너스', color: 'text-purple-600 bg-purple-50', sign: '+' },
  EXPIRE: { label: '만료', color: 'text-gray-400 bg-gray-50', sign: '-' },
  WELCOME: { label: '환영', color: 'text-primary-600 bg-primary-50', sign: '+' },
  FAMILY_CHARGE: { label: '가족충전', color: 'text-pink-600 bg-pink-50', sign: '+' },
};

/** 서비스 등급별 아이콘 */
const TIER_ICONS: Record<string, string> = {
  AI_CHAT: '🤖',
  SIMPLE_AGENCY: '🔍',
  STANDARD_AGENCY: '🛒',
  COMPLEX_AGENCY: '📋',
};

/** 탭 타입 */
type TabType = 'all' | 'charge' | 'use';

export default function WalletPage() {
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // 데이터 로드
  const loadData = useCallback(() => {
    seedMockData(); // 첫 방문 시 샘플 데이터 생성
    setBalance(getCreditBalance());
    setTransactions(getTransactions());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 이번 달 요약
  const summary = isLoaded ? getMonthlyUsageSummary() : null;

  // 탭별 필터링
  const filteredTransactions = transactions.filter((tx) => {
    if (activeTab === 'charge') return ['CHARGE', 'BONUS', 'WELCOME', 'FAMILY_CHARGE'].includes(tx.type);
    if (activeTab === 'use') return tx.type === 'USE' || tx.type === 'REFUND';
    return true;
  });

  // 충전 처리
  const handleCharge = (amount: number) => {
    const result = chargeCredit(amount);
    if (result.success) {
      loadData();
      setShowChargeModal(false);
    }
  };

  // 날짜 포매팅
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays === 0) return '오늘';
    if (diffDays === 1) return '어제';
    if (diffDays < 7) return `${diffDays}일 전`;

    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더 */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
            ←
          </button>
          <h1 className="text-lg font-bold text-gray-900">내 지갑</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* ── 잔액 부족 알림 배너 ── */}
        {(() => {
          const status = getBalanceStatus();
          if (status.level === 'critical') return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">🚨</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-700">{status.message}</p>
                <p className="text-xs text-red-500 mt-0.5">대행 서비스를 이용하려면 충전이 필요해요</p>
              </div>
              <button onClick={() => setShowChargeModal(true)}
                className="shrink-0 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                충전
              </button>
            </div>
          );
          if (status.level === 'warning') return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-yellow-700">{status.message}</p>
              </div>
              <button onClick={() => setShowChargeModal(true)}
                className="shrink-0 bg-yellow-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                충전
              </button>
            </div>
          );
          return null;
        })()}

        {/* ── 잔액 카드 ── */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl">
          <p className="text-sm text-gray-400 mb-1">충전 잔액</p>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-4xl font-extrabold">{balance.toLocaleString()}</span>
            <span className="text-lg text-gray-300">원</span>
          </div>

          {/* 만료일 표시 */}
          {(() => {
            const daysLeft = getDaysUntilExpiry();
            if (daysLeft === null) return null;
            const isUrgent = daysLeft <= 30;
            return (
              <p className={`text-xs mb-3 ${isUrgent ? 'text-yellow-400' : 'text-gray-500'}`}>
                {isUrgent && '⏰ '}{CREDIT_EXPIRY_POLICY.description} · 남은 기간: {daysLeft}일
              </p>
            );
          })()}

          <button
            onClick={() => setShowChargeModal(true)}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors active:scale-[0.98]"
          >
            충전하기
          </button>
        </div>

        {/* ── 이번 달 요약 ── */}
        {summary && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
              <p className="text-xs text-gray-400 mb-1">이번 달 사용</p>
              <p className="text-lg font-bold text-red-500">
                {summary.totalUsed > 0 ? `-${summary.totalUsed.toLocaleString()}` : '0'}원
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
              <p className="text-xs text-gray-400 mb-1">이번 달 충전</p>
              <p className="text-lg font-bold text-blue-600">
                {summary.totalCharged > 0 ? `+${summary.totalCharged.toLocaleString()}` : '0'}원
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
              <p className="text-xs text-gray-400 mb-1">이용 횟수</p>
              <p className="text-lg font-bold text-gray-900">{summary.transactionCount}회</p>
            </div>
          </div>
        )}

        {/* ── 서비스별 사용 현황 ── */}
        {summary && Object.keys(summary.byTier).length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">서비스별 사용 현황</h3>
            <div className="space-y-2">
              {(Object.entries(summary.byTier) as [string, { count: number; total: number }][]).map(
                ([tier, data]) => (
                  <div key={tier} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span>{TIER_ICONS[tier] || '📌'}</span>
                      <span className="text-gray-700">
                        {SERVICE_TIER_PRICING[tier as ServiceTier]?.name || tier}
                      </span>
                      <span className="text-xs text-gray-400">{data.count}회</span>
                    </div>
                    <span className="font-medium text-gray-900">{data.total.toLocaleString()}원</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* ── 이용 내역 탭 ── */}
        <div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-4">
            {([
              { key: 'all' as TabType, label: '전체' },
              { key: 'charge' as TabType, label: '충전' },
              { key: 'use' as TabType, label: '사용' },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.key
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 트랜잭션 리스트 */}
          <div className="space-y-2">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">
                내역이 없습니다
              </div>
            ) : (
              filteredTransactions.map((tx) => {
                const style = TX_TYPE_STYLES[tx.type] || TX_TYPE_STYLES.USE;
                const isUse = tx.amount < 0;

                return (
                  <div
                    key={tx.id}
                    className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3"
                  >
                    {/* 아이콘 */}
                    <div className="shrink-0">
                      {tx.serviceTier ? (
                        <span className="text-xl">{TIER_ICONS[tx.serviceTier] || '📌'}</span>
                      ) : (
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${style.color}`}>
                          {style.label}
                        </span>
                      )}
                    </div>

                    {/* 내용 */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{tx.description}</p>
                      <p className="text-xs text-gray-400">{formatDate(tx.createdAt)}</p>
                    </div>

                    {/* 금액 */}
                    <div className="text-right shrink-0">
                      <p className={`text-sm font-bold ${isUse ? 'text-red-500' : tx.amount === 0 ? 'text-green-600' : 'text-blue-600'}`}>
                        {tx.amount === 0
                          ? '무료'
                          : `${style.sign}${Math.abs(tx.amount).toLocaleString()}원`}
                      </p>
                      <p className="text-xs text-gray-400">잔액 {tx.balanceAfter.toLocaleString()}원</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── 남은 이용 가능 횟수 (글로벌 조사: 잔액을 횟수로 보여주면 직관적) ── */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">지금 잔액으로 이용 가능</h3>
          <div className="grid grid-cols-2 gap-2">
            {(Object.entries(SERVICE_TIER_PRICING) as [string, typeof SERVICE_TIER_PRICING[keyof typeof SERVICE_TIER_PRICING]][]).map(
              ([key, tier]) => {
                const remaining = getRemainingServiceCounts();
                const count = remaining[key as ServiceTier];
                const isUnlimited = count === Infinity;
                return (
                  <div key={key} className="border border-gray-100 rounded-lg p-3 text-center">
                    <span className="text-lg">{TIER_ICONS[key] || '📌'}</span>
                    <p className="text-xs text-gray-500 mt-1">{tier.name}</p>
                    <p className={`text-lg font-bold mt-0.5 ${isUnlimited ? 'text-green-600' : count === 0 ? 'text-red-400' : 'text-gray-900'}`}>
                      {isUnlimited ? '무제한' : `${count}회`}
                    </p>
                    <p className="text-xs text-gray-400">
                      {tier.price === 0 ? '항상 무료' : `건당 ${tier.price.toLocaleString()}원`}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* ── 가족 충전 안내 (글로벌 조사: 자녀가 부모 대신 구매하는 패턴이 핵심) ── */}
        <div className="bg-pink-50 rounded-xl border border-pink-100 p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💝</span>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-pink-700 mb-1">자녀분이 대신 충전해 줄 수 있어요</h3>
              <p className="text-xs text-pink-600/70 mb-2">
                가족 앱에서 부모님 계정에 크레딧을 충전하면, 부모님이 바로 사용할 수 있습니다.
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">카카오톡 공유</span>
                <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">잔액 부족 알림</span>
                <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">선물하기</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 서비스 단가 안내 ── */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">서비스 단가 안내</h3>
          <div className="space-y-2">
            {(Object.entries(SERVICE_TIER_PRICING) as [string, typeof SERVICE_TIER_PRICING[keyof typeof SERVICE_TIER_PRICING]][]).map(
              ([key, tier]) => (
                <div key={key} className="border-b border-gray-50 last:border-0 pb-2 last:pb-0">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span>{TIER_ICONS[key] || '📌'}</span>
                      <span className="text-gray-700 font-medium">{tier.name}</span>
                    </div>
                    <span className={`font-bold ${tier.price === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                      {tier.price === 0 ? '무료' : `${tier.price.toLocaleString()}원`}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 ml-7 mt-0.5">{tier.description}</p>
                  <div className="flex flex-wrap gap-1 ml-7 mt-1">
                    {tier.examples.map((ex) => (
                      <span key={ex} className="text-xs bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-1 text-xs text-gray-400">
            <p>• AI 상담(교육)은 <strong className="text-green-600">항상 무료</strong></p>
            <p>• 대행 요청 시 <strong>미리 예상 금액</strong>을 안내해 드려요</p>
            <p>• 대행 실패 시 <strong>100% 환불</strong></p>
          </div>
        </div>
      </div>

      {/* ── 충전 모달 ── */}
      {showChargeModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowChargeModal(false)}
        >
          <div
            className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl p-6 pb-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">충전하기</h3>
              <button
                onClick={() => setShowChargeModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {CREDIT_CHARGE_OPTIONS.map((opt) => (
                <button
                  key={opt.amount}
                  onClick={() => handleCharge(opt.amount)}
                  className="w-full border border-gray-200 rounded-xl p-4 text-left hover:border-primary-400 hover:bg-primary-50/30 transition-all active:scale-[0.98] group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg font-bold text-gray-900 group-hover:text-primary-600">
                      {opt.amount.toLocaleString()}원
                    </span>
                    {opt.bonus > 0 && (
                      <span className="text-xs font-medium text-primary-500 bg-primary-50 px-2 py-0.5 rounded-full">
                        +{opt.bonus.toLocaleString()}원 보너스
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{opt.description}</p>
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              결제 수단: 카카오페이 · 카드 · 계좌이체 (준비 중)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
