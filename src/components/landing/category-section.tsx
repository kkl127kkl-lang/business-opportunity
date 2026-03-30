/**
 * @description 카테고리 섹션 — "이런 것 다 돼요"
 * 17개 서비스 카테고리를 감성적 그리드로 표시
 * 모바일: 3열 컴팩트, 데스크톱: 5열 + 호버 효과
 */

/** 인기 카테고리 (상위 8개 — 모바일에서 먼저 보이는 핵심) */
const TOP_CATEGORIES = [
  { emoji: '🛒', label: '쇼핑 주문', desc: '말만 하면 장보기 끝' },
  { emoji: '🚄', label: 'KTX 예매', desc: '기차표 1분 예약' },
  { emoji: '🏦', label: '은행 송금', desc: '용돈도 카톡으로' },
  { emoji: '🔒', label: '보이스피싱', desc: '사기 즉시 판별' },
  { emoji: '🏥', label: '병원 예약', desc: '접수부터 예약까지' },
  { emoji: '🍔', label: '음식 주문', desc: '배달앱·키오스크' },
  { emoji: '📱', label: '앱 설정', desc: '설치·업데이트·삭제' },
  { emoji: '💰', label: '공과금', desc: '세금·보험·요금' },
];

/** 추가 카테고리 (7개 — 시니어 실사용 빈도 기준 선별) */
const MORE_CATEGORIES = [
  { emoji: '🏠', label: '관공서·민원', desc: '서류·등본 발급' },
  { emoji: '📧', label: '카톡·문자', desc: '메시지 보내기' },
  { emoji: '📸', label: '사진·영상', desc: '전송·저장·정리' },
  { emoji: '🎬', label: '영상·OTT', desc: '유튜브·넷플릭스' },
  { emoji: '📋', label: '복지·연금', desc: '보조금·신청' },
  { emoji: '🗺️', label: '길찾기', desc: '지도·내비게이션' },
  { emoji: '💡', label: '기타', desc: '뭐든 물어보세요' },
];

export default function CategorySection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 제목 */}
        <div className="text-center mb-10">
          <p className="text-primary-500 font-semibold text-sm mb-2">CATEGORY</p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-3">
            이런 것 <span className="text-primary-500">다</span> 돼요
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            15가지 카테고리, 일상의 모든 디지털 문제를 해결해요
          </p>
        </div>

        {/* 인기 카테고리 — 큰 카드 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-4">
          {TOP_CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="bg-white rounded-2xl p-4 md:p-5 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-200 text-center group cursor-default"
            >
              <span className="text-3xl md:text-4xl block mb-2 group-hover:scale-110 transition-transform">{cat.emoji}</span>
              <h3 className="text-sm md:text-base font-bold text-gray-900 mb-0.5">{cat.label}</h3>
              <p className="text-[11px] md:text-xs text-gray-400">{cat.desc}</p>
            </div>
          ))}
        </div>

        {/* 추가 카테고리 — 작은 카드 */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 md:gap-3">
          {MORE_CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="bg-white rounded-xl p-3 border border-gray-100 hover:border-primary-200 transition-colors text-center cursor-default"
            >
              <span className="text-xl md:text-2xl block mb-1">{cat.emoji}</span>
              <span className="text-[11px] md:text-xs font-medium text-gray-700 block leading-tight">{cat.label}</span>
            </div>
          ))}
        </div>

        {/* 한 줄 요약 */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            이 외에도 계속 추가되고 있어요 — <strong className="text-gray-600">뭐든 물어보세요!</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
