/**
 * @description 랜딩 헤더 — 고정 네비게이션 바
 * 스크롤 시 투명→흰색 배경 전환, 모바일 햄버거 메뉴
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* 스크롤 감지 — 투명 → 반투명 흰색 */
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
        ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🏠</span>
          <span className={`text-xl font-bold transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            디지털 집사
          </span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#service" className={`text-sm font-medium transition-colors hover:text-primary-500 ${isScrolled ? 'text-gray-600' : 'text-white/70'}`}>
            서비스 소개
          </a>
          <a href="#pricing" className={`text-sm font-medium transition-colors hover:text-primary-500 ${isScrolled ? 'text-gray-600' : 'text-white/70'}`}>
            요금제
          </a>
          <a href="#review" className={`text-sm font-medium transition-colors hover:text-primary-500 ${isScrolled ? 'text-gray-600' : 'text-white/70'}`}>
            후기
          </a>
        </nav>

        {/* 우측 버튼 */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <button className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/70 hover:text-white'}`}>
              로그인
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-[0.98]">
              무료 체험하기
            </button>
          </Link>
        </div>

        {/* 모바일 햄버거 */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`}
          aria-label="메뉴"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            <a href="#service" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
              서비스 소개
            </a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
              요금제
            </a>
            <a href="#review" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
              후기
            </a>
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <Link href="/login" className="block">
                <button className="w-full text-gray-700 font-medium py-3 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                  로그인
                </button>
              </Link>
              <Link href="/login" className="block">
                <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-xl transition-all">
                  무료 체험하기
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
