/**
 * @description 인증 컨텍스트 — 로그인 상태 관리
 *
 * Supabase 환경변수가 없으면 "로컬 모드"로 동작:
 * - localStorage에 사용자 정보 저장
 * - 이메일+비밀번호 입력하면 바로 로그인
 * - 카카오 버튼은 "가족" 역할로 즉시 로그인
 *
 * Supabase 연결 시 자동으로 "실제 모드"로 전환
 */

'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User, UserRole } from '@/types/user';

/** Supabase 환경변수 존재 여부 확인 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const IS_LOCAL_MODE = !SUPABASE_URL || SUPABASE_URL === '';

/** localStorage 키 */
const STORAGE_KEY = 'digital-butler-user';

/** 인증 컨텍스트 값 */
interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isLocalMode: boolean;          // Supabase 없이 로컬 모드 동작 중
  signInWithKakao: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/** 로컬 모드용 — 테스트 계정 목록 */
const LOCAL_ACCOUNTS: Record<string, { name: string; role: UserRole }> = {
  'admin@test.com': { name: '관리자', role: 'ADMIN' },
  'agent@test.com': { name: '상담원 김철수', role: 'AGENT' },
  'family@test.com': { name: '홍길동 (자녀)', role: 'FAMILY' },
};

/** 임시 User 객체 생성 (로컬 모드용) */
function createLocalUser(email: string, name: string, role: UserRole): User {
  const now = new Date().toISOString();
  return {
    id: `local-${Date.now()}`,
    email,
    name,
    phone: null,
    role,
    kakaoId: null,
    avatarUrl: null,
    createdAt: now,
    updatedAt: now,
  };
}

/** 인증 컨텍스트 프로바이더 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /** 초기 로딩 — localStorage에서 기존 세션 복원 */
  useEffect(() => {
    if (IS_LOCAL_MODE) {
      // 로컬 모드: localStorage에서 복원
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch {
        // 파싱 실패 시 무시
      }
      setIsLoading(false);
    } else {
      // Supabase 모드: 나중에 구현 (지금은 바로 로딩 완료)
      setIsLoading(false);
    }
  }, []);

  /** 로그인 상태를 저장하는 헬퍼 */
  const saveUser = useCallback((newUser: User) => {
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    // 미들웨어용 쿠키 설정
    document.cookie = `sb-access-token=local-token; path=/; max-age=604800; SameSite=Lax`;
    document.cookie = `user-role=${newUser.role}; path=/; max-age=604800; SameSite=Lax`;
  }, []);

  /** 카카오 로그인 — 로컬 모드에서는 "가족" 역할로 바로 로그인 */
  const signInWithKakao = useCallback(async () => {
    if (IS_LOCAL_MODE) {
      const localUser = createLocalUser('kakao@test.com', '카카오 사용자', 'FAMILY');
      saveUser(localUser);
      return;
    }
    // Supabase 모드는 나중에
    throw new Error('Supabase가 설정되지 않았습니다');
  }, [saveUser]);

  /** 이메일 로그인 — 로컬 모드에서는 아무 이메일이나 입력하면 로그인 */
  const signInWithEmail = useCallback(async (email: string, _password: string) => {
    if (IS_LOCAL_MODE) {
      // 미리 등록된 테스트 계정이면 해당 역할로, 아니면 FAMILY로 로그인
      const account = LOCAL_ACCOUNTS[email];
      const localUser = createLocalUser(
        email,
        account?.name || email.split('@')[0],
        account?.role || 'FAMILY'
      );
      saveUser(localUser);
      return;
    }
    throw new Error('Supabase가 설정되지 않았습니다');
  }, [saveUser]);

  /** 회원가입 — 로컬 모드에서는 바로 가입+로그인 */
  const signUp = useCallback(async (email: string, _password: string, name: string, role: UserRole) => {
    if (IS_LOCAL_MODE) {
      const localUser = createLocalUser(email, name, role);
      saveUser(localUser);
      return;
    }
    throw new Error('Supabase가 설정되지 않았습니다');
  }, [saveUser]);

  /** 로그아웃 */
  const signOut = useCallback(async () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = 'sb-access-token=; path=/; max-age=0';
    document.cookie = 'user-role=; path=/; max-age=0';
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLocalMode: IS_LOCAL_MODE,
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
