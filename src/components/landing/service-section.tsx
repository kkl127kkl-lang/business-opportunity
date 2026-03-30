/**
 * @description 서비스 소개 — Before/After 대비 + 실제 대화 예시
 * 모바일에서 세로 스크롤, 데스크톱에서 좌우 배치
 */

/** 해결 시나리오 — Before vs After */
const SCENARIOS = [
  {
    icon: '🛒',
    title: '온라인 쇼핑',
    before: '검색 → 장바구니 → 결제 → 배송지... 10단계',
    after: '"휴지 주문해줘" → 1분 완료',
    chat: { q: '두루마리 휴지 주문해줘', a: '코코 3겹 30롤 12,900원 주문 완료! 내일 도착 🚀' },
  },
  {
    icon: '🚄',
    title: 'KTX 예매',
    before: '코레일 앱 설치 → 회원가입 → 좌석 선택 → 결제',
    after: '"서울→부산 내일 오전" → 예약 완료',
    chat: { q: 'KTX 서울→부산 내일 오전 예매해줘', a: '내일 오전 9시 KTX 1석 예약 완료! 좌석 7A 🚄' },
  },
  {
    icon: '🏦',
    title: '은행 송금',
    before: '앱 실행 → 로그인 → 인증서 → OTP → 비밀번호...',
    after: '"엄마한테 용돈 10만원 보내줘" → 전송 완료',
    chat: { q: '엄마한테 용돈 10만원 보내줘', a: '김순자님 계좌로 100,000원 송금 완료! 💸' },
  },
  {
    icon: '🔒',
    title: '보이스피싱 판별',
    before: '혼자 판단 → 불안 → 자녀에게 전화 → 이미 늦음',
    after: '"이 문자 사기야?" → 즉시 판별 + 가족 알림',
    chat: { q: '검찰이라며 계좌번호 알려달래요', a: '🚨 100% 보이스피싱! 절대 알려주지 마세요. 가족분께 알렸어요' },
  },
];

export default function ServiceSection() {
  return (
    <section id="service" className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 제목 */}
        <div className="text-center mb-12">
          <p className="text-primary-500 font-semibold text-sm mb-2">SOLUTION</p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-3">
            복잡한 10단계가
            <br />
            <span className="text-primary-500">카톡 한 줄</span>로 바뀝니다
          </h2>
        </div>

        {/* 시나리오 카드 */}
        <div className="space-y-4 md:space-y-6">
          {SCENARIOS.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row">
                {/* 왼쪽: Before → After */}
                <div className="flex-1 p-5 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{s.icon}</span>
                    <h3 className="text-lg font-bold text-gray-900">{s.title}</h3>
                  </div>

                  {/* Before */}
                  <div className="mb-3">
                    <span className="inline-block text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full mb-1.5">BEFORE</span>
                    <p className="text-sm text-gray-500 line-through decoration-red-300">{s.before}</p>
                  </div>

                  {/* After */}
                  <div>
                    <span className="inline-block text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mb-1.5">AFTER</span>
                    <p className="text-sm text-gray-900 font-medium">{s.after}</p>
                  </div>
                </div>

                {/* 오른쪽: 카톡 대화 미리보기 */}
                <div className="md:w-80 bg-[#B2C7D9] p-4 md:rounded-none">
                  <div className="space-y-2">
                    <div className="flex justify-end">
                      <div className="bg-[#FEE500] rounded-2xl rounded-tr-sm px-3 py-2 max-w-[80%]">
                        <p className="text-xs text-gray-900">{s.chat.q}</p>
                      </div>
                    </div>
                    <div className="flex items-end gap-1.5">
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-[10px] shrink-0">🏠</div>
                      <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                        <p className="text-xs text-gray-800">{s.chat.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
