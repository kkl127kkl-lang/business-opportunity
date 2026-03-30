/**
 * @description 클라이언트 프로바이더 래퍼
 * 서버 컴포넌트인 layout.tsx에서 클라이언트 컨텍스트를 분리
 */

'use client';

import { AuthProvider } from '@/lib/auth/auth-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
