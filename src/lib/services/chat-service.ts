/**
 * @description 채팅 서비스 — 세션/메시지 관리 + AI 응답 생성
 *
 * Supabase 환경변수가 없으면 "로컬 모드"로 동작:
 * - localStorage에 세션/메시지 저장 (클라이언트 전용)
 * - AI 응답은 규칙 기반 로컬 응답 사용
 *
 * Supabase 연결 시 자동으로 DB 모드 전환
 */

import type {
  ChatSession,
  ChatMessage,
  SendMessageRequest,
  SendMessageResponse,
  SessionCategory,
  MessageMetadata,
} from '@/types/chat';

/** Supabase 환경변수 확인 */
const IS_LOCAL_MODE = !process.env.NEXT_PUBLIC_SUPABASE_URL;

/** localStorage 키 */
const SESSIONS_KEY = 'digital-butler-sessions';
const MESSAGES_KEY = 'digital-butler-messages';

/** UUID 생성 헬퍼 */
function generateId(): string {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** 로컬 저장소에서 세션 목록 가져오기 */
export function getLocalSessions(): ChatSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** 로컬 저장소에서 메시지 목록 가져오기 */
export function getLocalMessages(sessionId: string): ChatMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(MESSAGES_KEY);
    const all: ChatMessage[] = raw ? JSON.parse(raw) : [];
    return all.filter((m) => m.sessionId === sessionId);
  } catch {
    return [];
  }
}

/** 로컬 저장소에 세션 저장 */
function saveLocalSession(session: ChatSession): void {
  const sessions = getLocalSessions();
  const idx = sessions.findIndex((s) => s.id === session.id);
  if (idx >= 0) {
    sessions[idx] = session;
  } else {
    sessions.unshift(session);
  }
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

/** 로컬 저장소에 메시지 저장 */
function saveLocalMessage(message: ChatMessage): void {
  try {
    const raw = localStorage.getItem(MESSAGES_KEY);
    const all: ChatMessage[] = raw ? JSON.parse(raw) : [];
    all.push(message);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(all));
  } catch {
    // 저장 실패 시 무시
  }
}

/** 카테고리 자동 분류 — 키워드 기반 */
export function classifyCategory(content: string): { category: SessionCategory; confidence: number } {
  const lower = content.toLowerCase();

  /** 키워드 → 카테고리 매핑 */
  const rules: Array<{ keywords: string[]; category: SessionCategory; weight: number }> = [
    { keywords: ['키오스크', '무인', '주문기', '터치'], category: 'KIOSK', weight: 0.9 },
    { keywords: ['배달', '배민', '요기요', '쿠팡이츠'], category: 'DELIVERY', weight: 0.9 },
    { keywords: ['은행', '뱅킹', '계좌', '송금', '이체'], category: 'BANKING', weight: 0.85 },
    { keywords: ['ktx', '기차', '버스', '항공', '비행기', '예매'], category: 'TRANSPORT', weight: 0.85 },
    { keywords: ['병원', '진료', '예약', '의사', '약국'], category: 'HOSPITAL', weight: 0.85 },
    { keywords: ['정부', '민원', '주민센터', '서류', '등본'], category: 'GOVERNMENT', weight: 0.8 },
    { keywords: ['쇼핑', '쿠팡', '주문', '반품', '환불', '택배'], category: 'SHOPPING', weight: 0.8 },
    { keywords: ['설정', '화면', '소리', '글자', '밝기'], category: 'PHONE_SETTINGS', weight: 0.75 },
    { keywords: ['앱', '설치', '다운', '업데이트', '삭제'], category: 'APP_INSTALL', weight: 0.8 },
    { keywords: ['와이파이', 'wifi', '인터넷', '데이터'], category: 'WIFI', weight: 0.85 },
    { keywords: ['사진', '카메라', '영상', '동영상', '갤러리'], category: 'PHOTO', weight: 0.8 },
    { keywords: ['카톡', '카카오', '문자', '메시지', '밴드'], category: 'SNS', weight: 0.75 },
    { keywords: ['피싱', '사기', '보이스피싱', '해킹', '스팸'], category: 'SECURITY', weight: 0.95 },
    { keywords: ['보험', '공과금', '전기', '가스', '수도'], category: 'INSURANCE', weight: 0.8 },
    { keywords: ['영화', '공연', '넷플릭스', '유튜브', 'ott'], category: 'ENTERTAINMENT', weight: 0.75 },
    { keywords: ['음식', '맛집', '식당', '메뉴'], category: 'FOOD_ORDER', weight: 0.75 },
  ];

  for (const rule of rules) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return { category: rule.category, confidence: rule.weight };
    }
  }

  return { category: 'OTHER', confidence: 0.5 };
}

/** 보이스피싱 감지 — 위험 키워드 기반 */
export function detectPhishing(content: string): { phishing: boolean; risk: 'low' | 'medium' | 'high' } {
  const lower = content.toLowerCase();

  /** 고위험 키워드 */
  const highRisk = ['계좌번호 알려', '비밀번호 알려', '보안카드', 'otp 번호', '원격제어', '팀뷰어', 'anydesk'];
  /** 중위험 키워드 */
  const mediumRisk = ['검찰', '경찰', '금감원', '수사관', '체포영장', '구속', '벌금', '대출', '저금리', '정부지원금'];
  /** 저위험 키워드 */
  const lowRisk = ['링크', '클릭', '확인해', '축하', '당첨', '무료'];

  if (highRisk.some((kw) => lower.includes(kw))) {
    return { phishing: true, risk: 'high' };
  }
  if (mediumRisk.some((kw) => lower.includes(kw))) {
    return { phishing: true, risk: 'medium' };
  }
  if (lowRisk.some((kw) => lower.includes(kw))) {
    return { phishing: false, risk: 'low' };
  }

  return { phishing: false, risk: 'low' };
}

/** AI 응답 생성 메타데이터 조합 */
function buildMetadata(content: string): MessageMetadata {
  const { category, confidence } = classifyCategory(content);
  const { phishing, risk } = detectPhishing(content);
  return { category, confidence, phishing, risk };
}

/** 로컬 모드 AI 응답 생성 — 카테고리별 맞춤 응답 */
function generateLocalAIResponse(content: string, metadata: MessageMetadata): string {
  /** 보이스피싱 경고 우선 */
  if (metadata.phishing && metadata.risk === 'high') {
    return '🚨 잠깐만요! 지금 받으신 연락이 보이스피싱(전화 사기)일 가능성이 매우 높아요.\n\n' +
      '절대 계좌번호, 비밀번호, 보안카드 번호를 알려주시면 안 됩니다!\n\n' +
      '📞 지금 바로 경찰청(112) 또는 금융감독원(1332)에 신고해주세요.\n' +
      '가족분께도 즉시 알려드렸어요.';
  }
  if (metadata.phishing && metadata.risk === 'medium') {
    return '⚠️ 주의가 필요해요! 혹시 검찰, 경찰, 금감원이라며 연락이 왔나요?\n\n' +
      '정부기관은 전화로 개인정보를 요구하지 않습니다.\n' +
      '의심되시면 해당 기관 대표번호로 직접 확인해보세요.\n\n' +
      '도움이 더 필요하시면 말씀해주세요!';
  }

  /** 카테고리별 응답 */
  const responses: Record<string, string> = {
    KIOSK: '키오스크 주문을 도와드릴게요! 😊\n\n어떤 매장의 키오스크인가요? ' +
      '(맥도날드, 버거킹, 커피숍 등)\n화면에 보이는 내용을 말씀해주시면 하나하나 안내해드릴게요.',
    DELIVERY: '배달 주문을 도와드릴게요! 🛵\n\n어떤 앱을 사용하고 계신가요? ' +
      '(배달의민족, 요기요, 쿠팡이츠)\n주문하고 싶은 음식이 있으시면 알려주세요!',
    BANKING: '모바일뱅킹을 도와드릴게요! 🏦\n\n어떤 은행 앱을 사용하시나요? ' +
      '(국민, 신한, 하나, 우리 등)\n이체, 잔액확인, 공과금 납부 중 어떤 것을 하고 싶으신가요?',
    TRANSPORT: '교통 예매를 도와드릴게요! 🚄\n\n' +
      'KTX, 시외버스, 항공편 중 어떤 걸 예매하실 건가요?\n출발지와 도착지, 날짜를 알려주시면 바로 안내해드릴게요.',
    HOSPITAL: '병원 예약을 도와드릴게요! 🏥\n\n' +
      '어떤 병원(진료과)에 예약하고 싶으신가요?\n원하시는 날짜가 있으시면 알려주세요.',
    GOVERNMENT: '정부/민원 서비스를 도와드릴게요! 🏛️\n\n' +
      '주민등록등본, 건강보험, 연금 등 어떤 서류나 서비스가 필요하신가요?',
    SHOPPING: '온라인 쇼핑을 도와드릴게요! 🛒\n\n' +
      '어떤 쇼핑몰을 이용하시나요? (쿠팡, 네이버, 11번가 등)\n주문, 반품, 환불 중 어떤 도움이 필요하신가요?',
    PHONE_SETTINGS: '스마트폰 설정을 도와드릴게요! 📱\n\n' +
      '글자 크기, 화면 밝기, 소리 크기 중 어떤 걸 변경하고 싶으신가요?\n사용하시는 폰이 삼성인지 아이폰인지 알려주세요.',
    APP_INSTALL: '앱 설치를 도와드릴게요! 📲\n\n' +
      '어떤 앱을 설치(또는 삭제)하고 싶으신가요?\n앱 이름을 말씀해주시면 단계별로 안내해드릴게요.',
    WIFI: '인터넷/와이파이 연결을 도와드릴게요! 📶\n\n' +
      '집 와이파이에 연결하는 건가요, 아니면 외부(카페, 공공장소)인가요?\n어떤 기기를 연결하시나요?',
    PHOTO: '사진/영상 관리를 도와드릴게요! 📸\n\n' +
      '사진 보내기, 저장, 정리 중 어떤 도움이 필요하신가요?\n카톡으로 사진 보내는 것도 도와드릴 수 있어요.',
    SNS: '메신저/SNS 사용을 도와드릴게요! 💬\n\n' +
      '카카오톡, 밴드, 문자 중 어떤 앱에서 도움이 필요하신가요?\n메시지 보내기, 사진 보내기, 영상통화 모두 가능해요.',
    SECURITY: '보안 관련 도움을 드릴게요! 🔒\n\n' +
      '혹시 의심스러운 전화나 문자를 받으셨나요?\n내용을 알려주시면 사기인지 확인해드릴게요.',
    INSURANCE: '보험/공과금 관련 도움을 드릴게요! 💰\n\n' +
      '전기, 가스, 수도 요금 납부 또는 보험 관련 문의이신가요?\n어떤 도움이 필요한지 알려주세요.',
    ENTERTAINMENT: '영화/공연 예매를 도와드릴게요! 🎬\n\n' +
      '영화관 예매, 넷플릭스, 유튜브 중 어떤 도움이 필요하신가요?',
    FOOD_ORDER: '음식 관련 도움을 드릴게요! 🍔\n\n' +
      '식당 예약, 메뉴 추천, 또는 주문 도움이 필요하신가요?',
    OTHER: '네, 무엇이든 도와드릴게요! 😊\n\n' +
      '어떤 도움이 필요하신지 조금 더 자세히 말씀해주시면\n더 정확하게 안내해드릴 수 있어요.',
  };

  return responses[metadata.category || 'OTHER'] || responses.OTHER;
}

/** 메시지 전송 (로컬 모드) — 세션 자동 생성 + AI 응답 포함 */
export async function sendMessage(request: SendMessageRequest, userId: string): Promise<SendMessageResponse> {
  const now = new Date().toISOString();
  const metadata = buildMetadata(request.content);

  /** 세션 생성 또는 기존 세션 사용 */
  let session: ChatSession;
  if (request.sessionId) {
    const sessions = getLocalSessions();
    const existing = sessions.find((s) => s.id === request.sessionId);
    if (!existing) throw new Error('세션을 찾을 수 없습니다');
    session = { ...existing, updatedAt: now };
  } else {
    session = {
      id: generateId(),
      userId,
      category: metadata.category || null,
      status: 'ACTIVE',
      resolvedBy: null,
      createdAt: now,
      updatedAt: now,
    };
  }

  /** 세션 카테고리 업데이트 (첫 메시지에서 분류) */
  if (!session.category && metadata.category) {
    session.category = metadata.category;
  }

  /** 사용자 메시지 저장 */
  const userMessage: ChatMessage = {
    id: generateId(),
    sessionId: session.id,
    role: 'USER',
    content: request.content,
    metadata: null,
    createdAt: now,
  };

  /** AI 응답 생성 */
  const aiContent = generateLocalAIResponse(request.content, metadata);
  const aiMessage: ChatMessage = {
    id: generateId(),
    sessionId: session.id,
    role: 'AI',
    content: aiContent,
    metadata,
    createdAt: new Date(Date.now() + 500).toISOString(), // AI 응답은 0.5초 후
  };

  /** 보이스피싱 고위험 → 자동 에스컬레이션 */
  if (metadata.phishing && metadata.risk === 'high') {
    session.status = 'ESCALATED';
  }

  /** 로컬 저장 */
  if (IS_LOCAL_MODE || typeof window !== 'undefined') {
    saveLocalSession(session);
    saveLocalMessage(userMessage);
    saveLocalMessage(aiMessage);
  }

  return { userMessage, aiMessage, session };
}
