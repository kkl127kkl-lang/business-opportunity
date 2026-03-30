/**
 * @description 에스컬레이션 대기 목록 — 전체 목록 + 필터 + 우선순위 정렬
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getEscalations,
  acceptEscalation,
  getWaitTime,
  getPriorityLabel,
} from '@/lib/services/admin-service';
import type { EscalationRequest, EscalationStatus } from '@/lib/services/admin-service';
import { useAuth } from '@/lib/auth/auth-context';

const STATUS_TABS: { value: EscalationStatus | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'waiting', label: '대기 중' },
  { value: 'in_progress', label: '진행 중' },
  { value: 'completed', label: '완료' },
];

export default function QueuePage() {
  const { user } = useAuth();
  const [escalations, setEscalations] = useState<EscalationRequest[]>([]);
  const [filter, setFilter] = useState<EscalationStatus | 'all'>('all');

  useEffect(() => {
    setEscalations(getEscalations());
  }, []);

  const handleAccept = (id: string) => {
    if (!user) return;
    acceptEscalation(id, user.email ?? 'agent@test.com');
    setEscalations(getEscalations());
  };

  const filtered = filter === 'all'
    ? escalations
    : escalations.filter((e) => e.status === filter);

  /* 우선순위 정렬: urgent > normal > low, 대기 시간 오래된 순 */
  const priorityOrder = { urgent: 0, normal: 1, low: 2 };
  const sorted = [...filtered].sort((a, b) => {
    const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (pDiff !== 0) return pDiff;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">에스컬레이션 목록</h1>
        <p className="text-gray-400 text-sm mt-1">AI가 처리하지 못한 요청을 확인하고 접수하세요</p>
      </div>

      {/* 필터 탭 */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {STATUS_TABS.map((tab) => {
          const count = tab.value === 'all'
            ? escalations.length
            : escalations.filter((e) => e.status === tab.value).length;
          return (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`
                shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${filter === tab.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      {/* 목록 */}
      {sorted.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-100">
          <span className="text-4xl block mb-3">📭</span>
          <p className="text-gray-500 font-medium">해당 상태의 요청이 없습니다</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((esc) => {
            const prio = getPriorityLabel(esc.priority);
            const statusLabel = esc.status === 'waiting' ? '대기 중' : esc.status === 'in_progress' ? '진행 중' : '완료';
            const statusColor = esc.status === 'waiting' ? 'text-orange-500' : esc.status === 'in_progress' ? 'text-primary-500' : 'text-green-500';

            return (
              <div
                key={esc.id}
                className={`
                  bg-white rounded-xl p-4 md:p-5 border transition-all hover:shadow-md
                  ${esc.priority === 'urgent' && esc.status === 'waiting' ? 'border-red-200' : 'border-gray-100'}
                `}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* 상단: 우선순위 + 카테고리 + 상태 */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${prio.color} ${prio.bg}`}>
                        {prio.text}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{esc.category}</span>
                      <span className={`text-xs font-medium ${statusColor}`}>{statusLabel}</span>
                    </div>

                    {/* 요약 */}
                    <p className="text-sm font-semibold text-gray-900 mb-1">{esc.summary}</p>

                    {/* 상세 정보 */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                      <span>{esc.customerName} ({esc.customerAge}세)</span>
                      <span>AI 확신도 {Math.round(esc.aiConfidence * 100)}%</span>
                      <span>대기 {getWaitTime(esc.createdAt)}</span>
                      {esc.messages.length > 0 && <span>메시지 {esc.messages.length}건</span>}
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="shrink-0">
                    {esc.status === 'waiting' ? (
                      <Link href={`/admin/chat/${esc.id}`}>
                        <button
                          onClick={() => handleAccept(esc.id)}
                          className="bg-primary-500 hover:bg-primary-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all active:scale-[0.98]"
                        >
                          접수
                        </button>
                      </Link>
                    ) : esc.status === 'in_progress' ? (
                      <Link href={`/admin/chat/${esc.id}`}>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors">
                          이어하기
                        </button>
                      </Link>
                    ) : (
                      <Link href={`/admin/chat/${esc.id}`}>
                        <button className="text-gray-400 text-xs font-medium px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                          보기
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
