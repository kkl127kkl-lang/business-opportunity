/**
 * @description 가족 웹앱 서비스 — 부모님 활동 + 성취 + 알림 데이터
 * 로컬 모드: 모의 데이터 반환
 */

/** 부모님 프로필 */
export interface ParentProfile {
  id: string;
  name: string;
  age: number;
  relation: string;
  avatar: string;
  status: 'active' | 'inactive';
  lastActiveAt: string;
  planName: string;
}

/** 주간 활동 요약 */
export interface WeeklyActivity {
  helpRequests: number;
  selfSolved: number;
  topCategory: string;
  timeline: { date: string; day: string; requests: number; selfSolved: number }[];
}

/** 성취 뱃지 */
export interface Achievement {
  id: string;
  emoji: string;
  title: string;
  description: string;
  earnedAt: string;
  isNew: boolean;
}

/** 알림 */
export interface FamilyAlert {
  id: string;
  type: 'achievement' | 'security' | 'weekly_report' | 'activity';
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  priority: 'urgent' | 'normal';
}

/** 구독 정보 */
export interface SubscriptionInfo {
  plan: string;
  price: string;
  nextBillingDate: string;
  paymentMethod: string;
  status: 'active' | 'trial' | 'cancelled';
  trialEndsAt: string | null;
}

/** 모의 부모님 프로필 */
export function getParentProfile(): ParentProfile {
  return {
    id: 'parent-001',
    name: '김순자',
    age: 67,
    relation: '어머니',
    avatar: '👵',
    status: 'active',
    lastActiveAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    planName: '스탠다드',
  };
}

/** 모의 주간 활동 */
export function getWeeklyActivity(): WeeklyActivity {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const today = new Date();
  const timeline = days.map((day, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    return {
      date: d.toISOString().split('T')[0],
      day,
      requests: Math.floor(Math.random() * 5) + 1,
      selfSolved: Math.floor(Math.random() * 3),
    };
  });

  return {
    helpRequests: timeline.reduce((s, t) => s + t.requests, 0),
    selfSolved: timeline.reduce((s, t) => s + t.selfSolved, 0),
    topCategory: '쇼핑',
    timeline,
  };
}

/** 모의 성취 뱃지 */
export function getAchievements(): Achievement[] {
  return [
    { id: 'a1', emoji: '🏆', title: '쇼핑 마스터', description: '쿠팡 주문을 혼자서 3번 완료!', earnedAt: new Date(Date.now() - 86400000).toISOString(), isNew: true },
    { id: 'a2', emoji: '🥇', title: '7일 연속 활동', description: '일주일 동안 매일 디지털 집사를 이용', earnedAt: new Date(Date.now() - 2 * 86400000).toISOString(), isNew: true },
    { id: 'a3', emoji: '🥈', title: '혼자 해결 3회', description: 'AI 도움 없이 스스로 문제를 해결', earnedAt: new Date(Date.now() - 5 * 86400000).toISOString(), isNew: false },
    { id: 'a4', emoji: '🥉', title: '첫 요청 완료', description: '디지털 집사에 첫 번째 도움 요청', earnedAt: new Date(Date.now() - 14 * 86400000).toISOString(), isNew: false },
    { id: 'a5', emoji: '🎯', title: '금융 도전', description: '모바일뱅킹으로 첫 송금 성공', earnedAt: new Date(Date.now() - 10 * 86400000).toISOString(), isNew: false },
  ];
}

/** 모의 알림 */
export function getFamilyAlerts(): FamilyAlert[] {
  return [
    { id: 'n1', type: 'achievement', title: '성취 달성!', message: '어머니가 쿠팡 주문을 혼자서 3번 완료하셨어요! 🏆', createdAt: new Date(Date.now() - 3600000).toISOString(), isRead: false, priority: 'normal' },
    { id: 'n2', type: 'security', title: '보안 알림', message: '어머니에게 보이스피싱 의심 문자가 수신되었어요. AI가 즉시 차단했습니다.', createdAt: new Date(Date.now() - 5 * 3600000).toISOString(), isRead: false, priority: 'urgent' },
    { id: 'n3', type: 'weekly_report', title: '주간 리포트', message: '이번 주 어머니 활동: 도움 12회, 혼자 해결 5회', createdAt: new Date(Date.now() - 24 * 3600000).toISOString(), isRead: true, priority: 'normal' },
    { id: 'n4', type: 'activity', title: '활동 알림', message: '어머니가 오늘 처음으로 네이버 쇼핑을 혼자 이용하셨어요!', createdAt: new Date(Date.now() - 48 * 3600000).toISOString(), isRead: true, priority: 'normal' },
  ];
}

/** 모의 구독 정보 */
export function getSubscriptionInfo(): SubscriptionInfo {
  return {
    plan: '스탠다드',
    price: '34,900원/월',
    nextBillingDate: '2026-04-15',
    paymentMethod: '카카오페이 ****1234',
    status: 'active',
    trialEndsAt: null,
  };
}

/** 상대 시간 표시 */
export function getRelativeTime(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
  if (diff < 1) return '방금';
  if (diff < 60) return `${diff}분 전`;
  if (diff < 1440) return `${Math.floor(diff / 60)}시간 전`;
  return `${Math.floor(diff / 1440)}일 전`;
}
