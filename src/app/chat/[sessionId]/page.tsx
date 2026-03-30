/**
 * @description 개별 대화방 — 주제별 채팅 뷰
 * /chat/new → 새 대화 (prompt 쿼리파라미터로 첫 메시지 자동 전송)
 * /chat/[sessionId] → 기존 대화 이어서
 */
'use client';

import { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import {
  sendMessage,
  getLocalMessages,
  getLocalSessions,
} from '@/lib/services/chat-service';
import { CATEGORY_LABELS } from '@/types/chat';
import type { ChatMessage, ChatSession } from '@/types/chat';

/** Suspense 래퍼 — useSearchParams() 빌드 호환 */
export default function ChatSessionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    }>
      <ChatSessionContent />
    </Suspense>
  );
}

function ChatSessionContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading } = useAuth();

  const sessionId = params.sessionId as string;
  const isNewChat = sessionId === 'new';
  const initialPrompt = searchParams.get('prompt') || '';

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasSentInitial, setHasSentInitial] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /** 스크롤을 최하단으로 이동 */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  /** 로그인 체크 */
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/chat');
    }
  }, [authLoading, user, router]);

  /** 기존 세션 로드 */
  useEffect(() => {
    if (!user || isNewChat) return;
    const allSessions = getLocalSessions();
    const found = allSessions.find((s) => s.id === sessionId);
    if (found) {
      setSession(found);
      setMessages(getLocalMessages(found.id));
    }
  }, [user, sessionId, isNewChat]);

  /** 새 대화 + 초기 프롬프트 자동 전송 */
  useEffect(() => {
    if (!user || !isNewChat || !initialPrompt || hasSentInitial) return;
    setHasSentInitial(true);
    handleSendInternal(initialPrompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isNewChat, initialPrompt, hasSentInitial]);

  /** 메시지 전송 (내부) */
  const handleSendInternal = async (content: string) => {
    if (!content.trim() || !user || isTyping) return;

    setIsTyping(true);
    try {
      const response = await sendMessage(
        { content: content.trim(), sessionId: session?.id },
        user.id
      );
      setSession(response.session);
      setMessages((prev) => [...prev, response.userMessage, response.aiMessage]);

      /* 새 대화였으면 URL을 세션 ID로 교체 (뒤로가기 시 목록으로) */
      if (isNewChat || !session) {
        window.history.replaceState(null, '', `/chat/${response.session.id}`);
      }
    } catch {
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        sessionId: session?.id || '',
        role: 'AI',
        content: '죄송해요, 일시적으로 문제가 생겼어요. 다시 한번 말씀해주시겠어요?',
        metadata: null,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  /** 전송 버튼 / Enter */
  const handleSend = () => {
    if (!input.trim()) return;
    handleSendInternal(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    );
  }

  if (!user) return null;

  /** 카테고리 라벨 */
  const categoryLabel = session?.category ? CATEGORY_LABELS[session.category] : 'AI 집사';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 상단 바 */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/chat')} className="p-1 text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-lg">
              {session?.category ? getCategoryEmoji(session.category) : '🏠'}
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900">{categoryLabel}</h1>
              <p className="text-xs text-green-500">온라인</p>
            </div>
          </div>
        </div>
      </header>

      {/* 메시지 영역 */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* 환영 메시지 */}
        {messages.length === 0 && !isTyping && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              🏠
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              안녕하세요, {user.name}님! 👋
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              무엇이든 편하게 물어보세요.<br />
              디지털 관련 모든 것을 도와드려요.
            </p>
          </div>
        )}

        {/* 메시지 목록 */}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* AI 타이핑 */}
        {isTyping && (
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center shrink-0 text-sm">🏠</div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* 입력 영역 */}
      <footer className="bg-white border-t border-gray-200 px-4 py-3 shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="무엇이든 물어보세요..."
            rows={1}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-base"
            style={{ minHeight: '48px', maxHeight: '120px', fontSize: '16px' }}
            disabled={isTyping}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white rounded-xl transition-colors shrink-0"
            style={{ minWidth: '48px', minHeight: '48px' }}
            aria-label="전송"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          AI가 답변해드려요. 복잡한 문제는 전문 상담원이 도와드립니다.
        </p>
      </footer>
    </div>
  );
}

/** 카테고리 이모지 */
function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    KIOSK: '🍔', DELIVERY: '🛵', BANKING: '🏦', TRANSPORT: '🚄',
    HOSPITAL: '🏥', GOVERNMENT: '🏠', SHOPPING: '🛒', PHONE_SETTINGS: '📱',
    APP_INSTALL: '📲', WIFI: '📡', PHOTO: '📸', SNS: '💬',
    SECURITY: '🔒', INSURANCE: '💰', ENTERTAINMENT: '🎬', FOOD_ORDER: '🍕',
    OTHER: '💡',
  };
  return map[category] || '💬';
}

/** 메시지 버블 */
function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'USER';
  const isPhishing = message.metadata?.phishing && message.metadata.risk !== 'low';

  return (
    <div className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm ${isUser ? 'bg-gray-200' : 'bg-primary-100'}`}>
        {isUser ? '👤' : '🏠'}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        isUser
          ? 'bg-primary-500 text-white rounded-tr-md'
          : isPhishing
            ? 'bg-red-50 border-2 border-red-300 text-gray-900 rounded-tl-md'
            : 'bg-white border border-gray-200 text-gray-900 rounded-tl-md'
      }`}>
        {isPhishing && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-red-200">
            <span className="text-base">⚠️</span>
            <span className="text-sm font-bold text-red-600">
              {message.metadata?.risk === 'high' ? '🚨 피싱 위험!' : '주의 필요'}
            </span>
          </div>
        )}
        <p className="text-base leading-relaxed whitespace-pre-wrap" style={{ fontSize: '16px' }}>
          {message.content}
        </p>
        {isPhishing && message.metadata?.risk === 'high' && (
          <div className="mt-3 pt-2 border-t border-red-200">
            <a href="tel:112" className="flex items-center justify-center gap-2 bg-red-500 text-white py-3 px-4 rounded-xl font-bold text-base" style={{ minHeight: '48px' }}>
              📞 경찰청 112 바로 전화
            </a>
          </div>
        )}
        <p className={`text-xs mt-1 ${isUser ? 'text-primary-200' : 'text-gray-400'}`}>
          {new Date(message.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
