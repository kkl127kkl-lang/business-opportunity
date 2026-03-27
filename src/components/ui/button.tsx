/**
 * @description 공통 버튼 컴포넌트 — 시니어 친화 디자인 (최소 44px 터치 영역)
 * variant로 스타일 변경, size로 크기 조절
 */
import { ButtonHTMLAttributes, forwardRef } from 'react';

/** 버튼 스타일 변형 */
type ButtonVariant = 'primary' | 'secondary' | 'kakao' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

/** 변형별 스타일 매핑 */
const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-md',
  secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  kakao: 'bg-[#FEE500] text-[#191919] hover:bg-[#FDD835] font-semibold',
  outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
  ghost: 'text-gray-600 hover:bg-gray-100',
};

/** 크기별 스타일 매핑 */
const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center font-medium
          transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${VARIANT_STYLES[variant]}
          ${SIZE_STYLES[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
