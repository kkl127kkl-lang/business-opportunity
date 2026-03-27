/**
 * @description 고객 후기 섹션 — 서비스 이용자 후기 카드
 * MVP에서는 예시 후기 사용 (실제 서비스 런칭 후 교체)
 */
import Card from '@/components/ui/card';
import SectionWrapper from '@/components/ui/section-wrapper';

/** 후기 데이터 (MVP 예시) */
const TESTIMONIALS = [
  {
    name: '김순자',
    age: '67세',
    avatar: '👵',
    content: '맥도날드 키오스크가 너무 어려웠는데, 카톡으로 물어보니까 바로 주문 방법을 알려줬어요. 이제 혼자서도 할 수 있어요!',
    category: '음식 주문',
  },
  {
    name: '박영호',
    age: '72세',
    avatar: '👴',
    content: 'KTX 예매를 항상 아들한테 부탁했는데, 디지털 집사가 대신 해줘서 이제 안 미안해요. 정말 고마워요.',
    category: '교통 예매',
  },
  {
    name: '이미경',
    age: '58세',
    avatar: '👩‍🦳',
    content: '보이스피싱 문자가 왔는데, 집사가 바로 사기라고 알려줬어요. 딸한테도 알림이 갔대요. 큰일 날 뻔했어요!',
    category: '보안',
  },
];

/** 고객 후기 섹션 */
export default function TestimonialSection() {
  return (
    <SectionWrapper bg="white">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
          이용하신 분들의 이야기
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((item) => (
          <Card key={item.name} hover>
            {/* 후기 본문 */}
            <p className="text-gray-700 leading-relaxed mb-4">
              &ldquo;{item.content}&rdquo;
            </p>

            {/* 작성자 정보 */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <span className="text-3xl">{item.avatar}</span>
              <div>
                <p className="font-medium text-gray-900">{item.name} ({item.age})</p>
                <p className="text-xs text-primary-500">{item.category}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
