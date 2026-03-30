/**
 * @description 채팅 관련 타입 정의 (세션 + 메시지)
 * DDD 엔티티: docs/entities/ChatSession.md, docs/entities/ChatMessage.md
 * DB 테이블: chat_sessions, chat_messages
 */

/** 17개 서비스 카테고리 */
export type SessionCategory =
  | 'KIOSK'          // 키오스크 주문
  | 'DELIVERY'       // 배달앱 주문
  | 'BANKING'        // 모바일뱅킹
  | 'TRANSPORT'      // 교통 예매
  | 'HOSPITAL'       // 병원 예약
  | 'GOVERNMENT'     // 정부24/민원
  | 'SHOPPING'       // 온라인 쇼핑
  | 'PHONE_SETTINGS' // 스마트폰 설정
  | 'APP_INSTALL'    // 앱 설치/삭제
  | 'WIFI'           // 와이파이/인터넷
  | 'PHOTO'          // 사진/영상 관리
  | 'SNS'            // SNS/메신저
  | 'SECURITY'       // 보이스피싱 방어
  | 'INSURANCE'      // 보험/공과금
  | 'ENTERTAINMENT'  // 영화/공연 예매
  | 'FOOD_ORDER'     // 음식 주문
  | 'OTHER';         // 기타

/** 카테고리 한글 라벨 매핑 */
export const CATEGORY_LABELS: Record<SessionCategory, string> = {
  KIOSK: '키오스크 주문',
  DELIVERY: '배달앱 주문',
  BANKING: '모바일뱅킹',
  TRANSPORT: '교통 예매',
  HOSPITAL: '병원 예약',
  GOVERNMENT: '정부24/민원',
  SHOPPING: '온라인 쇼핑',
  PHONE_SETTINGS: '스마트폰 설정',
  APP_INSTALL: '앱 설치/삭제',
  WIFI: '와이파이/인터넷',
  PHOTO: '사진/영상 관리',
  SNS: 'SNS/메신저',
  SECURITY: '보이스피싱 방어',
  INSURANCE: '보험/공과금',
  ENTERTAINMENT: '영화/공연 예매',
  FOOD_ORDER: '음식 주문',
  OTHER: '기타',
};

/** 세션 상태 */
export type SessionStatus = 'ACTIVE' | 'ESCALATED' | 'RESOLVED';

/** 메시지 발신자 역할 */
export type MessageRole = 'USER' | 'AI' | 'AGENT';

/** 해결 주체 */
export type ResolvedBy = 'AI' | 'AGENT';

/** 대화 세션 */
export interface ChatSession {
  id: string;
  userId: string;
  category: SessionCategory | null;
  status: SessionStatus;
  resolvedBy: ResolvedBy | null;
  createdAt: string;
  updatedAt: string;
}

/** 메시지 메타데이터 (AI 분석 결과) */
export interface MessageMetadata {
  category?: SessionCategory;      // AI가 분류한 카테고리
  confidence?: number;             // 분류 신뢰도 (0~1)
  phishing?: boolean;              // 보이스피싱 의심 여부
  risk?: 'low' | 'medium' | 'high'; // 위험 수준
  [key: string]: unknown;          // 확장 가능
}

/** 개별 메시지 */
export interface ChatMessage {
  id: string;
  sessionId: string;
  role: MessageRole;
  content: string;
  metadata: MessageMetadata | null;
  createdAt: string;
}

/** 메시지 전송 요청 */
export interface SendMessageRequest {
  sessionId?: string;   // 없으면 새 세션 자동 생성
  content: string;
}

/** 메시지 전송 응답 */
export interface SendMessageResponse {
  userMessage: ChatMessage;
  aiMessage: ChatMessage;
  session: ChatSession;
}
