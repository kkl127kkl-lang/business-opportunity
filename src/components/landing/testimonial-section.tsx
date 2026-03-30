/**
 * @description 고객 후기 섹션 — 감성 스토리텔링 카드
 * 실제 사용 시나리오 기반 후기 + 별점 + 카테고리 태그
 * 모바일: 세로 스크롤, 데스크톱: 3열 그리드
 */

/** 후기 데이터 (MVP 예시) */
const TESTIMONIALS = [
  {
    name: '김순자',
    age: 67,
    avatar: '👵',
    relation: '본인 이용',
    stars: 5,
    content: '쿠팡에서 휴지 사려고 30분 넘게 헤맸는데, 카톡으로 "휴지 주문해줘" 한 마디에 끝났어요. 세상 좋아졌네!',
    highlight: '카톡 한 줄에 쿠팡 주문 완료',
    category: '쇼핑',
  },
  {
    name: '이영호',
    age: 72,
    avatar: '👴',
    relation: '본인 이용',
    stars: 5,
    content: 'KTX 예매를 항상 아들한테 부탁했는데, 디지털 집사가 대신 해줘서 이제 안 미안해요. 혼자서도 할 수 있다는 게 기쁘네.',
    highlight: '자녀 도움 없이 KTX 혼자 예매',
    category: '교통',
  },
  {
    name: '박미경',
    age: 58,
    avatar: '👩‍🦳',
    relation: '본인 이용',
    stars: 5,
    content: '검찰이라며 전화가 왔는데, 집사한테 물어보니까 바로 보이스피싱이라고 알려줬어요. 딸한테도 알림이 갔대요. 큰일 날 뻔!',
    highlight: '보이스피싱 즉시 감지 + 가족 알림',
    category: '보안',
  },
  {
    name: '정수현',
    age: 35,
    avatar: '👩',
    relation: '부모님 선물',
    stars: 5,
    content: '엄마한테 선물했는데, 일주일 만에 "오늘 처음으로 혼자 네이버에서 주문했어!" 연락이 왔어요. 최고의 효도템이에요.',
    highlight: '엄마가 혼자 온라인 주문 성공!',
    category: '가족',
  },
  {
    name: '최진우',
    age: 41,
    avatar: '👨',
    relation: '부모님 선물',
    stars: 5,
    content: '아버지가 맨날 은행 가시느라 고생하셨는데, 이제 카톡으로 송금하세요. 이 나이에 모바일뱅킹 배웠다고 자랑하시더라고요.',
    highlight: '70대 아버지의 모바일뱅킹 도전',
    category: '금융',
  },
  {
    name: '한지영',
    age: 62,
    avatar: '👵',
    relation: '본인 이용',
    stars: 5,
    content: '키오스크 앞에서 항상 당황했는데, 집사가 화면 보면서 하나하나 알려줘요. 이제 맥도날드도 혼자 주문해요!',
    highlight: '키오스크 두려움 극복',
    category: '음식',
  },
];

export default function TestimonialSection() {
  return (
    <section id="review" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 제목 */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-primary-500 font-semibold text-sm mb-2">REVIEW</p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-3">
            이용하신 분들의 이야기
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            실제 이용자분들의 생생한 후기예요
          </p>
        </div>

        {/* 후기 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.name}
              className="bg-gray-50 rounded-2xl p-5 md:p-6 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-200"
            >
              {/* 하이라이트 한 줄 */}
              <div className="bg-primary-50 rounded-lg px-3 py-2 mb-4">
                <p className="text-xs md:text-sm font-semibold text-primary-600">
                  &ldquo;{item.highlight}&rdquo;
                </p>
              </div>

              {/* 후기 본문 */}
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {item.content}
              </p>

              {/* 별점 */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: item.stars }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              {/* 작성자 정보 */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200/60">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{item.avatar}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.name} ({item.age}세)</p>
                    <p className="text-[11px] text-gray-400">{item.relation}</p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-primary-500 bg-primary-50 px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 CTA */}
        <div className="text-center mt-10">
          <p className="text-gray-400 text-sm mb-4">
            매주 새로운 후기가 올라오고 있어요
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1.5 rounded-full">만족도 4.9/5.0</span>
            <span className="bg-gray-100 px-3 py-1.5 rounded-full">재이용률 94%</span>
            <span className="bg-gray-100 px-3 py-1.5 rounded-full">가족 추천 87%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
