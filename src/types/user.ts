/**
 * @description 사용자(User) 타입 정의
 * DDD 엔티티: docs/entities/User.md
 * DB 테이블: users
 */

/** 사용자 역할 — 시니어/가족(자녀)/상담원/관리자 */
export type UserRole = 'SENIOR' | 'FAMILY' | 'AGENT' | 'ADMIN';

/** 사용자 기본 정보 */
export interface User {
  id: string;
  email: string | null;
  name: string;
  phone: string | null;
  role: UserRole;
  kakaoId: string | null;       // 카카오톡 연동 ID (시니어)
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

/** 회원가입 요청 데이터 */
export interface CreateUserRequest {
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  kakaoId?: string;
}

/** 프로필 수정 요청 데이터 */
export interface UpdateUserRequest {
  name?: string;
  phone?: string;
  avatarUrl?: string;
}
