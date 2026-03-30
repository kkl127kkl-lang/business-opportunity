/**
 * @description OAuth 콜백 처리 (카카오 로그인 후 리다이렉트)
 * Supabase Auth가 카카오 OAuth 완료 후 이 경로로 리다이렉트
 * code를 세션으로 교환하고, users 테이블에 프로필 upsert
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const redirectTo = searchParams.get('redirect') || '/family';

  if (!code) {
    // code가 없으면 로그인 페이지로
    return NextResponse.redirect(new URL('/login?error=no_code', origin));
  }

  // Supabase 클라이언트 생성 (service role로 upsert)
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  // code → 세션 교환
  const supabaseAuth = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: sessionData, error: sessionError } = await supabaseAuth.auth.exchangeCodeForSession(code);

  if (sessionError || !sessionData.user) {
    console.error('세션 교환 실패:', sessionError?.message);
    return NextResponse.redirect(new URL('/login?error=session_failed', origin));
  }

  const authUser = sessionData.user;

  // users 테이블에 프로필 upsert (카카오 로그인 시 자동 생성)
  const kakaoMeta = authUser.user_metadata;
  const { error: upsertError } = await supabase.from('users').upsert(
    {
      id: authUser.id,
      email: authUser.email || null,
      name: kakaoMeta?.full_name || kakaoMeta?.name || '사용자',
      kakao_id: kakaoMeta?.provider_id || null,
      avatar_url: kakaoMeta?.avatar_url || null,
      role: 'FAMILY',  // 카카오 로그인 = 가족(자녀) 역할
    },
    { onConflict: 'id' }
  );

  if (upsertError) {
    console.error('프로필 upsert 실패:', upsertError.message);
  }

  // 세션 토큰을 쿠키에 설정하고 리다이렉트
  const response = NextResponse.redirect(new URL(redirectTo, origin));

  response.cookies.set('sb-access-token', sessionData.session.access_token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7일
    sameSite: 'lax',
    httpOnly: false, // 클라이언트에서도 접근 필요
  });

  response.cookies.set('user-role', 'FAMILY', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  });

  return response;
}
