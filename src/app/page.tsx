/**
 * @description 랜딩 페이지 — 디지털 집사 서비스 소개
 * PRD 화면 1 기준: Header → Hero → 고객 공감 → 서비스 3단계 →
 * 17개 카테고리 → 가족 연결 → 요금제 → 고객 후기 → Footer
 */
import Header from '@/components/landing/header';
import HeroSection from '@/components/landing/hero-section';
import PainSection from '@/components/landing/pain-section';
import ServiceSection from '@/components/landing/service-section';
import CategorySection from '@/components/landing/category-section';
import FamilySection from '@/components/landing/family-section';
import PricingSection from '@/components/landing/pricing-section';
import TestimonialSection from '@/components/landing/testimonial-section';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PainSection />
        <ServiceSection />
        <CategorySection />
        <FamilySection />
        <PricingSection />
        <TestimonialSection />
      </main>
      <Footer />
    </>
  );
}
