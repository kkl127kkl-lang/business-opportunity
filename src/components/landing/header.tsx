/**
 * @description 랜딩 페이지 헤더 — 상단 고정 네비게이션 바
 * 왼쪽: 로고, 오른쪽: CTA 버튼 + 로그인
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';

/** 헤더 컴포넌트 — 스크롤 시 배경 변경 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // 스크롤 감지로 헤더 배경 변경 (투명 → 흰색)
  // useEffect로 감싸서 렌더링마다 리스너가 중복 등록되지 않도록 방지
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}
      `}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🏠</span>
          <span className="text-xl font-bold text-gray-900">디지털 집사</span>
        </Link>

        {/* 우측 버튼 */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              로그인
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary" size="sm">
              부모님께 선물하기
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
