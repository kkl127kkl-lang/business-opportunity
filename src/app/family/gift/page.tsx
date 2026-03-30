/**
 * @description 선물하기 페이지 — 4단계 스텝 (부모님 정보 → 플랜 선택 → 결제 → 완료)
 * PRD Phase 6: 자녀가 부모님께 구독을 선물하는 전체 흐름
 */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/** 스텝 정의 */
const STEPS = [
  { id: 1, label: '부모님 정보' },
  { id: 2, label: '플랜 선택' },
  { id: 3, label: '결제' },
  { id: 4, label: '완료' },
];

/** 요금제 */
const PLANS = [
  {
    id: 'charge',
    name: '충전제',
    price: '10,000',
    period: '선불',
    desc: '한 번만 써볼래요',
    features: ['건당 차감 (500원~)', 'AI 상담', '보안 알림'],
    popular: false,
  },
  {
    id: 'light',
    name: '라이트',
    price: '19,900',
    period: '/월',
    desc: '가끔 도움이 필요해요',
    features: ['월 10회 상담원', 'AI 무제한', '보안 알림', '활동 리포트'],
    popular: false,
  },
  {
    id: 'standard',
    name: '스탠다드',
    price: '34,900',
    period: '/월',
    desc: '가장 인기 있는 플랜',
    features: ['무제한 상담', '화면 공유', '맞춤 교육', '우선 상담', '활동 리포트'],
    popular: true,
  },
  {
    id: 'family',
    name: '패밀리',
    price: '49,900',
    period: '/월',
    desc: '부모님께 최고를',
    features: ['무제한 상담', 'VIP 전담 상담원', '가족 앱', '긴급 알림', '성취 리포트', '우선 상담'],
    popular: false,
  },
];

/** 결제 수단 */
const PAYMENT_METHODS = [
  { id: 'kakao', name: '카카오페이', icon: '💬', color: 'bg-[#FEE500] text-[#191919]' },
  { id: 'card', name: '카드 결제', icon: '💳', color: 'bg-gray-100 text-gray-700' },
  { id: 'bank', name: '계좌이체', icon: '🏦', color: 'bg-gray-100 text-gray-700' },
];

/** 관계 옵션 */
const RELATIONS = ['어머니', '아버지', '장모님', '장인어른', '할머니', '할아버지', '기타'];

export default function GiftPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  /* Step 1: 부모님 정보 */
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [relation, setRelation] = useState('어머니');
  const [birthYear, setBirthYear] = useState('');

  /* Step 2: 플랜 선택 */
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  /* Step 3: 결제 */
  const [paymentMethod, setPaymentMethod] = useState('kakao');
  const [agreeTerms, setAgreeTerms] = useState(false);

  /* Step 4: 완료 애니메이션 */
  const [showConfetti, setShowConfetti] = useState(false);

  /** 다음 스텝 */
  const handleNext = () => {
    if (step === 3) {
      /* 결제 처리 (모의) */
      setStep(4);
      setTimeout(() => setShowConfetti(true), 300);
      return;
    }
    setStep(step + 1);
  };

  /** Step 1 유효성 */
  const isStep1Valid = parentName.trim().length > 0 && parentPhone.trim().length >= 10;

  /** 선택된 플랜 정보 */
  const plan = PLANS.find((p) => p.id === selectedPlan)!;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-20">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {step < 4 ? (
            <button
              onClick={() => step === 1 ? router.back() : setStep(step - 1)}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
          ) : <div />}
          <span className="text-sm font-semibold text-gray-900">
            {step < 4 ? '🎁 부모님께 선물하기' : ''}
          </span>
          <Link href="/family" className="text-xs text-gray-400 hover:text-gray-600">닫기</Link>
        </div>
      </header>

      {/* 프로그레스 바 */}
      {step < 4 && (
        <div className="max-w-lg mx-auto px-4 pt-4">
          <div className="flex gap-1.5 mb-2">
            {STEPS.slice(0, 3).map((s) => (
              <div key={s.id} className="flex-1 h-1 rounded-full overflow-hidden bg-gray-200">
                <div
                  className="h-full bg-primary-500 transition-all duration-300 rounded-full"
                  style={{ width: step >= s.id ? '100%' : '0%' }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-gray-400">
            {STEPS.slice(0, 3).map((s) => (
              <span key={s.id} className={step >= s.id ? 'text-primary-500 font-medium' : ''}>
                {s.label}
              </span>
            ))}
          </div>
        </div>
      )}

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* === Step 1: 부모님 정보 === */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 mb-1">부모님 정보를 알려주세요</h2>
              <p className="text-sm text-gray-400">카카오톡으로 초대 메시지가 발송됩니다</p>
            </div>

            {/* 관계 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">관계</label>
              <div className="flex flex-wrap gap-2">
                {RELATIONS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRelation(r)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      relation === r
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* 이름 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="부모님 성함"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>

            {/* 전화번호 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
              <input
                type="tel"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>

            {/* 생년 (선택) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                태어난 해 <span className="text-gray-400 font-normal">(선택)</span>
              </label>
              <input
                type="number"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                placeholder="예: 1958"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>

            <button
              onClick={handleNext}
              disabled={!isStep1Valid}
              className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-xl text-base transition-all active:scale-[0.98]"
            >
              다음
            </button>
          </div>
        )}

        {/* === Step 2: 플랜 선택 === */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 mb-1">플랜을 선택하세요</h2>
              <p className="text-sm text-gray-400">모든 플랜 7일 무료 체험 포함</p>
            </div>

            {/* 결제 주기 토글 */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  billingCycle === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                }`}
              >
                월간
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  billingCycle === 'yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                }`}
              >
                연간 <span className="text-primary-500 text-xs">2개월 할인</span>
              </button>
            </div>

            {/* 플랜 카드 */}
            <div className="space-y-3">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlan(p.id)}
                  className={`
                    w-full text-left rounded-2xl p-4 border-2 transition-all
                    ${selectedPlan === p.id
                      ? 'border-primary-500 bg-primary-50/50 shadow-sm'
                      : 'border-gray-100 bg-white hover:border-gray-200'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{p.name}</span>
                      {p.popular && (
                        <span className="text-[10px] bg-primary-500 text-white px-2 py-0.5 rounded-full font-bold">인기</span>
                      )}
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === p.id ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
                    }`}>
                      {selectedPlan === p.id && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{p.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-gray-900">{p.price}</span>
                    <span className="text-sm text-gray-400">원{p.period}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {p.features.slice(0, 3).map((f) => (
                      <span key={f} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{f}</span>
                    ))}
                    {p.features.length > 3 && (
                      <span className="text-[10px] text-gray-400">+{p.features.length - 3}개</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 rounded-xl text-base transition-all active:scale-[0.98]"
            >
              다음 — {plan.name} {plan.price}원{plan.period}
            </button>
          </div>
        )}

        {/* === Step 3: 결제 === */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 mb-1">결제 정보</h2>
              <p className="text-sm text-gray-400">7일 무료 체험 후 자동 결제됩니다</p>
            </div>

            {/* 주문 요약 */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">주문 요약</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">받는 분</span>
                  <span className="text-gray-900 font-medium">{parentName} ({relation})</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">플랜</span>
                  <span className="text-gray-900 font-medium">{plan.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">결제 주기</span>
                  <span className="text-gray-900 font-medium">{billingCycle === 'monthly' ? '월간' : '연간'}</span>
                </div>
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">결제 금액</span>
                    <span className="font-extrabold text-primary-600 text-lg">
                      {billingCycle === 'yearly'
                        ? `${(parseInt(plan.price.replace(',', '')) * 10).toLocaleString()}원/년`
                        : `${plan.price}원/월`
                      }
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 text-right mt-0.5">7일 무료 체험 포함</p>
                </div>
              </div>
            </div>

            {/* 결제 수단 선택 */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">결제 수단</h3>
              <div className="space-y-2">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`
                      w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all
                      ${paymentMethod === m.id
                        ? 'border-primary-500 bg-primary-50/50'
                        : 'border-gray-100 hover:border-gray-200'
                      }
                    `}
                  >
                    <span className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${m.color}`}>{m.icon}</span>
                    <span className="text-sm font-medium text-gray-900">{m.name}</span>
                    <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === m.id ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
                    }`}>
                      {paymentMethod === m.id && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 약관 동의 */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-xs text-gray-500 leading-relaxed">
                <a href="#" className="text-primary-500 underline">이용약관</a> 및{' '}
                <a href="#" className="text-primary-500 underline">개인정보처리방침</a>에 동의합니다.
                7일 무료 체험 후 자동으로 유료 전환되며, 체험 중 해지 시 요금이 청구되지 않습니다.
              </span>
            </label>

            <button
              onClick={handleNext}
              disabled={!agreeTerms}
              className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-4 rounded-xl text-base transition-all active:scale-[0.98]"
            >
              {paymentMethod === 'kakao' ? '💬 카카오페이로 결제하기' : '결제하기'}
            </button>
          </div>
        )}

        {/* === Step 4: 완료 === */}
        {step === 4 && (
          <div className="text-center py-12">
            {/* 축하 애니메이션 */}
            <div className={`transition-all duration-500 ${showConfetti ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
              <span className="text-7xl block mb-6">🎉</span>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">선물 완료!</h2>
              <p className="text-gray-500 mb-2">
                <strong className="text-gray-900">{parentName}</strong>{relation}께
              </p>
              <p className="text-gray-500 mb-6">
                카카오톡으로 초대 메시지가 발송되었어요
              </p>

              {/* 선물 요약 */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 mb-8 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">플랜</span>
                    <span className="text-gray-900 font-semibold">{plan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">무료 체험</span>
                    <span className="text-green-600 font-semibold">7일</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">첫 결제일</span>
                    <span className="text-gray-900">{getNextWeekDate()}</span>
                  </div>
                </div>
              </div>

              {/* 안내 */}
              <div className="bg-yellow-50 rounded-xl p-4 mb-8 text-left">
                <p className="text-sm text-yellow-800">
                  💡 <strong>{parentName}{relation}의 카카오톡</strong>으로 안내 메시지가 전송됩니다.
                  부모님이 &quot;디지털 집사&quot; 채널을 추가하시면 바로 이용 시작!
                </p>
              </div>

              <div className="space-y-3">
                <Link href="/family" className="block">
                  <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 rounded-xl text-base transition-all active:scale-[0.98]">
                    가족 대시보드로 가기
                  </button>
                </Link>
                <Link href="/" className="block">
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl text-sm transition-colors">
                    홈으로 돌아가기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/** 7일 후 날짜 반환 */
function getNextWeekDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
