/**
 * @description 채팅 API — 세션 목록 조회 + 메시지 전송
 * GET: 세션 목록 조회 (로컬 모드: 클라이언트에서 직접 처리)
 * POST: 메시지 전송 + AI 응답 반환
 */

import { NextRequest, NextResponse } from 'next/server';

/** POST /api/chat — 메시지 전송 (서버 사이드, Supabase 모드용 예비) */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, sessionId } = body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ error: '메시지 내용을 입력해주세요' }, { status: 400 });
    }

    if (content.length > 2000) {
      return NextResponse.json({ error: '메시지는 2000자 이내로 입력해주세요' }, { status: 400 });
    }

    /** 로컬 모드에서는 클라이언트에서 직접 처리하므로 여기선 간단 응답 */
    return NextResponse.json({
      message: '로컬 모드에서는 클라이언트에서 직접 처리됩니다',
      sessionId: sessionId || null,
    });
  } catch {
    return NextResponse.json({ error: '요청 처리에 실패했습니다' }, { status: 500 });
  }
}
