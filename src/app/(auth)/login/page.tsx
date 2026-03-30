/**
 * @description 로그인 페이지
 * - 가족(자녀): 카카오 소셜 로그인
 * - 상담원/관리자: 이메일 + 비밀번호 로그인
 * 시니어는 카카오톡 채널만 사용하므로 웹 로그인 불필요
 */

'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/auth-context';
import { MessageCircle, Mail, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/family';
  const { signInWithKakao, signInWithEmail, isLoading: authLoading } = useAuth();

  const [mode, setMode] = useState<'select' | 'email'>('select');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** 카카오 로그인 */
  const handleKakaoLogin = async () => {
    try {
      setError('');
      await signInWithKakao();
    } catch (err) {
      setError(err instanceof Error ? err.message : '카카오 로그인에 실패했습니다');
    }
  };

  /** 이메일 로그인 (상담원/관리자) */
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await signInWithEmail(email, password);
      router.push(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto" />
          <p className="mt-4 text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* 로고 + 제목 */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <span className="text-3xl font-bold text-primary-500">디지털 집사</span>
          </Link>
          <p className="text-gray-600 text-lg">
            {mode === 'select' ? '로그인 방법을 선택해주세요' : '이메일로 로그인'}
          </p>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {mode === 'select' ? (
          /* 로그인 방법 선택 */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-4">
            {/* 카카오 로그인 (가족/자녀용) */}
            <button
              onClick={handleKakaoLogin}
              className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#F5DC00] text-[#191919] font-semibold py-4 px-6 rounded-xl transition-colors text-lg"
              style={{ minHeight: '56px' }}
            >
              <MessageCircle className="w-6 h-6" />
              카카오로 시작하기
            </button>

            <p className="text-center text-sm text-gray-400">
              자녀분은 카카오 계정으로 간편하게 로그인하세요
            </p>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-gray-400">또는</span>
              </div>
            </div>

            {/* 이메일 로그인 (상담원/관리자) */}
            <button
              onClick={() => setMode('email')}
              className="w-full flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-6 rounded-xl transition-colors"
              style={{ minHeight: '56px' }}
            >
              <Mail className="w-5 h-5" />
              이메일로 로그인 (상담원/관리자)
            </button>
          </div>
        ) : (
          /* 이메일 로그인 폼 */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <button
              onClick={() => { setMode('select'); setError(''); }}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-6 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              뒤로
            </button>

            <form onSubmit={handleEmailLogin} className="space-y-4">
              {/* 이메일 입력 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@company.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors text-base"
                  autoComplete="email"
                  required
                />
              </div>

              {/* 비밀번호 입력 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors text-base pr-12"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* 로그인 버튼 */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg"
                style={{ minHeight: '56px' }}
              >
                {isSubmitting ? '로그인 중...' : '로그인'}
              </button>
            </form>
          </div>
        )}

        {/* 하단 링크 */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-500">
            아직 계정이 없으신가요?{' '}
            <Link href="/signup" className="text-primary-500 hover:text-primary-600 font-medium">
              회원가입
            </Link>
          </p>
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-500">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
