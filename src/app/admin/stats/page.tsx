/**
 * @description 상담원 통계 페이지 — 시간대별 요청량 + AI 처리율 + 카테고리 TOP 5
 */
'use client';

import { useState, useEffect } from 'react';
import { getAgentStats } from '@/lib/services/admin-service';
import type { AgentStats } from '@/lib/services/admin-service';

export default function StatsPage() {
  const [stats, setStats] = useState<AgentStats | null>(null);

  useEffect(() => {
    setStats(getAgentStats());
  }, []);

  if (!stats) return null;

  const maxHourly = Math.max(...stats.hourlyRequests.map((h) => h.count));
  const maxCategory = Math.max(...stats.topCategories.map((c) => c.count));
  const maxWeekly = Math.max(...stats.weeklyTrend.map((d) => d.ai + d.agent));

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">요청 통계</h1>
        <p className="text-gray-400 text-sm mt-1">서비스 현황과 추이를 한눈에 확인하세요</p>
      </div>

      {/* 요약 KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatCard label="오늘 처리 완료" value={stats.todayCompleted} unit="건" />
        <StatCard label="AI 처리율" value={stats.aiHandleRate} unit="%" />
        <StatCard label="평균 응답 시간" value={stats.avgResponseTime} unit="" />
        <StatCard label="만족도" value={stats.satisfactionRate} unit="/5.0" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 시간대별 요청량 */}
        <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">시간대별 요청량</h3>
          <div className="space-y-2">
            {stats.hourlyRequests.map((h) => (
              <div key={h.hour} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-8 shrink-0">{h.hour}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-primary-400 h-full rounded-full flex items-center justify-end pr-2 transition-all"
                    style={{ width: `${(h.count / maxHourly) * 100}%`, minWidth: '30px' }}
                  >
                    <span className="text-[10px] text-white font-bold">{h.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 에스컬레이션 사유 TOP 5 */}
        <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">에스컬레이션 사유 TOP 5</h3>
          <div className="space-y-3">
            {stats.topCategories.map((cat, i) => (
              <div key={cat.category} className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-300 w-6 text-center">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{cat.category}</span>
                    <span className="text-xs text-gray-400">{cat.count}건</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary-400 h-full rounded-full transition-all"
                      style={{ width: `${(cat.count / maxCategory) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 주간 AI vs 상담원 처리 추이 */}
        <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 lg:col-span-2">
          <h3 className="font-bold text-gray-900 mb-1">주간 처리 추이</h3>
          <p className="text-xs text-gray-400 mb-4">AI가 처리한 건수 vs 상담원이 처리한 건수</p>

          {/* 범례 */}
          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-primary-400 rounded-sm" />
              <span className="text-xs text-gray-500">AI 처리</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-yellow-400 rounded-sm" />
              <span className="text-xs text-gray-500">상담원 처리</span>
            </div>
          </div>

          {/* 바 차트 */}
          <div className="flex items-end gap-3 h-40">
            {stats.weeklyTrend.map((d) => {
              const total = d.ai + d.agent;
              const aiPct = (d.ai / maxWeekly) * 100;
              const agentPct = (d.agent / maxWeekly) * 100;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-gray-400">{total}</span>
                  <div className="w-full flex flex-col gap-0.5" style={{ height: '120px' }}>
                    <div className="flex-1" />
                    <div className="bg-primary-400 rounded-t-sm" style={{ height: `${aiPct}%`, minHeight: '4px' }} />
                    <div className="bg-yellow-400 rounded-b-sm" style={{ height: `${agentPct}%`, minHeight: '4px' }} />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/** 통계 카드 */
function StatCard({ label, value, unit }: { label: string; value: number | string; unit: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-5 border border-gray-100">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-extrabold text-gray-900">{value}</span>
        <span className="text-sm text-gray-400">{unit}</span>
      </div>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
    </div>
  );
}
