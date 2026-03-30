/**
 * @description Card 공통 컴포넌트 테스트
 * 단위 테스트: hover, highlighted props 검증
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from '../card';

describe('Card 컴포넌트 단위 테스트', () => {
  // ✅ 정상 케이스: children 렌더링
  it('children 콘텐츠가 올바르게 렌더링된다', () => {
    render(<Card>카드 내용</Card>);
    expect(screen.getByText('카드 내용')).toBeInTheDocument();
  });

  // ✅ 정상 케이스: hover 효과
  it('hover가 true이면 hover 트랜지션 클래스가 적용된다', () => {
    render(<Card hover>호버 카드</Card>);
    const card = screen.getByText('호버 카드').closest('div');
    expect(card?.className).toContain('hover:-translate-y-1');
  });

  // 🔲 경계값: hover 기본값은 false
  it('hover 기본값은 false — 호버 트랜지션이 없다', () => {
    render(<Card>기본 카드</Card>);
    const card = screen.getByText('기본 카드').closest('div');
    expect(card?.className).not.toContain('hover:-translate-y-1');
  });

  // ✅ 정상 케이스: highlighted 강조
  it('highlighted가 true이면 ring 스타일이 적용된다', () => {
    render(<Card highlighted>강조 카드</Card>);
    const card = screen.getByText('강조 카드').closest('div');
    expect(card?.className).toContain('ring-2');
    expect(card?.className).toContain('ring-primary-500');
  });

  // 🔲 경계값: highlighted 기본값은 false
  it('highlighted 기본값은 false — ring이 없다', () => {
    render(<Card>일반 카드</Card>);
    const card = screen.getByText('일반 카드').closest('div');
    expect(card?.className).not.toContain('ring-2');
  });

  // ✅ 정상 케이스: 기본 둥근 모서리
  it('기본적으로 rounded-2xl 스타일이 적용된다', () => {
    render(<Card>둥근 카드</Card>);
    const card = screen.getByText('둥근 카드').closest('div');
    expect(card?.className).toContain('rounded-2xl');
  });
});
