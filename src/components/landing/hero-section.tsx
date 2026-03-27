/**
 * @description Hero 섹션 — 랜딩 페이지 첫 화면 대형 영역
 * 메인 카피 + 카톡 시작 / 선물하기 CTA + 신뢰 배지 3개
 */
import Button from '@/components/ui/button';

/** 신뢰 배지 데이터 */
const TRUST_BADGES = [
  { icon: '🤖', text: 'AI + 전문 상담원 24시간' },
  { icon: '🎁', text: '7일 무료 체험' },
  { icon: '🔒', text: '개인정보 안전 보호' },
];

/** Hero 섹션 컴포넌트 */
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-white px-4 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* 메인 카피 */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          키오스크가 어려우세요?
          <br />
          <span className="text-primary-500">카톡 한 줄</span>이면 됩니다.
        </h1>

        {/* 부제 */}
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          맥도날드 주문부터 KTX 예매까지,
          <br className="hidden md:block" />
          AI 집사가 바로 해드려요
        </p>

        {/* CTA 버튼 2개 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="kakao" size="lg">
            💬 카톡으로 시작하기
          </Button>
          <Button variant="primary" size="lg">
            🎁 부모님께 선물하기
          </Button>
        </div>

        {/* 신뢰 배지 */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-gray-500 text-sm md:text-base">
              <span>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
