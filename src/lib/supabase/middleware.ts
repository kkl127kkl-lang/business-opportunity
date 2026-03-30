/**
 * @description Supabase Auth 미들웨어 헬퍼
 * Next.js 미들웨어에서 세션을 확인하고 역할 기반 접근 제어 수행
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import type { UserRole } from '@/types/user';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** 요청에서 Supabase 클라이언트 생성 (쿠키 기반 세션) */
export function createMiddlewareClient(accessToken?: string) {
  const client = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  return client;
}

/** 역할별 접근 가능 경로 매핑 */
export const ROLE_ROUTES: Record<UserRole, string[]> = {
  SENIOR: ['/', '/chat'],                                       // 시니어는 카톡 + 웹 채팅
  FAMILY: ['/', '/family', '/family/*', '/chat'],               // 가족 대시보드 + 채팅
  AGENT: ['/', '/admin', '/admin/*', '/chat'],                  // 상담원 대시보드 + 채팅
  ADMIN: ['/', '/admin', '/admin/*', '/family', '/family/*', '/chat'], // 모든 접근
};

/** 공개 경로 (인증 불필요) */
export const PUBLIC_ROUTES = [
  '/',                    // 랜딩 페이지
  '/login',               // 로그인
  '/signup',              // 회원가입
  '/auth/callback',       // OAuth 콜백
  '/api/auth',            // 인증 API
  '/api/kakao/webhook',   // 카카오톡 웹훅
];

/** 경로가 공개인지 확인 */
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => {
    if (route.endsWith('*')) {
      return pathname.startsWith(route.slice(0, -1));
    }
    return pathname === route;
  });
}

/** 역할이 경로에 접근 가능한지 확인 */
export function canAccessRoute(role: UserRole, pathname: string): boolean {
  const allowedRoutes = ROLE_ROUTES[role];
  return allowedRoutes.some((route) => {
    if (route.endsWith('*')) {
      return pathname.startsWith(route.slice(0, -1));
    }
    return pathname === route;
  });
}
