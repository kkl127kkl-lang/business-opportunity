/**
 * @description Supabase 자동 생성 타입 대신 수동 정의
 * @supabase/supabase-js v2.100+ 호환 형식
 * DB 테이블 구조와 1:1 매핑 (snake_case)
 */

import type { UserRole } from './user';
import type { SessionCategory, SessionStatus, MessageRole, ResolvedBy } from './chat';
import type { TicketStatus, TicketPriority } from './ticket';
import type { SubscriptionPlan, SubscriptionStatus } from './subscription';
import type { FamilyLinkStatus } from './family';

/** Supabase DB 테이블 타입 정의 */
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string | null;
          name: string;
          phone: string | null;
          role: UserRole;
          kakao_id: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          name: string;
          phone?: string | null;
          role?: UserRole;
          kakao_id?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          name?: string;
          phone?: string | null;
          avatar_url?: string | null;
        };
        Relationships: [];
      };
      chat_sessions: {
        Row: {
          id: string;
          user_id: string;
          category: SessionCategory | null;
          status: SessionStatus;
          resolved_by: ResolvedBy | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          category?: SessionCategory | null;
          status?: SessionStatus;
        };
        Update: {
          category?: SessionCategory | null;
          status?: SessionStatus;
          resolved_by?: ResolvedBy | null;
        };
        Relationships: [];
      };
      chat_messages: {
        Row: {
          id: string;
          session_id: string;
          role: MessageRole;
          content: string;
          metadata: Record<string, unknown> | null;
          created_at: string;
        };
        Insert: {
          session_id: string;
          role: MessageRole;
          content: string;
          metadata?: Record<string, unknown> | null;
        };
        Update: {
          content?: string;
          metadata?: Record<string, unknown> | null;
        };
        Relationships: [];
      };
      tickets: {
        Row: {
          id: string;
          session_id: string;
          assigned_agent_id: string | null;
          status: TicketStatus;
          priority: TicketPriority;
          category: SessionCategory;
          resolved_at: string | null;
          satisfaction: number | null;
          created_at: string;
        };
        Insert: {
          session_id: string;
          category: SessionCategory;
          priority?: TicketPriority;
        };
        Update: {
          assigned_agent_id?: string | null;
          status?: TicketStatus;
          resolved_at?: string | null;
          satisfaction?: number | null;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          payer_id: string;
          plan: SubscriptionPlan;
          status: SubscriptionStatus;
          credit_balance: number;
          trial_ends_at: string | null;
          current_period_start: string;
          current_period_end: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          payer_id: string;
          plan?: SubscriptionPlan;
          credit_balance?: number;
          trial_ends_at?: string | null;
        };
        Update: {
          plan?: SubscriptionPlan;
          status?: SubscriptionStatus;
          credit_balance?: number;
          current_period_start?: string;
          current_period_end?: string;
        };
        Relationships: [];
      };
      family_links: {
        Row: {
          id: string;
          family_id: string;
          senior_id: string;
          status: FamilyLinkStatus;
          created_at: string;
        };
        Insert: {
          family_id: string;
          senior_id: string;
          status?: FamilyLinkStatus;
        };
        Update: {
          status?: FamilyLinkStatus;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      session_status: SessionStatus;
      session_category: SessionCategory;
      message_role: MessageRole;
      ticket_status: TicketStatus;
      ticket_priority: TicketPriority;
      subscription_plan: SubscriptionPlan;
      subscription_status: SubscriptionStatus;
      resolved_by_type: ResolvedBy;
      family_link_status: FamilyLinkStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
