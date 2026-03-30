/**
 * @description 공통 섹션 래퍼 — 랜딩 페이지 각 섹션의 패딩/최대 너비를 통일
 */
import { HTMLAttributes } from 'react';

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  /** 배경색 변경 (기본: 흰색, gray: 회색 배경) */
  bg?: 'white' | 'gray' | 'cream';
}

const BG_STYLES = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  cream: 'bg-primary-50',
};

/** 섹션 공통 래퍼 — 양쪽 여백 + 최대 너비 + 반응형 패딩 */
export default function SectionWrapper({
  bg = 'white',
  className = '',
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <section
      className={`py-16 md:py-24 px-4 md:px-8 ${BG_STYLES[bg]} ${className}`}
      {...props}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}
