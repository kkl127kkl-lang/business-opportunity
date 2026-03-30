/**
 * @description 인증 미들웨어 헬퍼 테스트
 * isPublicRoute, canAccessRoute 함수 테스트
 */

import { describe, it, expect } from 'vitest';
import { isPublicRoute, canAccessRoute } from '../middleware';

describe('isPublicRoute', () => {
  it('랜딩 페이지(/)는 공개 경로', () => {
    expect(isPublicRoute('/')).toBe(true);
  });

  it('로그인(/login)은 공개 경로', () => {
    expect(isPublicRoute('/login')).toBe(true);
  });

  it('회원가입(/signup)은 공개 경로', () => {
    expect(isPublicRoute('/signup')).toBe(true);
  });

  it('OAuth 콜백(/auth/callback)은 공개 경로', () => {
    expect(isPublicRoute('/auth/callback')).toBe(true);
  });

  it('카카오 웹훅은 공개 경로', () => {
    expect(isPublicRoute('/api/kakao/webhook')).toBe(true);
  });

  it('가족 대시보드(/family)는 비공개 경로', () => {
    expect(isPublicRoute('/family')).toBe(false);
  });

  it('관리자 대시보드(/admin)는 비공개 경로', () => {
    expect(isPublicRoute('/admin')).toBe(false);
  });

  it('프로필(/profile)은 비공개 경로', () => {
    expect(isPublicRoute('/profile')).toBe(false);
  });
});

describe('canAccessRoute', () => {
  // FAMILY 역할 테스트
  it('FAMILY는 /family에 접근 가능', () => {
    expect(canAccessRoute('FAMILY', '/family')).toBe(true);
  });

  it('FAMILY는 /family/dashboard에 접근 가능', () => {
    expect(canAccessRoute('FAMILY', '/family/dashboard')).toBe(true);
  });

  it('FAMILY는 / (랜딩)에 접근 가능', () => {
    expect(canAccessRoute('FAMILY', '/')).toBe(true);
  });

  it('FAMILY는 /admin에 접근 불가', () => {
    expect(canAccessRoute('FAMILY', '/admin')).toBe(false);
  });

  // AGENT 역할 테스트
  it('AGENT는 /admin에 접근 가능', () => {
    expect(canAccessRoute('AGENT', '/admin')).toBe(true);
  });

  it('AGENT는 /admin/tickets에 접근 가능', () => {
    expect(canAccessRoute('AGENT', '/admin/tickets')).toBe(true);
  });

  it('AGENT는 /family에 접근 불가', () => {
    expect(canAccessRoute('AGENT', '/family')).toBe(false);
  });

  // ADMIN 역할 테스트
  it('ADMIN은 /admin에 접근 가능', () => {
    expect(canAccessRoute('ADMIN', '/admin')).toBe(true);
  });

  it('ADMIN은 /family에도 접근 가능', () => {
    expect(canAccessRoute('ADMIN', '/family')).toBe(true);
  });

  // SENIOR 역할 테스트
  it('SENIOR는 / (랜딩)에만 접근 가능', () => {
    expect(canAccessRoute('SENIOR', '/')).toBe(true);
  });

  it('SENIOR는 /family에 접근 불가', () => {
    expect(canAccessRoute('SENIOR', '/family')).toBe(false);
  });

  it('SENIOR는 /admin에 접근 불가', () => {
    expect(canAccessRoute('SENIOR', '/admin')).toBe(false);
  });
});
