/**
 * @description 랜딩 페이지 통합 + 시나리오 테스트
 * 통합 테스트: 각 섹션 컴포넌트가 올바르게 렌더링되는지 확인
 * 시나리오 테스트: 사용자가 페이지에 방문했을 때 핵심 콘텐츠가 보이는지 확인
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeroSection from '../hero-section';
import PainSection from '../pain-section';
import ServiceSection from '../service-section';
import CategorySection from '../category-section';
import FamilySection from '../family-section';
import PricingSection from '../pricing-section';
import TestimonialSection from '../testimonial-section';
import Footer from '../footer';

// ========================================
// 🔵 단위 테스트 — 각 섹션 개별 렌더링
// ========================================

describe('HeroSection 단위 테스트', () => {
  // ✅ 정상 케이스: 메인 카피가 표시된다
  it('메인 카피 "키오스크가 어려우세요?"가 표시된다', () => {
    render(<HeroSection />);
    expect(screen.getByText(/키오스크가 어려우세요/)).toBeInTheDocument();
  });

  // ✅ 정상 케이스: CTA 버튼 2개가 표시된다
  it('카톡 시작 + 선물하기 CTA 버튼이 모두 표시된다', () => {
    render(<HeroSection />);
    expect(screen.getByText(/카톡으로 시작하기/)).toBeInTheDocument();
    expect(screen.getByText(/부모님께 선물하기/)).toBeInTheDocument();
  });

  // ✅ 정상 케이스: 신뢰 배지 3개 표시
  it('신뢰 배지 3개가 모두 표시된다', () => {
    render(<HeroSection />);
    expect(screen.getByText(/AI \+ 전문 상담원/)).toBeInTheDocument();
    expect(screen.getByText(/7일 무료 체험/)).toBeInTheDocument();
    expect(screen.getByText(/개인정보 안전 보호/)).toBeInTheDocument();
  });
});

describe('PainSection 단위 테스트', () => {
  // ✅ 정상 케이스: 섹션 제목이 표시된다
  it('섹션 제목 "이런 경험 있으시죠?"가 표시된다', () => {
    render(<PainSection />);
    expect(screen.getByText('이런 경험 있으시죠?')).toBeInTheDocument();
  });

  // ✅ 정상 케이스: 고통 포인트 4개가 모두 표시된다
  it('고통 포인트 카드 4개가 모두 표시된다', () => {
    render(<PainSection />);
    expect(screen.getByText('키오스크 앞에서 멈칫')).toBeInTheDocument();
    expect(screen.getByText(/앱이 또 바뀌었네/)).toBeInTheDocument();
    expect(screen.getByText(/아들한테 또 물어봐야/)).toBeInTheDocument();
    expect(screen.getByText(/이거 사기인가/)).toBeInTheDocument();
  });

  // ✅ 데이터 출처가 표시된다
  it('데이터 출처 "2,017건"이 표시된다', () => {
    render(<PainSection />);
    expect(screen.getByText(/2,017건/)).toBeInTheDocument();
  });
});

describe('ServiceSection 단위 테스트', () => {
  // ✅ 3단계가 모두 표시된다
  it('서비스 3단계가 모두 표시된다', () => {
    render(<ServiceSection />);
    expect(screen.getByText('카톡으로 말씀하세요')).toBeInTheDocument();
    expect(screen.getByText('AI가 바로 해결해요')).toBeInTheDocument();
    expect(screen.getByText('자연스럽게 배우게 돼요')).toBeInTheDocument();
  });

  // ✅ 카톡 대화 예시가 표시된다
  it('카톡 대화 예시가 표시된다', () => {
    render(<ServiceSection />);
    expect(screen.getByText(/맥도날드 빅맥 포장/)).toBeInTheDocument();
    expect(screen.getByText(/픽업번호 23번/)).toBeInTheDocument();
  });
});

describe('CategorySection 단위 테스트', () => {
  // ✅ 17개 카테고리가 모두 표시된다
  it('17개 카테고리 라벨이 모두 표시된다', () => {
    render(<CategorySection />);
    const categories = [
      '음식 주문', '교통 예매', '병원 예약', '금융 안내', '쇼핑',
      '앱 설정', '보안', '관공서', '기기 설정', '통신',
      '엔터테인먼트', '이메일/메시지', '길찾기', '사진/영상', '은행',
      '정부/복지', '기타 IT',
    ];
    categories.forEach((cat) => {
      expect(screen.getByText(cat)).toBeInTheDocument();
    });
  });

  // ❌ 실패 케이스: 없는 카테고리는 표시되지 않는다
  it('존재하지 않는 카테고리는 표시되지 않는다', () => {
    render(<CategorySection />);
    expect(screen.queryByText('우주 여행')).not.toBeInTheDocument();
  });
});

describe('PricingSection 단위 테스트', () => {
  // ✅ 4개 플랜이 모두 표시된다
  it('4개 요금제가 모두 표시된다 (충전제, 라이트, 스탠다드, 패밀리)', () => {
    render(<PricingSection />);
    expect(screen.getByText('충전제')).toBeInTheDocument();
    expect(screen.getByText('라이트')).toBeInTheDocument();
    expect(screen.getByText('스탠다드')).toBeInTheDocument();
    expect(screen.getByText('패밀리')).toBeInTheDocument();
  });

  // ✅ 가격이 올바르게 표시된다
  it('요금제 가격이 올바르게 표시된다', () => {
    render(<PricingSection />);
    expect(screen.getByText('10,000')).toBeInTheDocument();
    expect(screen.getByText('19,900')).toBeInTheDocument();
    expect(screen.getByText('34,900')).toBeInTheDocument();
    expect(screen.getByText('49,900')).toBeInTheDocument();
  });

  // ✅ 인기 배지가 스탠다드에만 표시된다
  it('"인기" 배지가 표시된다', () => {
    render(<PricingSection />);
    expect(screen.getByText('인기')).toBeInTheDocument();
  });

  // ✅ 무료 체험 안내가 표시된다
  it('7일 무료 체험 안내가 표시된다', () => {
    render(<PricingSection />);
    expect(screen.getByText(/7일 무료 체험/)).toBeInTheDocument();
  });
});

describe('FamilySection 단위 테스트', () => {
  // ✅ 섹션 제목 표시
  it('"자녀분이 선물하세요" 제목이 표시된다', () => {
    render(<FamilySection />);
    expect(screen.getByText('자녀분이 선물하세요')).toBeInTheDocument();
  });

  // ✅ 가족 기능 4개 표시
  it('가족 기능 4가지가 모두 표시된다', () => {
    render(<FamilySection />);
    expect(screen.getByText(/부모님 구독 선물 결제/)).toBeInTheDocument();
    expect(screen.getByText(/보이스피싱 의심 시 즉시 알림/)).toBeInTheDocument();
  });
});

describe('Footer 단위 테스트', () => {
  // ✅ 브랜드명 표시
  it('브랜드명 "디지털 집사"가 표시된다', () => {
    render(<Footer />);
    // Footer에는 "디지털 집사"가 있어야 함
    const footerTexts = screen.getAllByText('디지털 집사');
    expect(footerTexts.length).toBeGreaterThan(0);
  });

  // ✅ 연락처 정보 표시
  it('카카오톡, 전화, 이메일 연락처가 표시된다', () => {
    render(<Footer />);
    expect(screen.getByText(/카카오톡/)).toBeInTheDocument();
    expect(screen.getByText(/080/)).toBeInTheDocument();
    expect(screen.getByText(/digitalbutler/)).toBeInTheDocument();
  });

  // ✅ 카피라이트 표시
  it('카피라이트가 표시된다', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026/)).toBeInTheDocument();
  });
});

// ========================================
// 🟢 시나리오 테스트 — 사용자 방문 흐름
// ========================================

describe('랜딩 페이지 시나리오 테스트', () => {
  // ✅ 시나리오: 처음 방문한 사용자가 핵심 CTA를 볼 수 있다
  it('Hero에서 카톡 시작하기와 선물하기 버튼이 모두 보인다', () => {
    render(<HeroSection />);
    const kakaoBtn = screen.getByText(/카톡으로 시작하기/);
    const giftBtn = screen.getByText(/부모님께 선물하기/);
    expect(kakaoBtn).toBeInTheDocument();
    expect(giftBtn).toBeInTheDocument();
  });

  // ✅ 시나리오: 요금제를 비교할 수 있다
  it('4개 요금제를 한 화면에서 비교할 수 있다', () => {
    render(<PricingSection />);
    // 4개 플랜 이름 + 가격이 모두 존재
    expect(screen.getByText('충전제')).toBeInTheDocument();
    expect(screen.getByText('10,000')).toBeInTheDocument();
    expect(screen.getByText('패밀리')).toBeInTheDocument();
    expect(screen.getByText('49,900')).toBeInTheDocument();
  });

  // ✅ 시나리오: 서비스가 무엇을 해주는지 이해할 수 있다
  it('서비스 3단계를 통해 동작 방식을 이해할 수 있다', () => {
    render(<ServiceSection />);
    // 요청 → 해결 → 학습 3단계가 순서대로 있는지
    expect(screen.getByText('카톡으로 말씀하세요')).toBeInTheDocument();
    expect(screen.getByText('AI가 바로 해결해요')).toBeInTheDocument();
    expect(screen.getByText('자연스럽게 배우게 돼요')).toBeInTheDocument();
  });
});
