/**
 * @description 상담원 대시보드 서비스 — 모의 데이터 + 에스컬레이션 관리
 * 로컬 모드: localStorage 기반, 실제 서비스에서는 Supabase 연동
 */

/** 에스컬레이션 우선순위 */
export type Priority = 'urgent' | 'normal' | 'low';

/** 에스컬레이션 상태 */
export type EscalationStatus = 'waiting' | 'in_progress' | 'completed';

/** 에스컬레이션 요청 */
export interface EscalationRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerAge: number;
  priority: Priority;
  category: string;
  summary: string;
  aiConfidence: number;
  status: EscalationStatus;
  assignedTo: string | null;
  createdAt: string;
  completedAt: string | null;
  messages: EscalationMessage[];
}

/** 에스컬레이션 메시지 */
export interface EscalationMessage {
  id: string;
  role: 'customer' | 'ai' | 'agent';
  content: string;
  timestamp: string;
}

/** 상담원 통계 */
export interface AgentStats {
  todayTotal: number;
  todayCompleted: number;
  todayWaiting: number;
  avgResponseTime: string;
  aiHandleRate: number;
  satisfactionRate: number;
  hourlyRequests: { hour: string; count: number }[];
  topCategories: { category: string; count: number }[];
  weeklyTrend: { day: string; ai: number; agent: number }[];
}

/** 모의 에스컬레이션 데이터 */
const MOCK_ESCALATIONS: EscalationRequest[] = [
  {
    id: 'esc-001',
    customerId: 'cust-001',
    customerName: '김순자',
    customerAge: 67,
    priority: 'urgent',
    category: '보안',
    summary: '보이스피싱 의심 — 검찰 사칭 전화 수신',
    aiConfidence: 0.95,
    status: 'waiting',
    assignedTo: null,
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
    completedAt: null,
    messages: [
      { id: 'm1', role: 'customer', content: '검찰에서 전화가 왔는데 계좌번호를 알려달래요', timestamp: new Date(Date.now() - 6 * 60000).toISOString() },
      { id: 'm2', role: 'ai', content: '🚨 보이스피싱이 의심됩니다! 절대 개인정보를 알려주지 마세요. 상담원에게 연결해 드릴게요.', timestamp: new Date(Date.now() - 5 * 60000).toISOString() },
    ],
  },
  {
    id: 'esc-002',
    customerId: 'cust-002',
    customerName: '박영호',
    customerAge: 72,
    priority: 'normal',
    category: '쇼핑',
    summary: '쿠팡 반품 요청 — AI가 처리 방법을 모름',
    aiConfidence: 0.45,
    status: 'waiting',
    assignedTo: null,
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    completedAt: null,
    messages: [
      { id: 'm1', role: 'customer', content: '쿠팡에서 산 신발이 사이즈가 안 맞아. 반품하고 싶어', timestamp: new Date(Date.now() - 20 * 60000).toISOString() },
      { id: 'm2', role: 'ai', content: '반품을 도와드리겠습니다. 주문번호를 알려주시겠어요?', timestamp: new Date(Date.now() - 19 * 60000).toISOString() },
      { id: 'm3', role: 'customer', content: '주문번호가 뭐야? 어디서 봐?', timestamp: new Date(Date.now() - 18 * 60000).toISOString() },
      { id: 'm4', role: 'ai', content: '죄송합니다. 더 자세히 안내해 드리기 위해 상담원을 연결해 드릴게요.', timestamp: new Date(Date.now() - 15 * 60000).toISOString() },
    ],
  },
  {
    id: 'esc-003',
    customerId: 'cust-003',
    customerName: '이미경',
    customerAge: 58,
    priority: 'normal',
    category: '금융',
    summary: '모바일뱅킹 비밀번호 재설정 도움 요청',
    aiConfidence: 0.6,
    status: 'waiting',
    assignedTo: null,
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
    completedAt: null,
    messages: [
      { id: 'm1', role: 'customer', content: '은행 앱 비밀번호를 까먹었어요. 어떻게 해야 해?', timestamp: new Date(Date.now() - 35 * 60000).toISOString() },
      { id: 'm2', role: 'ai', content: '은행 앱에서 "비밀번호 찾기"를 눌러보세요. 어느 은행 앱인가요?', timestamp: new Date(Date.now() - 34 * 60000).toISOString() },
      { id: 'm3', role: 'customer', content: '국민은행인데 비밀번호 찾기가 어디 있는지 모르겠어', timestamp: new Date(Date.now() - 30 * 60000).toISOString() },
    ],
  },
  {
    id: 'esc-004',
    customerId: 'cust-004',
    customerName: '정한수',
    customerAge: 75,
    priority: 'low',
    category: '교통',
    summary: 'KTX 예매 좌석 변경 문의',
    aiConfidence: 0.72,
    status: 'in_progress',
    assignedTo: 'agent@test.com',
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
    completedAt: null,
    messages: [
      { id: 'm1', role: 'customer', content: 'KTX 좌석을 창가로 바꾸고 싶어요', timestamp: new Date(Date.now() - 50 * 60000).toISOString() },
      { id: 'm2', role: 'ai', content: '좌석 변경을 도와드리겠습니다. 예매번호를 알려주세요.', timestamp: new Date(Date.now() - 49 * 60000).toISOString() },
      { id: 'm3', role: 'customer', content: '예매번호 1234567이에요', timestamp: new Date(Date.now() - 45 * 60000).toISOString() },
      { id: 'm4', role: 'agent', content: '안녕하세요, 상담원 김민지입니다. 창가 좌석으로 변경해 드리겠습니다. 잠시만 기다려주세요.', timestamp: new Date(Date.now() - 40 * 60000).toISOString() },
    ],
  },
  {
    id: 'esc-005',
    customerId: 'cust-005',
    customerName: '최윤정',
    customerAge: 63,
    priority: 'normal',
    category: '앱 설정',
    summary: '카카오톡 글자 크기 변경 도움',
    aiConfidence: 0.82,
    status: 'completed',
    assignedTo: 'agent@test.com',
    createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
    completedAt: new Date(Date.now() - 90 * 60000).toISOString(),
    messages: [
      { id: 'm1', role: 'customer', content: '카톡 글씨가 너무 작아서 안 보여요', timestamp: new Date(Date.now() - 125 * 60000).toISOString() },
      { id: 'm2', role: 'ai', content: '카카오톡 글자 크기를 키워드릴게요! 설정에서 변경할 수 있어요.', timestamp: new Date(Date.now() - 124 * 60000).toISOString() },
      { id: 'm3', role: 'agent', content: '화면 공유로 같이 하시죠. 설정 > 화면 > 글씨 크기에서 "매우 크게"로 바꿔드릴게요.', timestamp: new Date(Date.now() - 120 * 60000).toISOString() },
      { id: 'm4', role: 'customer', content: '와 잘 보여요! 감사합니다!', timestamp: new Date(Date.now() - 100 * 60000).toISOString() },
    ],
  },
];

const STORAGE_KEY = 'digital-butler-escalations';

/** localStorage에서 에스컬레이션 목록 로드 */
function loadEscalations(): EscalationRequest[] {
  if (typeof window === 'undefined') return MOCK_ESCALATIONS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_ESCALATIONS));
    return MOCK_ESCALATIONS;
  }
  return JSON.parse(stored);
}

/** localStorage에 에스컬레이션 목록 저장 */
function saveEscalations(escalations: EscalationRequest[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(escalations));
}

/** 모든 에스컬레이션 조회 */
export function getEscalations(status?: EscalationStatus): EscalationRequest[] {
  const all = loadEscalations();
  if (!status) return all;
  return all.filter((e) => e.status === status);
}

/** 특정 에스컬레이션 조회 */
export function getEscalation(id: string): EscalationRequest | null {
  return loadEscalations().find((e) => e.id === id) ?? null;
}

/** 에스컬레이션 접수 (대기 → 진행 중) */
export function acceptEscalation(id: string, agentEmail: string): EscalationRequest | null {
  const all = loadEscalations();
  const idx = all.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  all[idx].status = 'in_progress';
  all[idx].assignedTo = agentEmail;
  saveEscalations(all);
  return all[idx];
}

/** 에스컬레이션 완료 처리 */
export function completeEscalation(id: string): EscalationRequest | null {
  const all = loadEscalations();
  const idx = all.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  all[idx].status = 'completed';
  all[idx].completedAt = new Date().toISOString();
  saveEscalations(all);
  return all[idx];
}

/** 상담원 메시지 추가 */
export function addAgentMessage(escalationId: string, content: string): EscalationMessage | null {
  const all = loadEscalations();
  const idx = all.findIndex((e) => e.id === escalationId);
  if (idx === -1) return null;
  const msg: EscalationMessage = {
    id: `msg-${Date.now()}`,
    role: 'agent',
    content,
    timestamp: new Date().toISOString(),
  };
  all[idx].messages.push(msg);
  saveEscalations(all);
  return msg;
}

/** 상담원 통계 (모의 데이터) */
export function getAgentStats(): AgentStats {
  const all = loadEscalations();
  return {
    todayTotal: all.length + 23,
    todayCompleted: all.filter((e) => e.status === 'completed').length + 20,
    todayWaiting: all.filter((e) => e.status === 'waiting').length,
    avgResponseTime: '2분 34초',
    aiHandleRate: 78,
    satisfactionRate: 4.8,
    hourlyRequests: [
      { hour: '09시', count: 5 }, { hour: '10시', count: 8 }, { hour: '11시', count: 12 },
      { hour: '12시', count: 6 }, { hour: '13시', count: 4 }, { hour: '14시', count: 9 },
      { hour: '15시', count: 11 }, { hour: '16시', count: 7 }, { hour: '17시', count: 3 },
    ],
    topCategories: [
      { category: '쇼핑', count: 35 }, { category: '금융', count: 28 },
      { category: '교통', count: 22 }, { category: '보안', count: 18 },
      { category: '앱 설정', count: 15 },
    ],
    weeklyTrend: [
      { day: '월', ai: 45, agent: 12 }, { day: '화', ai: 52, agent: 15 },
      { day: '수', ai: 48, agent: 10 }, { day: '목', ai: 61, agent: 18 },
      { day: '금', ai: 55, agent: 14 }, { day: '토', ai: 30, agent: 5 },
      { day: '일', ai: 22, agent: 3 },
    ],
  };
}

/** 시간 차이 계산 (분 단위) */
export function getWaitTime(createdAt: string): string {
  const diff = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000);
  if (diff < 1) return '방금';
  if (diff < 60) return `${diff}분`;
  return `${Math.floor(diff / 60)}시간 ${diff % 60}분`;
}

/** 우선순위 라벨 */
export function getPriorityLabel(priority: Priority): { text: string; color: string; bg: string } {
  switch (priority) {
    case 'urgent': return { text: '긴급', color: 'text-red-600', bg: 'bg-red-50' };
    case 'normal': return { text: '보통', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    case 'low': return { text: '낮음', color: 'text-green-600', bg: 'bg-green-50' };
  }
}
