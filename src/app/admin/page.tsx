/**
 * @description 상담원 대시보드 메인 — KPI 카드 + 최근 에스컬레이션 + 빠른 접수
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getEscalations,
  getAgentStats,
  acceptEscalation,
  getWaitTime,
  getPriorityLabel,
} from '@/lib/services/admin-service';
import type { EscalationRequest, AgentStats } from '@/lib/services/admin-service';
import { useAuth } from '@/lib/auth/auth-context';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [escalations, setEscalations] = useState<EscalationRequest[]>([]);
  const [stats, setStats] = useState<AgentStats | null>(null);

  useEffect(() => {
    setEscalations(getEscalations());
    setStats(getAgentStats());
  }, []);

  /** 접수 처리 */
  const handleAccept = (id: string) => {
    if (!user) return;
    acceptEscalation(id, user.email ?? 'agent@test.com');
    setEscalations(getEscalations());
  };

  const waiting = escalations.filter((e) => e.status === 'waiting');
  const inProgress = escalations.filter((e) => e.status === 'in_progress');

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">상담원 대시보드</h1>
        <p className="text-gray-400 text-sm mt-1">에스컬레이션 요청을 관리하고 고객을 도와주세요</p>
      </div>

      {/* KPI 카드 4개 */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          <KPICard
            label="오늘 총 요청"
            value={stats.todayTotal}
            unit="건"
            icon="📥"
            color="blue"
          />
          <KPICard
            label="대기 중"
            value={stats.todayWaiting}
            unit="건"
            icon="⏳"
            color="red"
            highlight={stats.todayWaiting > 0}
          />
          <KPICard
            label="AI 처리율"
            value={stats.aiHandleRate}
            unit="%"
            icon="🤖"
            color="green"
          />
          <KPICard
            label="평균 응답 시간"
            value={stats.avgResponseTime}
            unit=""
            icon="⚡"
            color="purple"
          />
        </div>
      )}

      {/* 대기 중 에스컬레이션 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            대기 중 요청 <span className="text-red-500 text-base">({waiting.length})</span>
          </h2>
          <Link href="/admin/queue" className="text-sm text-primary-500 hover:text-primary-600 font-medium">
            전체 보기 →
          </Link>
        </div>

        {waiting.length === 0 ? (
          <div className="bg-green-50 rounded-2xl p-8 text-center border border-green-100">
            <span className="text-4xl block mb-2">✅</span>
            <p className="text-green-700 font-medium">대기 중인 요청이 없습니다</p>
            <p className="text-green-500 text-sm">모든 요청이 처리되었어요!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {waiting.map((esc) => {
              const prio = getPriorityLabel(esc.priority);
              return (
                <div
                  key={esc.id}
                  className={`
                    bg-white rounded-xl p-4 border transition-all hover:shadow-md
                    ${esc.priority === 'urgent' ? 'border-red-200 bg-red-50/30' : 'border-gray-100'}
                  `}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${prio.color} ${prio.bg}`}>
                          {prio.text}
                        </span>
                        <span className="text-xs text-gray-400">{esc.category}</span>
                        <span className="text-xs text-gray-400">· {getWaitTime(esc.createdAt)} 대기</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 truncate">{esc.summary}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{esc.customerName} ({esc.customerAge}세) · AI 확신도 {Math.round(esc.aiConfidence * 100)}%</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Link href={`/admin/chat/${esc.id}`}>
                        <button
                          onClick={() => handleAccept(esc.id)}
                          className="bg-primary-500 hover:bg-primary-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all active:scale-[0.98]"
                        >
                          접수
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 진행 중 */}
      {inProgress.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            진행 중 <span className="text-primary-500 text-base">({inProgress.length})</span>
          </h2>
          <div className="space-y-3">
            {inProgress.map((esc) => (
              <Link key={esc.id} href={`/admin/chat/${esc.id}`}>
                <div className="bg-white rounded-xl p-4 border border-primary-100 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                    <span className="text-xs text-primary-500 font-medium">진행 중</span>
                    <span className="text-xs text-gray-400">{esc.category}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{esc.summary}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{esc.customerName} ({esc.customerAge}세)</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** KPI 카드 컴포넌트 */
function KPICard({ label, value, unit, icon, color, highlight }: {
  label: string;
  value: number | string;
  unit: string;
  icon: string;
  color: string;
  highlight?: boolean;
}) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className={`bg-white rounded-2xl p-4 md:p-5 border ${highlight ? 'border-red-200 shadow-sm shadow-red-100' : 'border-gray-100'}`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xl w-9 h-9 flex items-center justify-center rounded-lg ${colorMap[color]}`}>{icon}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl md:text-3xl font-extrabold text-gray-900">{value}</span>
        <span className="text-sm text-gray-400">{unit}</span>
      </div>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
    </div>
  );
}
