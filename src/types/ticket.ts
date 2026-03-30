/**
 * @description 상담 티켓 타입 정의
 * DDD 엔티티: docs/entities/Ticket.md
 * DB 테이블: tickets
 */

import type { SessionCategory } from './chat';

/** 티켓 상태 */
export type TicketStatus = 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';

/** 티켓 우선순위 */
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

/** 상담 티켓 */
export interface Ticket {
  id: string;
  sessionId: string;
  assignedAgentId: string | null;
  status: TicketStatus;
  priority: TicketPriority;
  category: SessionCategory;
  resolvedAt: string | null;
  satisfaction: number | null;   // 1~5점 만족도
  createdAt: string;
}

/** 티켓 생성 요청 (에스컬레이션 시) */
export interface CreateTicketRequest {
  sessionId: string;
  category: SessionCategory;
  priority?: TicketPriority;
}

/** 티켓 상태 업데이트 */
export interface UpdateTicketRequest {
  status?: TicketStatus;
  assignedAgentId?: string;
  satisfaction?: number;
}
