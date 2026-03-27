/**
 * @description 공통 카드 컴포넌트 — 콘텐츠를 감싸는 박스
 * 랜딩 페이지, 요금제, 서비스 소개 등에서 공통 사용
 */
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 호버 시 살짝 올라가는 효과 */
  hover?: boolean;
  /** 테두리 강조 (요금제 인기 항목 등) */
  highlighted?: boolean;
}

/** 카드 컴포넌트 */
export default function Card({
  hover = false,
  highlighted = false,
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-2xl p-6
        ${hover ? 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg' : 'shadow-sm'}
        ${highlighted ? 'ring-2 ring-primary-500 shadow-lg' : 'border border-gray-100'}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
