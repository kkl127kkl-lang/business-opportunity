/**
 * @description 회원가입 페이지
 * - 가족(자녀): 카카오 소셜 로그인으로 자동 가입 (별도 가입 불필요)
 * - 이 페이지는 카카오 가입을 유도하되, 이메일 가입도 제공
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/auth-context';
import { MessageCircle, ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signInWithKakao, signUp } = useAuth();

  const [mode, setMode] = useState<'select' | 'email'>('select');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** 카카오로 가입 (가족/자녀) */
  const handleKakaoSignup = async () => {
    try {
      setError('');
      await signInWithKakao();
    } catch (err) {
      setError(err instanceof Error ? err.message : '카카오 가입에 실패했습니다');
    }
  };

  /** 이메일 회원가입 */
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('이름을 입력해주세요');
      return;
    }
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요');
      return;
    }
    if (password.length < 8) {
      setError('비밀번호는 8자 이상이어야 합니다');
      return;
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await signUp(email, password, name, 'FAMILY');
      router.push('/family');
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  /** 비밀번호 강도 체크 */
  const passwordStrength = {
    length: password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /\d/.test(password),
  };
  const isPasswordValid = passwordStrength.length && passwordStrength.hasLetter && passwordStrength.hasNumber;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md">
        {/* 로고 + 제목 */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <span className="text-3xl font-bold text-primary-500">디지털 집사</span>
          </Link>
          <p className="text-gray-600 text-lg">
            {mode === 'select'
              ? '부모님께 디지털 집사를 선물하세요'
              : '이메일로 가입하기'}
          </p>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {mode === 'select' ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-4">
            {/* 카카오 가입 (추천) */}
            <button
              onClick={handleKakaoSignup}
              className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#F5DC00] text-[#191919] font-semibold py-4 px-6 rounded-xl transition-colors text-lg"
              style={{ minHeight: '56px' }}
            >
              <MessageCircle className="w-6 h-6" />
              카카오로 3초만에 가입
            </button>

            <p className="text-center text-sm text-gray-400">
              가장 빠른 가입 방법! 카카오 계정만 있으면 됩니다
            </p>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-gray-400">또는</span>
              </div>
            </div>

            <button
              onClick={() => setMode('email')}
              className="w-full flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors"
            >
              이메일로 가입하기
            </button>
          </div>
        ) : (
          /* 이메일 가입 폼 */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <button
              onClick={() => { setMode('select'); setError(''); }}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-6 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              뒤로
            </button>

            <form onSubmit={handleEmailSignup} className="space-y-4">
              {/* 이름 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors text-base"
                  autoComplete="name"
                  required
                />
              </div>

              {/* 이메일 */}
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors text-base"
                  autoComplete="email"
                  required
                />
              </div>

              {/* 비밀번호 */}
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="8자 이상 (영문 + 숫자)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors text-base pr-12"
                    autoComplete="new-password"
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

                {/* 비밀번호 강도 표시 */}
                {password.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <PasswordCheck passed={passwordStrength.length} label="8자 이상" />
                    <PasswordCheck passed={passwordStrength.hasLetter} label="영문 포함" />
                    <PasswordCheck passed={passwordStrength.hasNumber} label="숫자 포함" />
                  </div>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700 mb-1">
                  비밀번호 확인
                </label>
                <input
                  id="password-confirm"
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="비밀번호를 다시 입력하세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors text-base"
                  autoComplete="new-password"
                  required
                />
                {passwordConfirm && password !== passwordConfirm && (
                  <p className="mt-1 text-sm text-red-500">비밀번호가 일치하지 않습니다</p>
                )}
              </div>

              {/* 가입 버튼 */}
              <button
                type="submit"
                disabled={isSubmitting || !isPasswordValid || password !== passwordConfirm}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg mt-2"
                style={{ minHeight: '56px' }}
              >
                {isSubmitting ? '가입 중...' : '가입하기'}
              </button>
            </form>
          </div>
        )}

        {/* 하단 링크 */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-500">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-primary-500 hover:text-primary-600 font-medium">
              로그인
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

/** 비밀번호 강도 체크 아이템 */
function PasswordCheck({ passed, label }: { passed: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-1.5 text-xs ${passed ? 'text-green-600' : 'text-gray-400'}`}>
      <CheckCircle className="w-3.5 h-3.5" />
      <span>{label}</span>
    </div>
  );
}
