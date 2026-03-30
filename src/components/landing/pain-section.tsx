/**
 * @description 고객 고통 공감 섹션 — "이런 경험 있으시죠?"
 * 4개 카드로 시니어의 일상 고통을 공감하는 영역
 * 출처: 2,017건 실제 고객 데이터 (뉴스 1,242건 + 댓글 775건)
 */
import Card from '@/components/ui/card';
import SectionWrapper from '@/components/ui/section-wrapper';

/** 고통 포인트 데이터 — 6개 (실제 고객 데이터 기반) */
const PAIN_POINTS = [
  {
    emoji: '🛒',
    title: '쿠팡 주문이 너무 어려워',
    description: '장바구니에 담고 결제하는 것조차 막막해서 포기한 경험',
  },
  {
    emoji: '🏪',
    title: '키오스크 앞에서 멈칫',
    description: '뒷줄 눈치 보며 주문을 포기한 적 있으시죠',
  },
  {
    emoji: '🔍',
    title: '네이버에서 물건 못 찾겠어',
    description: '검색은 했는데 어떤 게 좋은 건지, 어떻게 사는 건지 모르겠는 답답함',
  },
  {
    emoji: '🏦',
    title: '은행 앱이 왜 이렇게 복잡해',
    description: '송금 한 번 하려면 비밀번호, 인증서, OTP... 너무 많은 단계',
  },
  {
    emoji: '📞',
    title: '아들한테 또 물어봐야 하나',
    description: '매번 자녀에게 부탁하기 미안한 마음',
  },
  {
    emoji: '🚨',
    title: '이거 사기인가...',
    description: '의심스러운 문자가 와도 판단하기 어려운 불안',
  },
];

/** 고객 고통 공감 섹션 */
export default function PainSection() {
  return (
    <SectionWrapper bg="white">
      {/* 섹션 제목 */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
          이런 경험 있으시죠?
        </h2>
        <p className="text-gray-500 text-sm">
          2,017건 실제 고객 목소리 기반 (뉴스 1,242건 + 댓글 775건)
        </p>
      </div>

      {/* 카드 6개 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PAIN_POINTS.map((point) => (
          <Card key={point.title} hover>
            <div className="text-center">
              <span className="text-4xl mb-4 block">{point.emoji}</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{point.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{point.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
