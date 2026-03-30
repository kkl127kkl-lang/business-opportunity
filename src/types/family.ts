/**
 * @description 가족 연결 타입 정의
 * 자녀 ↔ 부모 연결 관리
 * DB 테이블: family_links
 */

/** 가족 연결 상태 */
export type FamilyLinkStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

/** 가족 연결 정보 */
export interface FamilyLink {
  id: string;
  familyId: string;          // 자녀 User ID
  seniorId: string;          // 부모 User ID
  status: FamilyLinkStatus;
  createdAt: string;
}

/** 가족 연결 요청 */
export interface CreateFamilyLinkRequest {
  seniorId: string;          // 연결할 부모님 ID
}

/** 부모님 활동 요약 (건수만 — 내용 비공개) */
export interface SeniorActivitySummary {
  seniorId: string;
  seniorName: string;
  totalRequests: number;     // 총 요청 건수
  resolvedCount: number;     // 해결된 건수
  lastActiveAt: string | null;
}
