/**
 * @description Button 공통 컴포넌트 테스트
 * 단위 테스트: variant, size, fullWidth, disabled 등 props 검증
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from '../button';

describe('Button 컴포넌트 단위 테스트', () => {
  // ✅ 정상 케이스: 기본 렌더링
  it('children 텍스트가 올바르게 렌더링된다', () => {
    render(<Button>테스트 버튼</Button>);
    expect(screen.getByText('테스트 버튼')).toBeInTheDocument();
  });

  // ✅ 정상 케이스: 기본 variant는 primary
  it('기본 variant는 primary 스타일이 적용된다', () => {
    render(<Button>기본 버튼</Button>);
    const button = screen.getByText('기본 버튼');
    expect(button.className).toContain('bg-primary-500');
  });

  // ✅ 정상 케이스: kakao variant
  it('kakao variant는 카카오 노란색이 적용된다', () => {
    render(<Button variant="kakao">카톡 버튼</Button>);
    const button = screen.getByText('카톡 버튼');
    expect(button.className).toContain('bg-[#FEE500]');
  });

  // ✅ 정상 케이스: outline variant
  it('outline variant는 테두리 스타일이 적용된다', () => {
    render(<Button variant="outline">외곽 버튼</Button>);
    const button = screen.getByText('외곽 버튼');
    expect(button.className).toContain('border-2');
  });

  // ✅ 정상 케이스: size별 클래스 적용
  it('lg 사이즈는 큰 패딩이 적용된다', () => {
    render(<Button size="lg">큰 버튼</Button>);
    const button = screen.getByText('큰 버튼');
    expect(button.className).toContain('px-8');
    expect(button.className).toContain('py-4');
  });

  it('sm 사이즈는 작은 패딩이 적용된다', () => {
    render(<Button size="sm">작은 버튼</Button>);
    const button = screen.getByText('작은 버튼');
    expect(button.className).toContain('px-4');
    expect(button.className).toContain('py-2');
  });

  // ✅ 정상 케이스: fullWidth
  it('fullWidth가 true이면 w-full 클래스가 적용된다', () => {
    render(<Button fullWidth>전체 너비</Button>);
    const button = screen.getByText('전체 너비');
    expect(button.className).toContain('w-full');
  });

  // 🔲 경계값: fullWidth 기본값은 false
  it('fullWidth 기본값은 false — w-full이 없다', () => {
    render(<Button>기본 너비</Button>);
    const button = screen.getByText('기본 너비');
    expect(button.className).not.toContain('w-full');
  });

  // ✅ 정상 케이스: disabled 상태
  it('disabled 상태에서 opacity 스타일이 적용된다', () => {
    render(<Button disabled>비활성</Button>);
    const button = screen.getByText('비활성');
    expect(button).toBeDisabled();
    expect(button.className).toContain('disabled:opacity-50');
  });

  // ✅ 정상 케이스: button 요소로 렌더링
  it('HTML button 요소로 렌더링된다', () => {
    render(<Button>버튼</Button>);
    const button = screen.getByText('버튼');
    expect(button.tagName).toBe('BUTTON');
  });

  // ✅ 접근성: focus ring 스타일 포함
  it('포커스 링 스타일이 포함되어 있다 (접근성)', () => {
    render(<Button>접근성</Button>);
    const button = screen.getByText('접근성');
    expect(button.className).toContain('focus:ring-2');
  });
});
