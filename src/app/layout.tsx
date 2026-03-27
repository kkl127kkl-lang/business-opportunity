/**
 * @description 루트 레이아웃 — 전체 페이지 공통 설정
 */
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '디지털 집사 — 어르신 디지털 생활 도우미',
  description: 'AI+사람이 함께하는 어르신 맞춤 디지털 도우미. 키오스크, 앱 사용, 모바일 뱅킹, 보이스피싱 방지까지.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
