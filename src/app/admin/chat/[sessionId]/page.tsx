/**
 * @description 상담원 대화 뷰 — 카톡 스타일 대화 히스토리 + 응답 입력 + 고객 프로필
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  getEscalation,
  addAgentMessage,
  completeEscalation,
  getPriorityLabel,
  getWaitTime,
} from '@/lib/services/admin-service';
import type { EscalationRequest } from '@/lib/services/admin-service';

export default function ChatSessionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;
  const [escalation, setEscalation] = useState<EscalationRequest | null>(null);
  const [input, setInput] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const esc = getEscalation(sessionId);
    if (!esc) {
      router.push('/admin/queue');
      return;
    }
    setEscalation(esc);
  }, [sessionId, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [escalation?.messages]);

  if (!escalation) return null;

  /** 메시지 전송 */
  const handleSend = () => {
    if (!input.trim()) return;
    addAgentMessage(sessionId, input.trim());
    setEscalation(getEscalation(sessionId));
    setInput('');
  };

  /** 완료 처리 */
  const handleComplete = () => {
    completeEscalation(sessionId);
    router.push('/admin');
  };

  /** AI 제안 답변 */
  const suggestedReplies = getSuggestedReplies(escalation);
  const prio = getPriorityLabel(escalation.priority);

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* 메인 대화 영역 */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* 상단 바 */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <Link href="/admin/queue" className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-gray-900">{escalation.customerName}</h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${prio.color} ${prio.bg}`}>{prio.text}</span>
              </div>
              <p className="text-xs text-gray-400">{escalation.category} · {escalation.customerAge}세 · {getWaitTime(escalation.createdAt)} 전 요청</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </button>
            {escalation.status !== 'completed' && (
              <button
                onClick={handleComplete}
                className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
              >
                완료 처리
              </button>
            )}
          </div>
        </div>

        {/* 대화 메시지 */}
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-[#B2C7D9] space-y-3">
          {escalation.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'customer' ? 'justify-end' : 'justify-start'}`}>
              {msg.role !== 'customer' && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs text-white shrink-0 mr-2 ${msg.role === 'ai' ? 'bg-gray-500' : 'bg-primary-500'}`}>
                  {msg.role === 'ai' ? '🤖' : '👤'}
                </div>
              )}
              <div className="max-w-[75%]">
                {msg.role !== 'customer' && (
                  <p className="text-[10px] text-gray-600 mb-0.5">{msg.role === 'ai' ? 'AI 집사' : '상담원'}</p>
                )}
                <div className={`
                  rounded-2xl px-3.5 py-2.5
                  ${msg.role === 'customer'
                    ? 'bg-[#FEE500] rounded-tr-sm'
                    : msg.role === 'ai'
                      ? 'bg-white rounded-tl-sm'
                      : 'bg-blue-100 rounded-tl-sm border border-blue-200'
                  }
                `}>
                  <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* AI 제안 답변 */}
        {escalation.status !== 'completed' && suggestedReplies.length > 0 && (
          <div className="bg-blue-50 border-t border-blue-100 px-4 py-2">
            <p className="text-[10px] text-blue-500 font-medium mb-1.5">🤖 AI 제안 답변</p>
            <div className="flex flex-wrap gap-1.5">
              {suggestedReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => setInput(reply)}
                  className="text-xs bg-white border border-blue-200 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors truncate max-w-[200px]"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 입력창 */}
        {escalation.status !== 'completed' ? (
          <div className="bg-white border-t border-gray-200 px-4 py-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="고객에게 보낼 메시지를 입력하세요..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-200 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98]"
              >
                전송
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border-t border-green-100 px-4 py-3 text-center">
            <p className="text-green-600 text-sm font-medium">✅ 상담이 완료되었습니다</p>
          </div>
        )}
      </div>

      {/* 고객 프로필 사이드 패널 */}
      <div className={`
        ${showProfile ? 'block' : 'hidden'} md:block
        w-full md:w-72 bg-white border-l border-gray-200 overflow-y-auto shrink-0
        fixed md:static inset-0 z-40 md:z-auto
      `}>
        <div className="p-5">
          {/* 모바일 닫기 */}
          <button
            onClick={() => setShowProfile(false)}
            className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
              👵
            </div>
            <h3 className="font-bold text-gray-900 text-lg">{escalation.customerName}</h3>
            <p className="text-gray-400 text-sm">{escalation.customerAge}세</p>
          </div>

          {/* 요청 정보 */}
          <div className="space-y-4">
            <InfoRow label="카테고리" value={escalation.category} />
            <InfoRow label="우선순위" value={prio.text} />
            <InfoRow label="AI 확신도" value={`${Math.round(escalation.aiConfidence * 100)}%`} />
            <InfoRow label="요청 시간" value={new Date(escalation.createdAt).toLocaleString('ko-KR')} />
            <InfoRow label="메시지 수" value={`${escalation.messages.length}건`} />
          </div>

          {/* 빠른 액션 */}
          <div className="mt-6 space-y-2">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg transition-colors">
              🖥️ 원격 지원 시작
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg transition-colors">
              👨‍👩‍👧 가족에게 알림
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 정보 행 */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-50">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-700">{value}</span>
    </div>
  );
}

/** 카테고리별 AI 제안 답변 생성 */
function getSuggestedReplies(esc: EscalationRequest): string[] {
  const base = ['안녕하세요, 상담원입니다. 도와드릴게요!'];
  switch (esc.category) {
    case '보안':
      return [...base, '절대 개인정보를 알려주시면 안 됩니다.', '경찰(112)이나 금융감독원(1332)에 신고하세요.', '가족분께도 알려드렸습니다.'];
    case '쇼핑':
      return [...base, '주문 내역에서 확인해 드릴게요.', '반품 접수를 도와드릴게요.', '쿠팡 앱에서 같이 해볼까요?'];
    case '금융':
      return [...base, '본인 인증이 필요합니다.', '은행 고객센터 번호를 알려드릴게요.', '화면 공유로 같이 해볼까요?'];
    case '교통':
      return [...base, '예매 내역을 확인해 드릴게요.', '좌석 변경을 도와드릴게요.'];
    default:
      return [...base, '어떤 부분이 어려우신지 자세히 말씀해주세요.', '화면을 보면서 같이 하실까요?'];
  }
}
