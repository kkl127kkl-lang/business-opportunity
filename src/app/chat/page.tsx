/**
 * @description 채팅 목록 페이지 — 주제별 대화방 목록 + 새 대화 시작
 * 이전 대화는 카테고리별로 분류, 각 대화방 클릭 시 이어서 진행
 */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { getLocalSessions, getLocalMessages } from '@/lib/services/chat-service';
import { CATEGORY_LABELS } from '@/types/chat';
import type { ChatSession } from '@/types/chat';

/** 카테고리별 이모지 매핑 */
const CATEGORY_EMOJI: Record<string, string> = {
  KIOSK: '🍔', DELIVERY: '🛵', BANKING: '🏦', TRANSPORT: '🚄',
  HOSPITAL: '🏥', GOVERNMENT: '🏠', SHOPPING: '🛒', PHONE_SETTINGS: '📱',
  APP_INSTALL: '📲', WIFI: '📡', PHOTO: '📸', SNS: '💬',
  SECURITY: '🔒', INSURANCE: '💰', ENTERTAINMENT: '🎬', FOOD_ORDER: '🍕',
  OTHER: '💡',
};

/** 새 대화 시작용 퀵 카테고리 — 컬러 배경 포함 */
const QUICK_STARTS = [
  { emoji: '🛒', label: '쇼핑 주문', desc: '장보기·택배·반품', prompt: '온라인에서 물건을 주문하고 싶어요', bg: 'bg-orange-50', border: 'border-orange-200', hoverBg: 'hover:bg-orange-100' },
  { emoji: '🏦', label: '은행/송금', desc: '이체·OTP·잔액', prompt: '모바일뱅킹으로 송금하는 방법을 알려주세요', bg: 'bg-blue-50', border: 'border-blue-200', hoverBg: 'hover:bg-blue-100' },
  { emoji: '🚄', label: 'KTX 예매', desc: '기차표·좌석·변경', prompt: 'KTX 기차표를 예매하고 싶어요', bg: 'bg-purple-50', border: 'border-purple-200', hoverBg: 'hover:bg-purple-100' },
  { emoji: '📱', label: '스마트폰 설정', desc: '글자크기·소리·화면', prompt: '스마트폰 글자 크기를 키우고 싶어요', bg: 'bg-cyan-50', border: 'border-cyan-200', hoverBg: 'hover:bg-cyan-100' },
  { emoji: '🏥', label: '병원 예약', desc: '접수·예약·조회', prompt: '병원 진료 예약을 하고 싶어요', bg: 'bg-green-50', border: 'border-green-200', hoverBg: 'hover:bg-green-100' },
  { emoji: '🔒', label: '피싱 확인', desc: '사기전화·문자·링크', prompt: '이상한 전화를 받았는데 사기인지 확인해주세요', bg: 'bg-red-50', border: 'border-red-200', hoverBg: 'hover:bg-red-100' },
  { emoji: '🍔', label: '음식 주문', desc: '배달·키오스크·포장', prompt: '배달 음식을 주문하고 싶어요', bg: 'bg-amber-50', border: 'border-amber-200', hoverBg: 'hover:bg-amber-100' },
  { emoji: '💡', label: '기타 질문', desc: '뭐든 물어보세요', prompt: '', bg: 'bg-gray-50', border: 'border-gray-200', hoverBg: 'hover:bg-gray-100' },
];

export default function ChatListPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [lastMessages, setLastMessages] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/chat');
    }
  }, [authLoading, user, router]);

  /* 세션 목록 로드 */
  useEffect(() => {
    if (!user) return;
    const allSessions = getLocalSessions();
    setSessions(allSessions);

    /* 각 세션의 마지막 메시지 가져오기 */
    const msgs: Record<string, string> = {};
    allSessions.forEach((s) => {
      const sessionMsgs = getLocalMessages(s.id);
      if (sessionMsgs.length > 0) {
        const last = sessionMsgs[sessionMsgs.length - 1];
        msgs[s.id] = last.content.length > 40 ? last.content.slice(0, 40) + '...' : last.content;
      }
    });
    setLastMessages(msgs);
  }, [user]);

  /** 새 대화 시작 — 프롬프트가 있으면 바로 전송, 없으면 빈 채팅방 */
  const handleNewChat = (prompt?: string) => {
    if (prompt) {
      router.push(`/chat/new?prompt=${encodeURIComponent(prompt)}`);
    } else {
      router.push('/chat/new');
    }
  };

  /** 기존 대화방 열기 */
  const handleOpenSession = (sessionId: string) => {
    router.push(`/chat/${sessionId}`);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    );
  }

  if (!user) return null;

  /** 시간 표시 */
  const getTimeLabel = (dateStr: string): string => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (diff < 1) return '방금';
    if (diff < 60) return `${diff}분 전`;
    if (diff < 1440) return `${Math.floor(diff / 60)}시간 전`;
    return `${Math.floor(diff / 1440)}일 전`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 상단 바 */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 shrink-0">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/')} className="p-1 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm">🏠</div>
              <div>
                <h1 className="text-base font-bold text-gray-900">AI 집사</h1>
                <p className="text-[10px] text-green-500 font-medium">24시간 도와드려요</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto max-w-2xl mx-auto w-full px-4 py-6">
        {/* 인사말 */}
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-gray-900 mb-1">
            안녕하세요, {user.name}님! 👋
          </h2>
          <p className="text-sm text-gray-400">무엇을 도와드릴까요?</p>
        </div>

        {/* 새 대화 시작 — 컬러풀한 카드 */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-3">
            {QUICK_STARTS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNewChat(item.prompt)}
                className={`${item.bg} ${item.border} ${item.hoverBg} border rounded-2xl p-4 text-left transition-all active:scale-[0.97] shadow-sm hover:shadow-md`}
              >
                <span className="text-3xl block mb-2">{item.emoji}</span>
                <span className="text-sm font-bold text-gray-900 block">{item.label}</span>
                <span className="text-[11px] text-gray-500 block mt-0.5">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 이전 대화 목록 */}
        {sessions.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wide">
              이전 대화 <span className="text-gray-400 font-normal">({sessions.length})</span>
            </h2>
            <div className="space-y-2">
              {sessions.map((s) => {
                const categoryLabel = s.category ? CATEGORY_LABELS[s.category] : '대화';
                const emoji = s.category ? (CATEGORY_EMOJI[s.category] || '💬') : '💬';
                const lastMsg = lastMessages[s.id];

                return (
                  <button
                    key={s.id}
                    onClick={() => handleOpenSession(s.id)}
                    className="w-full bg-white rounded-xl p-4 border border-gray-100 hover:border-primary-200 hover:shadow-sm transition-all text-left active:scale-[0.99]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center text-xl shrink-0">
                        {emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-sm font-semibold text-gray-900">{categoryLabel}</span>
                          <span className="text-[10px] text-gray-400 shrink-0">{getTimeLabel(s.updatedAt)}</span>
                        </div>
                        {lastMsg && (
                          <p className="text-xs text-gray-400 truncate">{lastMsg}</p>
                        )}
                      </div>
                      {/* 상태 표시 */}
                      {s.status === 'ACTIVE' && (
                        <div className="w-2 h-2 bg-green-400 rounded-full shrink-0 mt-2" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 대화 없을 때 안내 */}
        {sessions.length === 0 && (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-gray-400 text-sm">
              위 주제를 눌러서 대화를 시작해보세요!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
