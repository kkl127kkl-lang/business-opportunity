/**
 * @description 상담원 대시보드 레이아웃 — 사이드바 + 메인 콘텐츠
 * 모바일: 하단 탭 바, 데스크톱: 좌측 사이드바
 */
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/** 네비게이션 항목 */
const NAV_ITEMS = [
  { href: '/admin', label: '대시보드', icon: '📊', mobileLabel: '홈' },
  { href: '/admin/queue', label: '대기 목록', icon: '📋', mobileLabel: '대기' },
  { href: '/admin/stats', label: '통계', icon: '📈', mobileLabel: '통계' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading, signOut } = useAuth();
  const router = useRouter();

  /* 인증 + 역할 체크 */
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login?redirect=/admin');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    );
  }

  if (!user) return null;

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 데스크톱 사이드바 */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-30">
        {/* 로고 */}
        <div className="p-5 border-b border-gray-100">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <div>
              <span className="text-lg font-bold text-gray-900 block leading-tight">디지털 집사</span>
              <span className="text-[11px] text-primary-500 font-medium">상담원 대시보드</span>
            </div>
          </Link>
        </div>

        {/* 상담원 상태 */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700">온라인</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">{user.email}</p>
        </div>

        {/* 네비게이션 */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${isActive(item.href)
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 하단: 홈으로 + 로그아웃 */}
        <div className="p-3 border-t border-gray-100 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
            <span className="text-lg">🏠</span>
            홈으로
          </Link>
          <button
            onClick={() => { signOut(); router.push('/'); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <span className="text-lg">🚪</span>
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 md:ml-64 pb-20 md:pb-0">
        {children}
      </main>

      {/* 모바일 하단 탭 바 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 safe-area-bottom">
        <div className="flex justify-around py-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center gap-0.5 py-1 px-4 rounded-lg text-[10px] font-medium transition-colors
                ${isActive(item.href)
                  ? 'text-primary-500'
                  : 'text-gray-400'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              {item.mobileLabel}
            </Link>
          ))}
          <button
            onClick={() => { signOut(); router.push('/'); }}
            className="flex flex-col items-center gap-0.5 py-1 px-4 rounded-lg text-[10px] font-medium text-gray-400"
          >
            <span className="text-xl">🚪</span>
            나가기
          </button>
        </div>
      </nav>
    </div>
  );
}
