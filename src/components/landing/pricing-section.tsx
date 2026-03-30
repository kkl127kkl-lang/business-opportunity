/**
 * @description 요금제 섹션 — "부담 없이 시작하세요"
 * 토스/당근마켓 스타일: 깔끔한 카드 + 인기 강조 + 무료 체험 안내
 * 모바일에서 세로 스크롤, 데스크톱에서 4열 그리드
 */
import Link from 'next/link';

/** 요금제 데이터 */
const PLANS = [
  {
    name: '충전제',
    price: '10,000',
    unit: '원~',
    period: '선불 충전',
    tagline: '한 번만 써볼래요',
    features: ['건당 차감 (500원~)', 'AI 상담 이용', '보안 알림', '잔액 이월'],
    cta: '충전하기',
    href: '/signup',
    highlighted: false,
    badge: null,
    color: 'gray',
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
  },
  {
    name: '패밀리',
    price: '49,900',
    unit: '원',
    period: '/월',
    tagline: '부모님께 최고를 드리고 싶어요',
    features: ['무제한 상담', 'VIP 전담 상담원', '가족 앱 포함', '긴급 알림', '월간 성취 리포트', '우선 상담'],
    cta: '선물하기',
    href: '/signup',
    highlighted: false,
    badge: '선물용',
    color: 'yellow',
  },
];

export default function PricingSection() {
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
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-primary-500 mt-0.5 shrink-0">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

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
    </section>
  );
}
