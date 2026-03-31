/**
 * @description 요금제 섹션 — "부담 없이 시작하세요"
 * 토스/당근마켓 스타일: 깔끔한 카드 + 인기 강조 + 무료 체험 안내
 * 충전제 카드에 서비스별 단가 예시 포함
 * 모바일에서 세로 스크롤, 데스크톱에서 4열 그리드
 */
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SERVICE_TIER_PRICING, CREDIT_CHARGE_OPTIONS, WELCOME_CREDIT, CREDIT_EXPIRY_POLICY } from '@/types/subscription';

/** 요금제 데이터 */
const PLANS = [
  {
    name: '충전제',
    price: '10,000',
    unit: '원~',
    period: '선불 충전',
    tagline: '한 번만 써볼래요',
    features: [
      `🎉 가입 시 ${WELCOME_CREDIT.amount.toLocaleString()}원 무료 크레딧`,
      'AI 상담(교육) 항상 무료',
      '간단 대행 1,500원 · 일반 대행 3,000원',
      '복합 대행 5,000원',
      `${CREDIT_EXPIRY_POLICY.description}`,
      '💝 가족이 대신 충전 가능',
    ],
    cta: '충전하기',
    href: '/signup',
    highlighted: false,
    badge: '대행 전용',
    color: 'gray',
    isCredit: true,
  },
  {
    name: '라이트',
    price: '19,900',
    unit: '원',
    period: '/월',
    tagline: '가끔 도움이 필요해요',
    features: ['월 10회 상담원 연결', 'AI 무제한', '보안 알림', '활동 리포트'],
    cta: '시작하기',
    href: '/signup',
    highlighted: false,
    badge: null,
    color: 'primary',
    isCredit: false,
  },
  {
    name: '스탠다드',
    price: '34,900',
    unit: '원',
    period: '/월',
    tagline: '자주 도움받고 싶어요',
    features: ['무제한 상담', '화면 공유 지원', '맞춤 교육', '우선 상담', '월간 활동 리포트'],
    cta: '가장 인기 있는 플랜',
    href: '/signup',
    highlighted: true,
    badge: '인기',
    color: 'primary',
    isCredit: false,
  },
  {
    name: '패밀리',
    price: '49,900',
    unit: '원',
    period: '/월',
    tagline: '부모님께 최고를 드리고 싶어요',
    features: ['무제한 상담', 'VIP 전담 상담원', '가족 앱 포함', '긴급 알림', '월간 성취 리포트', '우선 상담', '💝 부모님 크레딧 대리 충전'],
    cta: '선물하기',
    href: '/signup',
    highlighted: false,
    badge: '선물용',
    color: 'yellow',
    isCredit: false,
  },
];

/** 서비스 등급별 아이콘 */
const TIER_ICONS: Record<string, string> = {
  AI_CHAT: '🤖',
  SIMPLE_AGENCY: '🔍',
  STANDARD_AGENCY: '🛒',
  COMPLEX_AGENCY: '📋',
};

/** 충전제 서비스 단가표 (모달/확장 영역) */
function CreditPricingDetail({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
         onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl"
           onClick={(e) => e.stopPropagation()}>
        {/* 모달 헤더 */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">충전제 단가표</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">
              ✕
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">서비스 종류에 따라 차감 금액이 다릅니다</p>
        </div>

        {/* 서비스 등급별 단가 */}
        <div className="px-6 py-4 space-y-4">
          {(Object.entries(SERVICE_TIER_PRICING) as [string, typeof SERVICE_TIER_PRICING[keyof typeof SERVICE_TIER_PRICING]][]).map(([key, tier]) => (
            <div key={key} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{TIER_ICONS[key]}</span>
                  <span className="font-semibold text-gray-900">{tier.name}</span>
                </div>
                <span className={`font-bold text-lg ${tier.price === 0 ? 'text-green-600' : 'text-primary-500'}`}>
                  {tier.price === 0 ? '무료' : `${tier.price.toLocaleString()}원`}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2">{tier.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {tier.examples.map((ex) => (
                  <span key={ex} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 충전 금액 옵션 */}
        <div className="px-6 py-4 border-t border-gray-100">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">충전 금액</h4>
          <div className="grid grid-cols-2 gap-2">
            {CREDIT_CHARGE_OPTIONS.map((opt) => (
              <div key={opt.amount}
                   className="border border-gray-100 rounded-lg p-3 text-center hover:border-primary-300 transition-colors cursor-pointer">
                <div className="font-bold text-gray-900">{opt.label}</div>
                {opt.bonus > 0 && (
                  <div className="text-xs text-primary-500 font-medium">
                    +{opt.bonus.toLocaleString()}원 보너스
                  </div>
                )}
                <div className="text-xs text-gray-400 mt-1">{opt.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 환영 크레딧 안내 */}
        <div className="px-6 py-4 border-t border-gray-100 bg-green-50/50">
          <div className="flex items-start gap-2">
            <span className="text-lg">🎉</span>
            <div>
              <p className="text-sm font-semibold text-green-700 mb-1">가입하면 {WELCOME_CREDIT.amount.toLocaleString()}원 무료!</p>
              <div className="space-y-0.5 text-xs text-green-600/80">
                {WELCOME_CREDIT.canDo.map((item) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 안내 */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
          <div className="space-y-1 text-xs text-gray-400">
            <p>• AI 상담(교육)은 <strong className="text-green-600">항상 무료</strong>입니다</p>
            <p>• 대행 요청 시 <strong>미리 예상 금액</strong>을 안내해 드려요</p>
            <p>• 대행 실패 시 <strong>100% 환불</strong>됩니다</p>
            <p>• 충전 후 1년간 유효 · 추가 충전 시 만료일 연장</p>
            <p>• 💝 자녀분이 대신 충전해 주실 수 있어요</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const [showCreditDetail, setShowCreditDetail] = useState(false);

  return (
    <section id="pricing" className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 제목 */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-primary-500 font-semibold text-sm mb-2">PRICING</p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-3">
            부담 없이 시작하세요
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            모든 플랜 <strong className="text-primary-500">7일 무료 체험</strong> · 언제든 해지 가능
          </p>
        </div>

        {/* 요금제 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`
                relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-7 flex flex-col
                transition-all duration-200
                ${plan.highlighted
                  ? 'border-2 border-primary-500 shadow-lg shadow-primary-500/10 scale-[1.02]'
                  : 'border border-gray-100 hover:border-gray-200 hover:shadow-md'
                }
              `}
            >
              {/* 배지 */}
              {plan.badge && (
                <span className={`
                  absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full
                  ${plan.badge === '인기'
                    ? 'bg-primary-500 text-white'
                    : plan.badge === '대행 전용'
                    ? 'bg-blue-500 text-white'
                    : 'bg-yellow-400 text-gray-900'
                  }
                `}>
                  {plan.badge}
                </span>
              )}

              {/* 플랜 이름 + 설명 */}
              <div className="mb-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-400">{plan.tagline}</p>
              </div>

              {/* 가격 */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.unit}</span>
                </div>
                <span className="text-gray-400 text-xs">{plan.period}</span>
              </div>

              {/* 기능 목록 */}
              <ul className="space-y-2.5 mb-4 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-primary-500 mt-0.5 shrink-0">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* 충전제 단가 미리보기 */}
              {plan.isCredit && (
                <button
                  onClick={() => setShowCreditDetail(true)}
                  className="mb-4 text-xs text-primary-500 hover:text-primary-600 font-medium underline underline-offset-2 text-left"
                >
                  서비스별 상세 단가 보기 →
                </button>
              )}

              {/* CTA 버튼 */}
              <Link href={plan.href}>
                <button
                  className={`
                    w-full font-semibold py-3.5 px-4 rounded-xl text-sm transition-all active:scale-[0.98]
                    ${plan.highlighted
                      ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-md shadow-primary-500/20'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }
                  `}
                >
                  {plan.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* 하단 안내 */}
        <div className="text-center mt-10 space-y-2">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-400">
            <span>✓ 위약금 없음</span>
            <span>✓ 카드 등록 없이 체험</span>
            <span>✓ 즉시 해지 가능</span>
          </div>
        </div>
      </div>

      {/* 충전제 단가 상세 모달 */}
      <CreditPricingDetail isOpen={showCreditDetail} onClose={() => setShowCreditDetail(false)} />
    </section>
  );
}
