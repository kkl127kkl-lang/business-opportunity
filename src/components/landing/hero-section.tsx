/**
 * @description Hero 섹션 — 모바일 퍼스트 감성 랜딩
 * 토스/당근마켓 스타일: 큰 카피 + 실제 대화 미리보기 + 감정 CTA
 */
import Link from 'next/link';

/** 실제 카톡 대화 예시 (슬라이드 느낌) */
const CHAT_EXAMPLES = [
  { q: '쿠팡에서 휴지 좀 주문해줘', a: '로켓배송 12,900원 주문 완료! 내일 도착해요 🚀' },
  { q: 'KTX 서울→부산 내일 오전', a: '오전 9시 KTX 예약 완료! 좌석 7A입니다 🚄' },
  { q: '이상한 전화 왔는데 사기야?', a: '🚨 보이스피싱이에요! 절대 개인정보 알려주지 마세요' },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
        {/* 상단 뱃지 */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 border border-white/10">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            지금 2,847명이 이용 중
          </span>
        </div>

        {/* 메인 카피 — 모바일에서 임팩트 있게 */}
        <div className="text-center mb-10">
          <h1 className="text-[2rem] leading-[1.3] md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            <span className="text-white/60 text-xl md:text-2xl font-medium block mb-3">
              어머니, 아버지를 위한
            </span>
            쿠팡 주문도, KTX 예매도
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-primary-400">
              카톡 한 줄이면 끝.
            </span>
          </h1>

          <p className="text-white/60 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            50~70대 부모님이 카카오톡으로 말씀만 하시면
            <br className="hidden sm:block" />
            AI가 즉시 해결해 드리는 디지털 집사 서비스
          </p>
        </div>

        {/* 카톡 대화 미리보기 — 핵심 비주얼 */}
        <div className="max-w-sm mx-auto mb-10">
          <div className="bg-[#B2C7D9] rounded-3xl p-4 shadow-2xl shadow-black/30">
            {/* 카톡 상단 바 */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-black/5">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs">🏠</div>
              <span className="text-sm font-semibold text-gray-800">디지털 집사</span>
              <span className="text-[10px] text-gray-500 ml-auto">오후 2:30</span>
            </div>

            {/* 대화 예시 — 3개 순서대로 */}
            <div className="space-y-3">
              {CHAT_EXAMPLES.map((chat, i) => (
                <div key={i} className="space-y-2">
                  {/* 사용자 말풍선 */}
                  <div className="flex justify-end">
                    <div className="bg-[#FEE500] rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%]">
                      <p className="text-[13px] text-gray-900 leading-snug">{chat.q}</p>
                    </div>
                  </div>
                  {/* AI 말풍선 */}
                  <div className="flex items-end gap-1.5">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-[10px] shrink-0">🏠</div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%]">
                      <p className="text-[13px] text-gray-800 leading-snug">{chat.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 입력창 */}
            <div className="mt-3 bg-white rounded-full px-4 py-2.5 flex items-center gap-2">
              <span className="text-gray-400 text-sm flex-1">메시지를 입력하세요...</span>
              <div className="w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-8">
          <Link href="/login" className="flex-1">
            <button className="w-full bg-[#FEE500] hover:bg-[#FDD835] text-[#191919] font-bold py-4 px-6 rounded-2xl text-lg transition-all active:scale-[0.98] shadow-lg shadow-yellow-500/20">
              💬 카톡으로 시작하기
            </button>
          </Link>
          <Link href="/signup" className="flex-1">
            <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all border border-white/20 active:scale-[0.98]">
              🎁 부모님께 선물하기
            </button>
          </Link>
        </div>

        {/* 신뢰 배지 */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/50 text-sm">
          <span>✓ 7일 무료 체험</span>
          <span>✓ 24시간 AI + 상담원</span>
          <span>✓ 개인정보 안전 보호</span>
        </div>
      </div>
    </section>
  );
}
