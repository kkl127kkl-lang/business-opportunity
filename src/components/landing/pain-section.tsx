/**
 * @description 고객 고통 공감 섹션 — "이런 적 있으시죠?"
 * 감정에 호소하는 카드 디자인 — 모바일에서 스크롤 자연스럽게
 */

/** 고통 포인트 — 감정 중심 카피 */
const PAIN_POINTS = [
  {
    emoji: '🛒',
    title: '온라인 쇼핑하다 포기',
    quote: '"장바구니 담는 것까지는 했는데... 결제가 안 돼"',
    stat: '60대 72%가 온라인 주문 포기 경험',
  },
  {
    emoji: '🏪',
    title: '키오스크 앞에서 당황',
    quote: '"뒷사람 눈치 보이고, 화면은 너무 빨리 넘어가고"',
    stat: '무인 매장 주문 포기율 38%',
  },
  {
    emoji: '🔍',
    title: '검색은 했는데 막막',
    quote: '"어떤 게 좋은 건지, 어떻게 사는 건지 모르겠어"',
    stat: '검색 후 구매 전환율 50대 이상 11%',
  },
  {
    emoji: '🏦',
    title: '은행 앱이 너무 복잡해',
    quote: '"비밀번호, 인증서, OTP... 송금 한 번이 이렇게 어려워?"',
    stat: '모바일뱅킹 이용률 60대 34%',
  },
  {
    emoji: '😔',
    title: '자녀한테 또 전화하기 미안',
    quote: '"맨날 물어보면 귀찮아할까 봐..."',
    stat: '시니어 67%가 자녀에게 부탁 꺼림',
  },
  {
    emoji: '🚨',
    title: '이 문자, 사기인지 모르겠어',
    quote: '"택배 배송 확인하라는데... 눌러도 되는 거야?"',
    stat: '보이스피싱 피해자 60대 이상 46%',
  },
];

export default function PainSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 제목 */}
        <div className="text-center mb-12">
          <p className="text-primary-500 font-semibold text-sm mb-2">PROBLEM</p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-3">
            이런 적 있으시죠?
          </h2>
          <p className="text-gray-400 text-sm">
            2,017건 실제 고객 목소리에서 뽑았어요
          </p>
        </div>

        {/* 카드 그리드 — 모바일 2열, 태블릿 2열, 데스크톱 3열 */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {PAIN_POINTS.map((point) => (
            <div
              key={point.title}
              className="group bg-gray-50 hover:bg-white rounded-2xl p-4 md:p-6 border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
            >
              <span className="text-3xl md:text-4xl block mb-3">{point.emoji}</span>
              <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2">
                {point.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-3 italic">
                {point.quote}
              </p>
              <p className="text-[10px] md:text-xs text-primary-500 font-medium">
                📊 {point.stat}
              </p>
            </div>
          ))}
        </div>

        {/* 한 줄 요약 */}
        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm md:text-base">
            이 모든 문제,{' '}
            <strong className="text-gray-900">카톡 한 줄이면 해결됩니다.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
