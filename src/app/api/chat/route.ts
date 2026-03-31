/**
 * @description 채팅 API — Google Gemini API 연동
 * POST: 사용자 메시지 → Gemini AI 응답 반환
 * API 키가 없으면 로컬 규칙 기반 응답으로 폴백
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

/** Gemini 클라이언트 (서버 사이드 전용, API 키 있을 때만 생성) */
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

/** 시스템 프롬프트 — 디지털 집사 역할 정의 */
const SYSTEM_PROMPT = `당신은 "디지털 집사"입니다. 50~70대 시니어를 위한 디지털 도우미 AI입니다.

## 핵심 역할
1. **교육**: 스마트폰, 앱, 인터넷 사용법을 쉽게 알려드립니다
2. **대행**: 쇼핑 주문, KTX 예매, 병원 예약 등을 대신 해드립니다

## 말투 규칙
- 존댓말을 사용합니다 ("~해요", "~드릴게요")
- 전문 용어는 쉬운 말로 풀어서 설명합니다
- 한 번에 너무 많은 정보를 주지 않습니다 (3단계 이내)
- 이모지를 적절히 사용해서 친근하게 대화합니다
- 어르신이 이해하기 쉽도록 비유를 활용합니다

## 보이스피싱 방어
- 계좌번호, 비밀번호, OTP, 보안카드 요구 → 즉시 경고
- 검찰/경찰/금감원 사칭 → 사기 가능성 안내
- 112(경찰), 1332(금융감독원) 신고 안내

## 대행 서비스 안내
- 대행이 필요한 요청이 오면 "이건 제가 대신 해드릴 수 있어요!"라고 안내
- 대행 가능 범위: 쇼핑 주문, 배달 주문, KTX/버스 예매, 병원 예약, 공과금 납부
- 대행 시 예상 비용을 미리 안내합니다

## 응답 형식
- 짧고 명확하게 (200자 이내 권장)
- 단계별 안내 시 번호를 붙여서 설명
- 중요한 부분은 굵게 표시하지 않고, 쉬운 말로 강조`;

/** POST /api/chat — 메시지 전송 + Gemini AI 응답 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, sessionId, history } = body as {
      content: string;
      sessionId?: string;
      history?: Array<{ role: 'user' | 'assistant'; content: string }>;
    };

    // 입력 검증
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ error: '메시지 내용을 입력해주세요' }, { status: 400 });
    }
    if (content.length > 2000) {
      return NextResponse.json({ error: '메시지는 2000자 이내로 입력해주세요' }, { status: 400 });
    }

    // Gemini API 키가 없으면 로컬 모드 안내
    if (!genAI) {
      return NextResponse.json({
        reply: '현재 AI 연결 준비 중이에요. 잠시 후 다시 시도해주세요! 😊',
        sessionId: sessionId || null,
        mode: 'local',
      });
    }

    // Gemini 모델 생성
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    // 대화 이력 구성 (Gemini 형식으로 변환)
    const chatHistory = [];
    if (history && Array.isArray(history)) {
      const recent = history.slice(-20);
      for (const msg of recent) {
        chatHistory.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        });
      }
    }

    // Gemini 채팅 세션 생성 + 응답
    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(content);
    const aiReply = result.response.text();

    return NextResponse.json({
      reply: aiReply,
      sessionId: sessionId || null,
      mode: 'gemini',
    });
  } catch (error) {
    console.error('[chat API] Gemini API 오류:', error);

    // API 오류 시에도 사용자에게 친절한 메시지
    return NextResponse.json({
      reply: '죄송해요, 잠시 문제가 생겼어요. 다시 한 번 말씀해주시겠어요? 😊',
      sessionId: null,
      mode: 'error',
    });
  }
}
