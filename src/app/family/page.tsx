/**
 * @description 가족 대시보드 — 부모님 활동 요약 + 성취 + 알림 + 구독 관리
 * Phase 5 본격 구현: 자녀가 부모님의 디지털 생활을 따뜻하게 지켜보는 공간
 */
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  getParentProfile,
  getWeeklyActivity,
  getAchievements,
  getFamilyAlerts,
  getSubscriptionInfo,
  getRelativeTime,
} from '@/lib/services/family-service';
import type {
  ParentProfile,
  WeeklyActivity,
  Achievement,
  FamilyAlert,
  SubscriptionInfo,
} from '@/lib/services/family-service';

type TabId = 'home' | 'activity' | 'gift' | 'settings';

export default function FamilyDashboard() {
  const { user, isLoading, isLocalMode, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [parent, setParent] = useState<ParentProfile | null>(null);
  const [activity, setActivity] = useState<WeeklyActivity | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [alerts, setAlerts] = useState<FamilyAlert[]>([]);
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);

  useEffect(() => {
    setParent(getParentProfile());
    setActivity(getWeeklyActivity());
    setAchievements(getAchievements());
    setAlerts(getFamilyAlerts());
    setSubscription(getSubscriptionInfo());
  }, []);

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

  if (!user) {
    router.push('/login');
    return null;
  }

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <span className="text-lg font-bold text-gray-900">디지털 집사</span>
          </div>
          <div className="flex items-center gap-3">
            {/* 알림 아이콘 */}
            <button className="relative p-2 text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{unreadCount}</span>
              )}
            </button>
            {/* 프로필 */}
            <button onClick={handleSignOut} className="text-xs text-gray-400 hover:text-gray-600">
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* 로컬 모드 안내 */}
        {isLocalMode && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
            <strong>테스트 모드</strong> — 모의 데이터로 동작 중
          </div>
        )}

        {/* 부모님 카드 */}
        {parent && (
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center text-3xl">
                {parent.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-gray-900">{parent.name}</h2>
                  <span className="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full font-medium">{parent.relation}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${parent.status === 'active' ? 'bg-green-400' : 'bg-gray-300'}`} />
                  <span className="text-xs text-gray-400">
                    마지막 활동 {getRelativeTime(parent.lastActiveAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* 이번 주 요약 KPI */}
            {activity && (
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xl font-extrabold text-gray-900">{activity.helpRequests}</p>
                  <p className="text-[10px] text-gray-400">도움 요청</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <p className="text-xl font-extrabold text-green-600">{activity.selfSolved}</p>
                  <p className="text-[10px] text-gray-400">혼자 해결 🎉</p>
                </div>
                <div className="bg-primary-50 rounded-xl p-3 text-center">
                  <p className="text-xl font-extrabold text-primary-600">{activity.topCategory}</p>
                  <p className="text-[10px] text-gray-400">최다 카테고리</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI 집사 대화 시작 */}
        <button
          onClick={() => router.push('/chat')}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-2xl p-4 mb-6 flex items-center gap-3 transition-colors active:scale-[0.98]"
        >
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0 text-xl">💬</div>
          <div className="text-left">
            <h3 className="font-bold">AI 집사에게 물어보기</h3>
            <p className="text-primary-100 text-xs">무엇이든 도와드려요</p>
          </div>
        </button>

        {/* 알림 섹션 */}
        {alerts.filter((a) => !a.isRead).length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">새 알림</h3>
            <div className="space-y-2">
              {alerts.filter((a) => !a.isRead).map((alert) => (
                <div
                  key={alert.id}
                  className={`
                    bg-white rounded-xl p-4 border transition-all
                    ${alert.priority === 'urgent' ? 'border-red-200 bg-red-50/50' : 'border-gray-100'}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">
                      {alert.type === 'achievement' ? '🏆' : alert.type === 'security' ? '🚨' : alert.type === 'weekly_report' ? '📊' : '📱'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{alert.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{alert.message}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{getRelativeTime(alert.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 주간 활동 타임라인 */}
        {activity && (
          <div className="bg-white rounded-2xl p-5 border border-gray-100 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">이번 주 활동</h3>
            <div className="flex items-end gap-2 h-24 mb-2">
              {activity.timeline.map((t) => {
                const maxReq = Math.max(...activity.timeline.map((x) => x.requests + x.selfSolved), 1);
                const total = t.requests + t.selfSolved;
                const height = (total / maxReq) * 100;
                const selfPct = total > 0 ? (t.selfSolved / total) * 100 : 0;
                return (
                  <div key={t.date} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-gray-400">{total}</span>
                    <div className="w-full rounded-t-sm overflow-hidden" style={{ height: `${Math.max(height, 8)}%` }}>
                      <div className="bg-green-400 w-full" style={{ height: `${selfPct}%` }} />
                      <div className="bg-primary-400 w-full flex-1" style={{ height: `${100 - selfPct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 justify-center">
              {activity.timeline.map((t) => (
                <span key={t.date} className="flex-1 text-center text-[10px] text-gray-400">{t.day}</span>
              ))}
            </div>
            <div className="flex gap-4 justify-center mt-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-primary-400 rounded-sm" />
                <span className="text-[10px] text-gray-400">도움 요청</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-green-400 rounded-sm" />
                <span className="text-[10px] text-gray-400">혼자 해결</span>
              </div>
            </div>
          </div>
        )}

        {/* 성취 뱃지 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">성취 기록</h3>
          <div className="space-y-3">
            {achievements.map((badge) => (
              <div key={badge.id} className="flex items-center gap-3">
                <span className="text-2xl">{badge.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">{badge.title}</p>
                    {badge.isNew && (
                      <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">NEW</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{badge.description}</p>
                </div>
                <span className="text-[10px] text-gray-300 shrink-0">{getRelativeTime(badge.earnedAt)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 구독 정보 */}
        {subscription && (
          <div className="bg-white rounded-2xl p-5 border border-gray-100 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">구독 정보</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-gray-400">현재 플랜</span>
                <span className="text-sm font-semibold text-primary-600">{subscription.plan}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-gray-400">월 요금</span>
                <span className="text-sm font-medium text-gray-700">{subscription.price}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-gray-400">다음 결제일</span>
                <span className="text-sm font-medium text-gray-700">{subscription.nextBillingDate}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-gray-400">결제 수단</span>
                <span className="text-sm font-medium text-gray-700">{subscription.paymentMethod}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium py-2.5 rounded-lg transition-colors">
                플랜 변경
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium py-2.5 rounded-lg transition-colors">
                결제 수단 변경
              </button>
            </div>
          </div>
        )}

        {/* 선물하기 CTA */}
        <Link href="/family/gift">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-5 text-center hover:shadow-md transition-all active:scale-[0.98]">
            <span className="text-3xl block mb-2">🎁</span>
            <h3 className="font-bold text-gray-900 mb-1">다른 부모님께도 선물하기</h3>
            <p className="text-xs text-gray-700">7일 무료 체험 포함</p>
          </div>
        </Link>
      </main>

      {/* 모바일 하단 탭 바 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="flex justify-around py-2 max-w-md mx-auto">
          {([
            { id: 'home' as TabId, icon: '🏠', label: '홈' },
            { id: 'activity' as TabId, icon: '📊', label: '활동' },
            { id: 'gift' as TabId, icon: '🎁', label: '선물하기' },
            { id: 'settings' as TabId, icon: '⚙️', label: '설정' },
          ]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'gift') { router.push('/family/gift'); return; }
                setActiveTab(tab.id);
              }}
              className={`
                flex flex-col items-center gap-0.5 py-1 px-4 text-[10px] font-medium transition-colors
                ${activeTab === tab.id ? 'text-primary-500' : 'text-gray-400'}
              `}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
