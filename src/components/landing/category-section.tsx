/**
 * @description 17개 카테고리 그리드 섹션 — "이런 것 다 돼요"
 * PRD의 17개 서비스 카테고리를 아이콘 그리드로 표시
 */
import SectionWrapper from '@/components/ui/section-wrapper';

/** 17개 카테고리 데이터 */
const CATEGORIES = [
  { emoji: '🍔', label: '음식 주문', detail: '키오스크/배달앱' },
  { emoji: '🚄', label: '교통 예매', detail: 'KTX/항공/버스' },
  { emoji: '🏥', label: '병원 예약', detail: '접수/예약 대행' },
  { emoji: '💰', label: '금융 안내', detail: '공과금/보험' },
  { emoji: '🛒', label: '쇼핑', detail: '쿠팡/반품 대행' },
  { emoji: '📱', label: '앱 설정', detail: '설치/삭제/업데이트' },
  { emoji: '🔒', label: '보안', detail: '보이스피싱 판별' },
  { emoji: '🏠', label: '관공서', detail: '민원/서류' },
  { emoji: '🔌', label: '기기 설정', detail: '프린터/전기차충전' },
  { emoji: '📞', label: '통신', detail: '요금제/데이터' },
  { emoji: '🎬', label: '엔터테인먼트', detail: '넷플릭스/OTT' },
  { emoji: '📧', label: '이메일/메시지', detail: '카톡/문자 활용' },
  { emoji: '🗺️', label: '길찾기', detail: '네비게이션' },
  { emoji: '📸', label: '사진/영상', detail: '전송/저장/정리' },
  { emoji: '🏦', label: '은행', detail: '모바일뱅킹 안내' },
  { emoji: '📋', label: '정부/복지', detail: '보조금/연금 조회' },
  { emoji: '🛠️', label: '기타 IT', detail: '기타 문제해결' },
];

/** 17개 카테고리 그리드 섹션 */
export default function CategorySection() {
  return (
    <SectionWrapper bg="white">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
          이런 것 다 돼요
        </h2>
        <p className="text-gray-500">
          17가지 카테고리, 일상의 모든 디지털 문제를 해결해요
        </p>
      </div>

      {/* 카테고리 그리드 — 모바일 3열, 데스크톱 5열 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.label}
            className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <span className="text-3xl md:text-4xl mb-2">{cat.emoji}</span>
            <span className="text-sm font-medium text-gray-900">{cat.label}</span>
            <span className="text-xs text-gray-400 mt-1">{cat.detail}</span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
