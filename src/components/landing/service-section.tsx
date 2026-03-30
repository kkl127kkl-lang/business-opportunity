/**
 * @description 서비스 소개 3단계 섹션 — "집사가 해결해 드려요"
 * 카톡 요청 → AI 해결 → 자연스럽게 학습 흐름을 보여주는 영역
 */
import SectionWrapper from '@/components/ui/section-wrapper';

/** 3단계 데이터 */
const STEPS = [
  {
    number: '❶',
    title: '카톡으로 말씀하세요',
    description: '메시지 한 줄이면 끝이에요',
    example: {
      request: '맥도날드 빅맥 포장 주문해줘',
      response: '주문 완료! 픽업번호 23번이에요 🎉',
    },
  },
  {
    number: '❷',
    title: 'AI가 바로 해결해요',
    description: '24시간 즉시 응답, 사람 상담원도 대기 중',
    example: {
      request: 'KTX 서울→부산 내일 오전 예매해줘',
      response: '내일 오전 9시 KTX 1석 예약 완료! 좌석 7A입니다',
    },
  },
  {
    number: '❸',
    title: '자연스럽게 배우게 돼요',
    description: '3번 같은 걸 물어보면 맞춤 가이드 전송',
    example: {
      request: '배달의민족 주문을 또 도와주세요',
      response: '직접 해보실 수 있게 쉬운 가이드를 보내드릴게요! 📖',
    },
  },
];

/** 서비스 소개 3단계 섹션 */
export default function ServiceSection() {
  return (
    <SectionWrapper bg="gray">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
          집사가 해결해 드려요
        </h2>
      </div>

      <div className="space-y-12 md:space-y-16">
        {STEPS.map((step, index) => (
          <div
            key={step.title}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
              index % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* 설명 영역 */}
            <div className="flex-1 text-center md:text-left">
              <span className="text-5xl mb-4 block">{step.number}</span>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 text-lg">{step.description}</p>
            </div>

            {/* 카톡 대화 미리보기 */}
            <div className="flex-1 w-full max-w-sm">
              <div className="bg-[#B2C7D9] rounded-2xl p-4 shadow-lg">
                {/* 유저 메시지 (오른쪽) */}
                <div className="flex justify-end mb-3">
                  <div className="bg-[#FEE500] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-gray-900">{step.example.request}</p>
                  </div>
                </div>
                {/* AI 응답 (왼쪽) */}
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                      🏠
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                      <p className="text-sm text-gray-900">{step.example.response}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
