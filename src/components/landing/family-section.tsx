/**
 * @description 가족 연결 섹션 — "자녀분이 선물하세요"
 * 좌우 배치: 왼쪽 가족앱 목업, 오른쪽 기능 설명 + CTA
 */
import Button from '@/components/ui/button';
import SectionWrapper from '@/components/ui/section-wrapper';

/** 가족 기능 목록 */
const FAMILY_FEATURES = [
  { icon: '🎁', text: '부모님 구독 선물 결제' },
  { icon: '📊', text: '"이번 주 엄마 3번 도움받으셨어요" 활동 알림' },
  { icon: '🏆', text: '"엄마가 KTX 예매 혼자 하셨어요!" 성취 알림' },
  { icon: '🚨', text: '보이스피싱 의심 시 즉시 알림' },
];

/** 가족 연결 섹션 */
export default function FamilySection() {
  return (
    <SectionWrapper bg="cream">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* 왼쪽: 가족 앱 목업 */}
        <div className="flex-1 flex justify-center">
          <div className="w-64 bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            {/* 목업 헤더 */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                👩
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">엄마</p>
                <p className="text-xs text-green-500">활동 중</p>
              </div>
            </div>

            {/* 목업 활동 요약 */}
            <div className="space-y-3">
              <div className="bg-green-50 rounded-xl p-3">
                <p className="text-xs text-green-600 font-medium">이번 주 활동</p>
                <p className="text-2xl font-bold text-green-700">3회</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-3">
                <p className="text-xs text-yellow-600 font-medium">새 성취!</p>
                <p className="text-sm text-yellow-700">KTX 예매 혼자 성공 🎉</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3">
                <p className="text-xs text-blue-600 font-medium">구독 상태</p>
                <p className="text-sm text-blue-700">스탠다드 · 12월 갱신</p>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 설명 + CTA */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
            자녀분이 선물하세요
          </h2>

          <div className="space-y-4 mb-8">
            {FAMILY_FEATURES.map((feature) => (
              <div key={feature.text} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{feature.icon}</span>
                <p className="text-gray-700 text-lg">{feature.text}</p>
              </div>
            ))}
          </div>

          <Button variant="primary" size="lg">
            🎁 부모님께 선물하기
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
