/**
 * @description 가족 대시보드 — 로그인 후 첫 화면
 * Phase 5에서 본격 구현 예정, 지금은 로그인 확인용 최소 UI
 */

'use client';

import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';
import { LogOut, User, Shield, MessageCircle } from 'lucide-react';

export default function FamilyDashboard() {
  const { user, isLoading, isLocalMode, signOut } = useAuth();
  const router = useRouter();

  /** 로그아웃 처리 */
  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    );
  }

  // 로그인 안 된 상태면 로그인 페이지로
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 바 */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">디지털 집사</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{user.name}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* 로컬 모드 안내 */}
        {isLocalMode && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
            <strong>로컬 모드</strong> — Supabase 연결 전이라 테스트 데이터로 동작합니다
          </div>
        )}

        {/* 사용자 정보 카드 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-7 h-7 text-primary-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">
                <Shield className="w-3 h-3" />
                {getRoleLabel(user.role)}
              </span>
            </div>
          </div>
        </div>

        {/* AI 집사 대화 시작 버튼 */}
        <button
          onClick={() => router.push('/chat')}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-2xl shadow-sm p-6 mb-6 flex items-center gap-4 transition-colors"
          style={{ minHeight: '72px' }}
        >
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold">AI 집사에게 물어보기</h3>
            <p className="text-primary-100 text-sm">스마트폰, 은행, 병원 예약 등 무엇이든 도와드려요</p>
          </div>
        </button>

        {/* 준비 중 안내 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-4xl mb-4">🏗️</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">더 많은 기능 준비 중</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            부모님 연결, 활동 요약, 구독 관리 기능이 곧 추가됩니다.
          </p>
        </div>
      </main>
    </div>
  );
}

/** 역할 한글 라벨 */
function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    SENIOR: '시니어',
    FAMILY: '가족',
    AGENT: '상담원',
    ADMIN: '관리자',
  };
  return labels[role] || role;
}
