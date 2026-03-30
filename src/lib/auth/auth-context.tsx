/**
 * @description 인증 컨텍스트 — 로그인 상태 관리
 * Supabase Auth 세션을 React 컨텍스트로 공유
 * 모든 클라이언트 컴포넌트에서 useAuth()로 접근
 */

'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import type { User, UserRole } from '@/types/user';

/** 인증 컨텍스트 값 */
interface AuthContextValue {
  user: User | null;             // 앱 사용자 정보
  supabaseUser: SupabaseUser | null;  // Supabase Auth 사용자
  session: Session | null;       // Supabase 세션
  isLoading: boolean;            // 초기 로딩 중
  signInWithKakao: () => Promise<void>;  // 카카오 로그인
  signInWithEmail: (email: string, password: string) => Promise<void>;  // 이메일 로그인
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;  // 로그아웃
}

const AuthContext = createContext<AuthContextValue | null>(null);

/** 인증 컨텍스트 프로바이더 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /** Supabase Auth 사용자 ID로 앱 users 테이블에서 프로필 조회 */
  const fetchUserProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) {
      console.error('사용자 프로필 조회 실패:', error?.message);
      return null;
    }

    // DB snake_case → 앱 camelCase 변환
    const profile: User = {
      id: data.id,
      email: data.email,
      name: data.name,
      phone: data.phone,
      role: data.role,
      kakaoId: data.kakao_id,
      avatarUrl: data.avatar_url,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    // 역할 정보를 쿠키에 저장 (미들웨어에서 사용)
    document.cookie = `user-role=${profile.role}; path=/; max-age=604800; SameSite=Lax`;

    return profile;
  }, []);

  /** 초기 세션 확인 + Auth 상태 변화 구독 */
  useEffect(() => {
    // 현재 세션 확인
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setSupabaseUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        // 세션 토큰을 쿠키에 저장 (미들웨어에서 사용)
        document.cookie = `sb-access-token=${currentSession.access_token}; path=/; max-age=604800; SameSite=Lax`;
        const profile = await fetchUserProfile(currentSession.user.id);
        setUser(profile);
      }

      setIsLoading(false);
    });

    // Auth 상태 변화 구독
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setSupabaseUser(newSession?.user ?? null);

        if (newSession?.user) {
          document.cookie = `sb-access-token=${newSession.access_token}; path=/; max-age=604800; SameSite=Lax`;
          const profile = await fetchUserProfile(newSession.user.id);
          setUser(profile);
        } else {
          setUser(null);
          // 쿠키 삭제
          document.cookie = 'sb-access-token=; path=/; max-age=0';
          document.cookie = 'user-role=; path=/; max-age=0';
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchUserProfile]);

  /** 카카오 소셜 로그인 */
  const signInWithKakao = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw new Error(`카카오 로그인 실패: ${error.message}`);
  };

  /** 이메일 로그인 (상담원/관리자용) */
  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(`로그인 실패: ${error.message}`);
  };

  /** 회원가입 (가족용 — 카카오로 가입 후 프로필 생성) */
  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(`회원가입 실패: ${error.message}`);

    // Auth 사용자 생성 후 → users 테이블에 프로필 추가
    if (data.user) {
      const { error: profileError } = await supabase.from('users').insert({
        id: data.user.id,
        email,
        name,
        role,
      });
      if (profileError) throw new Error(`프로필 생성 실패: ${profileError.message}`);
    }
  };

  /** 로그아웃 */
  const signOut = async () => {
    await supabase.auth.signOut();
    document.cookie = 'sb-access-token=; path=/; max-age=0';
    document.cookie = 'user-role=; path=/; max-age=0';
    setUser(null);
    setSession(null);
    setSupabaseUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        session,
        isLoading,
        signInWithKakao,
        signInWithEmail,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/** 인증 컨텍스트 훅 — 컴포넌트에서 사용 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth()는 <AuthProvider> 안에서만 사용할 수 있습니다');
  }
  return context;
}
