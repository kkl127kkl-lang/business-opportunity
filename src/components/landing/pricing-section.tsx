/**
 * @description 요금제 섹션 — "부담 없이 시작하세요"
 * 충전제 + 3개 구독 플랜 카드 + 무료 체험 안내
 */
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import SectionWrapper from '@/components/ui/section-wrapper';

/** 요금제 데이터 */
const PLANS = [
  {
    name: '충전제',
    price: '10,000',
    unit: '원',
    period: '선불 충전',
    description: '한 번만 써볼래요',
    features: ['건당 차감', 'AI 상담 이용', '보안 알림'],
    cta: '충전하기',
    highlighted: false,
    badge: null,
  },
  {
    name: '라이트',
    price: '19,900',
    unit: '원',
    period: '/월',
    description: '가끔 도움이 필요해요',
    features: ['월 10회 상담', 'AI 무제한', '보안 알림', '활동 리포트'],
    cta: '시작하기',
    highlighted: false,
    badge: null,
  },
  {
    name: '스탠다드',
    price: '34,900',
    unit: '원',
    period: '/월',
    description: '자주 도움받고 싶어요',
    features: ['무제한 상담', '화면 공유 지원', '맞춤 교육', '우선 상담', '활동 리포트'],
    cta: '시작하기',
    highlighted: true,
    badge: '인기',
  },
  {
    name: '패밀리',
    price: '49,900',
    unit: '원',
    period: '/월',
    description: '부모님께 최고를 드리고 싶어요',
    features: ['무제한 상담', 'VIP 전담 상담원', '가족 앱 포함', '긴급 알림', '월간 성취 리포트', '우선 상담'],
    cta: '선물하기',
    highlighted: false,
    badge: null,
  },
];

/** 요금제 섹션 */
export default function PricingSection() {
  return (
    <SectionWrapper bg="gray">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
          부담 없이 시작하세요
        </h2>
      </div>

      {/* 요금제 카드 4개 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLANS.map((plan) => (
          <Card key={plan.name} highlighted={plan.highlighted} className="flex flex-col relative">
            {/* 인기 배지 */}
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {plan.badge}
              </span>
            )}

            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{plan.description}</p>

              {/* 가격 */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500">{plan.unit}</span>
                <span className="text-gray-400 text-sm">{plan.period}</span>
              </div>

              {/* 기능 목록 */}
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA 버튼 */}
            <Button
              variant={plan.highlighted ? 'primary' : 'outline'}
              fullWidth
              size="md"
            >
              {plan.cta}
            </Button>
          </Card>
        ))}
      </div>

      {/* 무료 체험 안내 */}
      <div className="text-center mt-8 space-y-1">
        <p className="text-gray-500">모든 구독 플랜 <strong className="text-primary-500">7일 무료 체험</strong></p>
        <p className="text-gray-400 text-sm">언제든 해지 가능 · 위약금 없음</p>
      </div>
    </SectionWrapper>
  );
}
