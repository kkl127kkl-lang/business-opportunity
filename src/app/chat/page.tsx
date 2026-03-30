/**
 * @description AI 집사 채팅 페이지 — 시니어 친화 대화 UI
 *
 * 시니어 유니버설 디자인 적용:
 * - 16px 이상 기본 폰트, 44px 최소 터치 영역
 * - 큰 입력창 + 큰 전송 버튼
 * - 카테고리 퀵 버튼 (자주 사용하는 서비스)
 * - 보이스피싱 경고 시 빨간 테두리 + 긴급 안내
 */

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import {
  sendMessage,
  getLocalSessions,
  getLocalMessages,
} from '@/lib/services/chat-service';
import { CATEGORY_LABELS } from '@/types/chat';
import type { ChatMessage, ChatSession } from '@/types/chat';
import {
  Send,
  ArrowLeft,
  Bot,
  User,
  AlertTriangle,
  Phone,
  Plus,
  MessageCircle,
  Shield,
} from 'lucide-react';

/** 카테고리 퀵 버튼 (자주 쓰는 6개) */
const QUICK_CATEGORIES = [
  { label: '📱 스마트폰 설정', prompt: '스마트폰 글자 크기를 키우고 싶어요' },
  { label: '🏦 은행/송금', prompt: '모바일뱅킹으로 송금하는 방법을 알려주세요' },
  { label: '🚄 KTX 예매', prompt: 'KTX 기차표를 예매하고 싶어요' },
  { label: '🛒 쿠팡 주문', prompt: '쿠팡에서 물건을 주문하고 싶어요' },
  { label: '🏥 병원 예약', prompt: '병원 진료 예약을 하고 싶어요' },
  { label: '🔒 피싱 확인', prompt: '이상한 전화를 받았는데 사기인지 확인해주세요' },
] as const;

export default function ChatPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /** 스크롤을 최하단으로 이동 */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  /** 메시지 변경 시 자동 스크롤 */
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  /** 로그인 안 되어 있으면 로그인으로 */
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/chat');
    }
  }, [authLoading, user, router]);

  /** 기존 세션 복원 */
  useEffect(() => {
    if (!user) return;
    const sessions = getLocalSessions();
    if (sessions.length > 0) {
      const latest = sessions[0];
      setSession(latest);
      setMessages(getLocalMessages(latest.id));
      setShowQuickMenu(false);
    }
  }, [user]);

  /** 메시지 전송 */
  const handleSend = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || !user || isTyping) return;

    setInput('');
    setIsTyping(true);
    setShowQuickMenu(false);

    try {
      const response = await sendMessage(
        { content, sessionId: session?.id },
        user.id
      );

      setSession(response.session);
      setMessages((prev) => [...prev, response.userMessage, response.aiMessage]);
    } catch {
      /** 에러 시 시스템 메시지 표시 */
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

  /** 새 대화 시작 */
  const handleNewChat = () => {
    setSession(null);
    setMessages([]);
    setShowQuickMenu(true);
    setInput('');
  };

  /** Enter 키로 전송 (Shift+Enter는 줄바꿈) */
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 상단 바 */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 text-gray-500 hover:text-gray-700"
            aria-label="뒤로가기"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900">AI 집사</h1>
              <p className="text-xs text-green-500">온라인</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleNewChat}
          className="flex items-center gap-1 px-3 py-2 text-sm text-primary-500 hover:bg-primary-50 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          새 대화
        </button>
      </header>

      {/* 메시지 영역 */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* 환영 메시지 (새 대화일 때) */}
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-primary-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              안녕하세요, {user.name}님! 👋
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              무엇이든 편하게 물어보세요.<br />
              스마트폰, 은행, 병원 예약 등<br />
              디지털 관련 모든 것을 도와드려요.
            </p>
          </div>
        )}

        {/* 퀵 카테고리 버튼 (새 대화일 때) */}
        {showQuickMenu && messages.length === 0 && (
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {QUICK_CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleSend(cat.prompt)}
                className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-primary-300 hover:bg-primary-50 transition-colors"
                style={{ minHeight: '56px' }}
              >
                <span className="text-base font-medium text-gray-700">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* 메시지 목록 */}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* AI 타이핑 인디케이터 */}
        {isTyping && (
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-primary-500" />
            </div>
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
        {/* 세션 카테고리 표시 */}
        {session?.category && (
          <div className="flex items-center gap-1 mb-2">
            <Shield className="w-3 h-3 text-primary-400" />
            <span className="text-xs text-primary-500 font-medium">
              {CATEGORY_LABELS[session.category]}
            </span>
          </div>
        )}

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
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="p-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white rounded-xl transition-colors shrink-0"
            style={{ minWidth: '48px', minHeight: '48px' }}
            aria-label="전송"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-2 text-center">
          AI가 답변해드려요. 복잡한 문제는 전문 상담원이 도와드립니다.
        </p>
      </footer>
    </div>
  );
}

/** 메시지 버블 컴포넌트 */
function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'USER';
  const isPhishing = message.metadata?.phishing && message.metadata.risk !== 'low';

  return (
    <div className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* 아바타 */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser ? 'bg-gray-200' : 'bg-primary-100'
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-gray-600" />
        ) : (
          <Bot className="w-4 h-4 text-primary-500" />
        )}
      </div>

      {/* 말풍선 */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-primary-500 text-white rounded-tr-md'
            : isPhishing
              ? 'bg-red-50 border-2 border-red-300 text-gray-900 rounded-tl-md'
              : 'bg-white border border-gray-200 text-gray-900 rounded-tl-md'
        }`}
      >
        {/* 보이스피싱 경고 배너 */}
        {isPhishing && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-red-200">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
            <span className="text-sm font-bold text-red-600">
              {message.metadata?.risk === 'high' ? '🚨 피싱 위험!' : '⚠️ 주의 필요'}
            </span>
          </div>
        )}

        {/* 메시지 내용 */}
        <p className="text-base leading-relaxed whitespace-pre-wrap" style={{ fontSize: '16px' }}>
          {message.content}
        </p>

        {/* 보이스피싱 고위험 시 긴급 연락 버튼 */}
        {isPhishing && message.metadata?.risk === 'high' && (
          <div className="mt-3 pt-2 border-t border-red-200">
            <a
              href="tel:112"
              className="flex items-center justify-center gap-2 bg-red-500 text-white py-3 px-4 rounded-xl font-bold text-base"
              style={{ minHeight: '48px' }}
            >
              <Phone className="w-5 h-5" />
              경찰청 112 바로 전화
            </a>
          </div>
        )}

        {/* 시간 표시 */}
        <p className={`text-xs mt-1 ${isUser ? 'text-primary-200' : 'text-gray-400'}`}>
          {new Date(message.createdAt).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
