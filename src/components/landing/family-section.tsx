/**
 * @description 가족(자녀) 섹션 — 부모님을 위한 선물 어필
 * 감정 중심: "부모님이 혼자서도 할 수 있게" 메시지
 */
import Link from 'next/link';

/** 자녀가 받는 기능 */
const FAMILY_FEATURES = [
  { emoji: '📊', title: '활동 요약', desc: '부모님이 이번 주 몇 번 도움받으셨는지 한눈에' },
  { emoji: '🎉', title: '성취 알림', desc: '"엄마가 처음으로 혼자 쿠팡 주문하셨어요!"' },
  { emoji: '🚨', title: '긴급 알림', desc: '보이스피싱 의심 시 즉시 알림' },
  { emoji: '💳', title: '간편 관리', desc: '구독·충전·해지를 한곳에서' },
];

export default function FamilySection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* 왼쪽: 감성 카피 */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-primary-500 font-semibold text-sm mb-2">FOR FAMILY</p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              부모님께 드리는
              <br />
              <span className="text-primary-500">가장 실용적인 선물</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              &quot;엄마, 이거 어떻게 해?&quot; 전화 대신<br />
              24시간 AI 집사가 옆에서 도와드려요.<br />
              부모님의 디지털 자립을 응원합니다.
            </p>

            {/* 알림 미리보기 */}
            <div className="space-y-3 mb-8 max-w-sm mx-auto lg:mx-0">
              <div className="bg-gray-50 rounded-xl p-3 flex items-start gap-3 border border-gray-100">
                <span className="text-lg">🎉</span>
                <div>
                  <p className="text-xs text-gray-400">디지털 집사 · 방금</p>
                  <p className="text-sm text-gray-900 font-medium">엄마가 처음으로 혼자 네이버 쇼핑 주문하셨어요!</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 flex items-start gap-3 border border-gray-100">
                <span className="text-lg">📊</span>
                <div>
                  <p className="text-xs text-gray-400">디지털 집사 · 1시간 전</p>
                  <p className="text-sm text-gray-900 font-medium">이번 주 엄마 활동: 도움 5회, 혼자 해결 2회</p>
                </div>
              </div>
            </div>

            <Link href="/signup">
              <button className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-8 rounded-2xl text-base transition-all active:scale-[0.98] shadow-lg shadow-primary-500/20">
                🎁 부모님께 선물하기 — 7일 무료
              </button>
            </Link>
          </div>

          {/* 오른쪽: 기능 카드 그리드 */}
          <div className="flex-1 w-full max-w-md">
            <div className="grid grid-cols-2 gap-3">
              {FAMILY_FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="bg-gray-50 rounded-2xl p-4 md:p-5 border border-gray-100 hover:border-primary-200 transition-colors"
                >
                  <span className="text-2xl block mb-2">{f.emoji}</span>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
