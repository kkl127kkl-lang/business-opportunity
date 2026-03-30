/**
 * @description Next.js 미들웨어 — 인증 + 역할 기반 접근 제어
 * 모든 요청에서 세션을 확인하고, 비인증 사용자는 로그인으로 리다이렉트
 * 역할에 따라 접근 불가 경로는 차단
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isPublicRoute, canAccessRoute } from '@/lib/supabase/middleware';
import type { UserRole } from '@/types/user';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 파일, _next, favicon 등 무시
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/api/kakao') ||
    pathname.includes('.') // 정적 파일 (css, js, ico 등)
  ) {
    return NextResponse.next();
  }

  // 공개 경로는 인증 불필요
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // 쿠키에서 Supabase 세션 토큰 확인
  const accessToken = request.cookies.get('sb-access-token')?.value;
  const userRole = request.cookies.get('user-role')?.value as UserRole | undefined;

  // 세션 없으면 로그인 페이지로 리다이렉트
  if (!accessToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 역할 확인 — 역할 정보 없으면 로그인 페이지로
  if (!userRole) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 역할 기반 접근 제어
  if (!canAccessRoute(userRole, pathname)) {
    // 권한 없는 경로 접근 시 역할에 맞는 홈으로 리다이렉트
    const homeUrl = getHomeByRole(userRole);
    return NextResponse.redirect(new URL(homeUrl, request.url));
  }

  return NextResponse.next();
}

/** 역할별 홈 경로 */
function getHomeByRole(role: UserRole): string {
  switch (role) {
    case 'FAMILY':
      return '/family';
    case 'AGENT':
    case 'ADMIN':
      return '/admin';
    default:
      return '/';
  }
}

/** 미들웨어 적용 경로 */
export const config = {
  matcher: [
    // 인증이 필요한 모든 경로 (API + 페이지)
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
