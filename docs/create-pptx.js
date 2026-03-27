const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "디지털 집사";
pres.title = "디지털 집사 — 사업계획서";

// === 디자인 상수 ===
const C = {
  navy: "1A2744",
  navyLight: "263B5E",
  orange: "FF8C42",
  orangeLight: "FFA564",
  cream: "FFF8F0",
  white: "FFFFFF",
  gray: "8E99A4",
  grayLight: "E8ECF0",
  grayDark: "4A5568",
  text: "333333",
  green: "27AE60",
  red: "E74C3C",
  blue: "4A90D9",
};
const FONT = "Calibri";
const FONT_TITLE = "Arial Black";

// === 헬퍼 함수 ===
function addDarkSlide(title, subtitle) {
  const s = pres.addSlide();
  s.background = { color: C.navy };
  // 좌측 주황 액센트 바
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.08, h: 5.625, fill: { color: C.orange } });
  if (title) {
    s.addText(title, { x: 0.7, y: 1.8, w: 8.5, h: 1.2, fontSize: 38, fontFace: FONT_TITLE, color: C.white, bold: true, margin: 0 });
  }
  if (subtitle) {
    s.addText(subtitle, { x: 0.7, y: 3.1, w: 8.5, h: 0.8, fontSize: 18, fontFace: FONT, color: C.gray, margin: 0 });
  }
  return s;
}

function addLightSlide(sectionTitle) {
  const s = pres.addSlide();
  s.background = { color: C.cream };
  // 상단 바
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.orange } });
  // 하단 페이지 영역
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.2, w: 10, h: 0.425, fill: { color: C.navy } });
  s.addText("디지털 집사 — 사업계획서", { x: 0.5, y: 5.22, w: 5, h: 0.4, fontSize: 9, fontFace: FONT, color: C.gray });
  if (sectionTitle) {
    s.addText(sectionTitle, { x: 0.5, y: 0.25, w: 9, h: 0.55, fontSize: 13, fontFace: FONT, color: C.orange, bold: true, margin: 0 });
  }
  return s;
}

function addCard(slide, x, y, w, h, opts = {}) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: opts.fill || C.white },
    rectRadius: 0.08,
    shadow: { type: "outer", color: "000000", blur: 4, offset: 1, angle: 135, opacity: 0.08 },
  });
}

function addStatCard(slide, x, y, w, number, label, color) {
  addCard(slide, x, y, w, 1.3);
  slide.addText(number, { x: x + 0.15, y: y + 0.15, w: w - 0.3, h: 0.7, fontSize: 28, fontFace: FONT_TITLE, color: color || C.orange, bold: true, margin: 0 });
  slide.addText(label, { x: x + 0.15, y: y + 0.8, w: w - 0.3, h: 0.4, fontSize: 11, fontFace: FONT, color: C.grayDark, margin: 0 });
}

// ========================================================
// 슬라이드 1: 표지
// ========================================================
const s1 = pres.addSlide();
s1.background = { color: C.navy };
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.orange } });
s1.addText("디지털 집사", { x: 0.7, y: 1.0, w: 8.5, h: 1.3, fontSize: 52, fontFace: FONT_TITLE, color: C.white, bold: true, margin: 0 });
s1.addText("Digital Butler", { x: 0.7, y: 2.2, w: 8.5, h: 0.6, fontSize: 22, fontFace: FONT, color: C.orange, margin: 0 });
s1.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 3.0, w: 2.5, h: 0.03, fill: { color: C.orange } });
s1.addText("중장년 디지털 생활 도우미 서비스 사업계획서", { x: 0.7, y: 3.2, w: 8.5, h: 0.5, fontSize: 16, fontFace: FONT, color: C.grayLight, margin: 0 });
s1.addText("2026.03  |  타당성 점수 44/50  |  v1.0", { x: 0.7, y: 4.5, w: 8.5, h: 0.4, fontSize: 12, fontFace: FONT, color: C.gray, margin: 0 });

// ========================================================
// 슬라이드 2: Executive Summary
// ========================================================
const s2 = addLightSlide("EXECUTIVE SUMMARY");
s2.addText("한 줄 요약", { x: 0.5, y: 0.9, w: 9, h: 0.5, fontSize: 24, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0 });
addCard(s2, 0.5, 1.5, 9, 0.9, { fill: C.navy });
s2.addText("스마트폰과 키오스크가 어려운 5060세대를 위해, AI + 인간 상담원이 디지털 문제를 즉시 해결해주는 월 구독 서비스", { x: 0.8, y: 1.6, w: 8.4, h: 0.7, fontSize: 14, fontFace: FONT, color: C.white, margin: 0 });

// 핵심 지표 카드 5개
addStatCard(s2, 0.5, 2.7, 1.7, "2,300만", "타겟 시장 (50세+)", C.orange);
addStatCard(s2, 2.35, 2.7, 1.7, "19,900원~", "월 구독료", C.orange);
addStatCard(s2, 4.2, 2.7, 1.7, "< 100만원", "초기 자본", C.green);
addStatCard(s2, 6.05, 2.7, 1.7, "70~85%", "AI 처리율", C.blue);
addStatCard(s2, 7.9, 2.7, 1.7, "300명", "손익분기점", C.green);

s2.addText("왜 지금인가?", { x: 0.5, y: 4.2, w: 3, h: 0.4, fontSize: 14, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s2.addText([
  { text: "2025 초고령사회 진입 (65세+ 1,084만 명)", options: { bullet: true, breakLine: true, fontSize: 11 } },
  { text: "키오스크 3년간 2.4배 폭증 (45만 대)", options: { bullet: true, breakLine: true, fontSize: 11 } },
  { text: "디지털포용법 2026.01 시행 → 사업 기회", options: { bullet: true, breakLine: true, fontSize: 11 } },
  { text: "직접 경쟁자 거의 없음", options: { bullet: true, fontSize: 11 } },
], { x: 0.5, y: 4.55, w: 4.5, h: 0.7, fontFace: FONT, color: C.text, margin: 0 });

s2.addText([
  { text: '"가르치는 서비스"는 많다. ', options: { fontSize: 12 } },
  { text: '"해결하는 서비스"는 없다.', options: { fontSize: 12, bold: true, color: C.orange } },
], { x: 5.5, y: 4.55, w: 4, h: 0.5, fontFace: FONT, color: C.text, margin: 0 });

// ========================================================
// 슬라이드 3: 시장 규모
// ========================================================
const s3 = addLightSlide("시장 분석");
s3.addText("거대한 시장, 검증된 소비력", { x: 0.5, y: 0.9, w: 9, h: 0.5, fontSize: 24, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0 });

// 좌측: 한국 시장
addCard(s3, 0.5, 1.55, 4.3, 3.3);
s3.addText("한국 시장", { x: 0.7, y: 1.65, w: 3.5, h: 0.35, fontSize: 14, fontFace: FONT, color: C.orange, bold: true, margin: 0 });
s3.addText([
  { text: "50세 이상 인구: ", options: { breakLine: false, fontSize: 12 } },
  { text: "2,300만 명 (45%)", options: { bold: true, breakLine: true, fontSize: 12 } },
  { text: "65세 이상: ", options: { breakLine: false, fontSize: 12 } },
  { text: "1,084만 명 (21.2%)", options: { bold: true, breakLine: true, fontSize: 12 } },
  { text: "키오스크: ", options: { breakLine: false, fontSize: 12 } },
  { text: "45만 대 (3년간 2.4배)", options: { bold: true, breakLine: true, fontSize: 12 } },
  { text: "디지털 역량: ", options: { breakLine: false, fontSize: 12 } },
  { text: "일반 국민의 71.4%", options: { bold: true, color: C.red, breakLine: true, fontSize: 12 } },
], { x: 0.7, y: 2.1, w: 3.9, h: 1.3, fontFace: FONT, color: C.text, lineSpacingMultiple: 1.5, margin: 0 });

addCard(s3, 0.7, 3.55, 3.9, 1.1, { fill: "FFF3E8" });
s3.addText([
  { text: "핵심 인사이트\n", options: { bold: true, fontSize: 11, color: C.orange, breakLine: true } },
  { text: "50대 평균 자산 6.1억 (전 연령대 1위)\n60대 소비 증가율 +63.1% (최고)\n60대 카드 결제 139.5조원", options: { fontSize: 10, color: C.text } },
], { x: 0.85, y: 3.6, w: 3.6, h: 1.0, fontFace: FONT, margin: 0 });

// 우측: 글로벌 시장
addCard(s3, 5.2, 1.55, 4.3, 3.3);
s3.addText("글로벌 시장", { x: 5.4, y: 1.65, w: 3.5, h: 0.35, fontSize: 14, fontFace: FONT, color: C.blue, bold: true, margin: 0 });
s3.addText([
  { text: "65세+ 전 세계: ", options: { breakLine: false, fontSize: 12 } },
  { text: "8.6억 명", options: { bold: true, breakLine: true, fontSize: 12 } },
  { text: "2050년 전망: ", options: { breakLine: false, fontSize: 12 } },
  { text: "15.8억 명 (2배)", options: { bold: true, breakLine: true, fontSize: 12 } },
  { text: "시니어 테크 시장: ", options: { breakLine: false, fontSize: 12 } },
  { text: "$46.2억 (2025)", options: { bold: true, breakLine: true, fontSize: 12 } },
  { text: "시니어 케어 기술: ", options: { breakLine: false, fontSize: 12 } },
  { text: "$1,016억 (2034)", options: { bold: true, breakLine: true, fontSize: 12 } },
  { text: "일본 실버산업: ", options: { breakLine: false, fontSize: 12 } },
  { text: "101.3조 엔", options: { bold: true, breakLine: true, fontSize: 12 } },
], { x: 5.4, y: 2.1, w: 3.9, h: 1.8, fontFace: FONT, color: C.text, lineSpacingMultiple: 1.5, margin: 0 });

addCard(s3, 5.4, 3.55, 3.9, 1.1, { fill: "EBF5FF" });
s3.addText([
  { text: "정책 환경 (우호적)\n", options: { bold: true, fontSize: 11, color: C.blue, breakLine: true } },
  { text: "한국 디지털포용법 (2026.01)\n일본 고령사회 대책 24조 엔\nEU Digital Europe 263억 유로", options: { fontSize: 10, color: C.text } },
], { x: 5.55, y: 3.6, w: 3.6, h: 1.0, fontFace: FONT, margin: 0 });

// ========================================================
// 슬라이드 4: 고객 분석
// ========================================================
const s4 = addLightSlide("고객 분석");
s4.addText("393건 실제 고객 목소리가 말해주는 것", { x: 0.5, y: 0.9, w: 9, h: 0.5, fontSize: 22, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0 });

// 고객 불만 카테고리 바
const categories = [
  { label: "금융/은행", count: "167건", pct: "42%", w: 3.6 },
  { label: "키오스크", count: "88건", pct: "22%", w: 1.9 },
  { label: "스마트폰/앱", count: "84건", pct: "21%", w: 1.8 },
  { label: "보이스피싱", count: "67건", pct: "17%", w: 1.45 },
];
let barX = 0.5;
categories.forEach((cat, i) => {
  const colors = [C.navy, C.orange, C.blue, C.red];
  s4.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: barX, y: 1.55, w: cat.w, h: 0.65, fill: { color: colors[i] }, rectRadius: 0.05 });
  s4.addText(`${cat.label}  ${cat.count} (${cat.pct})`, { x: barX + 0.1, y: 1.6, w: cat.w - 0.2, h: 0.55, fontSize: 11, fontFace: FONT, color: C.white, bold: true, valign: "middle", margin: 0 });
  barX += cat.w + 0.12;
});

// 4가지 페르소나
const personas = [
  { type: "A", name: "눈치형", pct: "40%", emotion: "창피함 + 불안", quote: '"뒷사람 눈치 보여서..."', color: C.orange },
  { type: "B", name: "귀찮음형", pct: "25%", emotion: "번거로움", quote: '"할 줄은 아는데 귀찮아"', color: C.blue },
  { type: "C", name: "진짜 모름형", pct: "20%", emotion: "학습 포기", quote: '"앱마다 다 달라서..."', color: C.green },
  { type: "D", name: "보안 불안형", pct: "15%", emotion: "불신 + 공포", quote: '"사기당할까봐 안 써"', color: C.red },
];
personas.forEach((p, i) => {
  const x = 0.5 + i * 2.32;
  addCard(s4, x, 2.5, 2.15, 2.5);
  // 타입 뱃지
  s4.addShape(pres.shapes.OVAL, { x: x + 0.65, y: 2.6, w: 0.7, h: 0.7, fill: { color: p.color } });
  s4.addText(p.type, { x: x + 0.65, y: 2.6, w: 0.7, h: 0.7, fontSize: 22, fontFace: FONT_TITLE, color: C.white, align: "center", valign: "middle", margin: 0 });
  s4.addText(`${p.name} (${p.pct})`, { x: x + 0.1, y: 3.35, w: 1.95, h: 0.35, fontSize: 13, fontFace: FONT, color: C.navy, bold: true, align: "center", margin: 0 });
  s4.addText(p.emotion, { x: x + 0.1, y: 3.65, w: 1.95, h: 0.25, fontSize: 10, fontFace: FONT, color: p.color, align: "center", margin: 0 });
  s4.addText(p.quote, { x: x + 0.1, y: 4.0, w: 1.95, h: 0.6, fontSize: 10, fontFace: FONT, color: C.grayDark, italic: true, align: "center", margin: 0 });
});

// ========================================================
// 슬라이드 5: 문제가 해결되지 않은 이유
// ========================================================
const s5 = addLightSlide("고객 분석");
s5.addText("왜 이 문제가 아직 해결되지 않았는가?", { x: 0.5, y: 0.9, w: 9, h: 0.5, fontSize: 22, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0 });

const reasons = [
  { num: "01", title: '"가르치는 것"과 "해결하는 것"의 혼동', desc: "모든 기존 서비스가 교육만 제공.\n고객이 원하는 건 \"대신 해줘\"" },
  { num: "02", title: "대기업의 시니어 시장 무시", desc: '"돈 안 되는 시장"이라는 편견.\n실제: 50대 자산 6.1억 (전 연령대 1위)' },
  { num: "03", title: "수요자가 검색을 못 함", desc: "디지털 서비스가 필요한 사람이\n디지털로 그 서비스를 찾을 수 없는 역설" },
  { num: "04", title: "신뢰 장벽", desc: '"모르는 사람에게 내 폰을 맡긴다고?"\n보이스피싱 불안 67건' },
  { num: "05", title: "기존 대안의 불완전성", desc: "SK 시니어폰 = 기능 제한만\nKT 디지털배움터 = 예산 60% 삭감" },
];
reasons.forEach((r, i) => {
  const y = 1.55 + i * 0.7;
  s5.addShape(pres.shapes.OVAL, { x: 0.5, y: y + 0.05, w: 0.5, h: 0.5, fill: { color: C.orange } });
  s5.addText(r.num, { x: 0.5, y: y + 0.05, w: 0.5, h: 0.5, fontSize: 14, fontFace: FONT_TITLE, color: C.white, align: "center", valign: "middle", margin: 0 });
  s5.addText(r.title, { x: 1.2, y: y, w: 3.5, h: 0.55, fontSize: 13, fontFace: FONT, color: C.navy, bold: true, valign: "middle", margin: 0 });
  s5.addText(r.desc, { x: 5.0, y: y, w: 4.5, h: 0.55, fontSize: 10.5, fontFace: FONT, color: C.grayDark, valign: "middle", margin: 0 });
});

// ========================================================
// 슬라이드 6: 서비스 설계
// ========================================================
const s6 = addDarkSlide(null, null);
s6.addText("서비스 설계", { x: 0.7, y: 0.3, w: 4, h: 0.45, fontSize: 13, fontFace: FONT, color: C.orange, bold: true, margin: 0 });
s6.addText('"해결하는 서비스"', { x: 0.7, y: 0.8, w: 8.5, h: 0.7, fontSize: 30, fontFace: FONT_TITLE, color: C.white, bold: true, margin: 0 });
s6.addText("가르치는 게 아니라, 해결하면서 자연스럽게 배우는 구조", { x: 0.7, y: 1.45, w: 8.5, h: 0.4, fontSize: 14, fontFace: FONT, color: C.gray, margin: 0 });

// 3단계 피라미드
const stages = [
  { label: "3단계  배워볼래? (Teach Me)", desc: "맞춤 1분 영상, 월간 성취 리포트", w: 4.5, color: C.blue, x: 3.0 },
  { label: "2단계  같이 할게 (Do It With Me)", desc: "화면 공유 실시간 안내", w: 6.0, color: C.orange, x: 2.25 },
  { label: "1단계  대신 해줄게 (Do It For Me)", desc: "카톡/전화 한 마디면 즉시 해결  ← 대부분 여기", w: 8.0, color: C.green, x: 1.25 },
];
stages.forEach((st, i) => {
  const y = 2.1 + i * 1.1;
  s6.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: st.x, y, w: st.w, h: 0.9, fill: { color: st.color, transparency: 15 }, rectRadius: 0.06, line: { color: st.color, width: 1.5 } });
  s6.addText(st.label, { x: st.x + 0.2, y: y + 0.05, w: st.w - 0.4, h: 0.45, fontSize: 14, fontFace: FONT, color: C.white, bold: true, margin: 0 });
  s6.addText(st.desc, { x: st.x + 0.2, y: y + 0.45, w: st.w - 0.4, h: 0.35, fontSize: 11, fontFace: FONT, color: C.gray, margin: 0 });
});

// ========================================================
// 슬라이드 7: 가족 연결 서비스
// ========================================================
const s7 = addLightSlide("서비스 설계");
s7.addText("가족 연결 — 진짜 구매자는 자녀", { x: 0.5, y: 0.9, w: 9, h: 0.5, fontSize: 22, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0 });

// 좌측: 자녀 앱
addCard(s7, 0.5, 1.6, 4.0, 3.2);
s7.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.65, y: 1.7, w: 1.5, h: 0.35, fill: { color: C.blue }, rectRadius: 0.04 });
s7.addText("자녀 앱 (30~40대)", { x: 0.65, y: 1.7, w: 1.5, h: 0.35, fontSize: 10, fontFace: FONT, color: C.white, align: "center", valign: "middle", margin: 0 });
s7.addText([
  { text: "부모님 구독 선물 결제", options: { bullet: true, breakLine: true, fontSize: 12 } },
  { text: '"이번 주 엄마 3번 도움받으셨어요"', options: { bullet: true, breakLine: true, fontSize: 12 } },
  { text: '"엄마가 KTX 예매 혼자 하셨어요!" 성취 알림', options: { bullet: true, breakLine: true, fontSize: 12 } },
  { text: "보이스피싱 의심 시 즉시 알림", options: { bullet: true, fontSize: 12, color: C.red } },
], { x: 0.7, y: 2.2, w: 3.6, h: 2.2, fontFace: FONT, color: C.text, lineSpacingMultiple: 1.6, margin: 0 });

// 화살표 영역
s7.addText("선물 →\n← 알림", { x: 4.6, y: 2.6, w: 0.8, h: 1.0, fontSize: 11, fontFace: FONT, color: C.orange, bold: true, align: "center", margin: 0 });

// 우측: 부모님 카톡
addCard(s7, 5.5, 1.6, 4.0, 3.2);
s7.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.65, y: 1.7, w: 1.8, h: 0.35, fill: { color: C.green }, rectRadius: 0.04 });
s7.addText("부모님 카카오톡 (50~70대)", { x: 5.65, y: 1.7, w: 1.8, h: 0.35, fontSize: 9, fontFace: FONT, color: C.white, align: "center", valign: "middle", margin: 0 });
s7.addText([
  { text: '"집사야, 맥도날드 주문해줘"', options: { breakLine: true, fontSize: 12 } },
  { text: "→ AI가 즉시 처리", options: { breakLine: true, fontSize: 12, bold: true, color: C.orange } },
  { text: "", options: { breakLine: true, fontSize: 8 } },
  { text: '"이 문자 사기야?"', options: { breakLine: true, fontSize: 12 } },
  { text: "→ 즉시 판별 + 자녀에게 알림", options: { fontSize: 12, bold: true, color: C.red } },
], { x: 5.7, y: 2.2, w: 3.6, h: 2.2, fontFace: FONT, color: C.text, lineSpacingMultiple: 1.6, margin: 0 });

// 효도 마케팅 설명
addCard(s7, 0.5, 4.95, 9, 0.25, { fill: "FFF3E8" });
s7.addText('핵심: "효도 마케팅" → 2040세대까지 고객 확장 + 바이럴 성장 엔진', { x: 0.7, y: 4.95, w: 8.6, h: 0.25, fontSize: 11, fontFace: FONT, color: C.orange, bold: true, valign: "middle", margin: 0 });

// ========================================================
// 슬라이드 8: 기술 구조
// ========================================================
const s8 = addLightSlide("기술 구조");
s8.addText("AI + 인간 하이브리드 상담 모델", { x: 0.5, y: 0.9, w: 9, h: 0.5, fontSize: 22, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0 });

// AI 상담원 박스
addCard(s8, 0.5, 1.55, 4.3, 2.6, { fill: "EBF5FF" });
s8.addText("AI 상담원 (1차 처리)", { x: 0.7, y: 1.65, w: 3.9, h: 0.35, fontSize: 14, fontFace: FONT, color: C.blue, bold: true, margin: 0 });
s8.addText("70~85%", { x: 3.2, y: 1.65, w: 1.4, h: 0.35, fontSize: 18, fontFace: FONT_TITLE, color: C.blue, align: "right", margin: 0 });
s8.addText([
  { text: "단순 주문 / 정보 안내 / 예약 / FAQ", options: { bullet: true, breakLine: true, fontSize: 11 } },
  { text: "24시간 / 365일 즉시 응답 (3초 이내)", options: { bullet: true, breakLine: true, fontSize: 11 } },
  { text: "대화 기억 기능 (네이버 케어콜 벤치마크)", options: { bullet: true, breakLine: true, fontSize: 11 } },
  { text: "건당 420~700원", options: { bullet: true, fontSize: 11, bold: true, color: C.green } },
], { x: 0.7, y: 2.1, w: 3.9, h: 1.8, fontFace: FONT, color: C.text, lineSpacingMultiple: 1.5, margin: 0 });

// 화살표
s8.addText("해결 불가 / 불안 감지 시\n→ 자동 전환", { x: 4.35, y: 2.4, w: 1.3, h: 0.8, fontSize: 9, fontFace: FONT, color: C.orange, bold: true, align: "center", margin: 0 });

// 인간 상담원 박스
addCard(s8, 5.2, 1.55, 4.3, 2.6, { fill: "FFF3E8" });
s8.addText("인간 상담원 (2차 처리)", { x: 5.4, y: 1.65, w: 3.9, h: 0.35, fontSize: 14, fontFace: FONT, color: C.orange, bold: true, margin: 0 });
s8.addText("15~30%", { x: 7.9, y: 1.65, w: 1.4, h: 0.35, fontSize: 18, fontFace: FONT_TITLE, color: C.orange, align: "right", margin: 0 });
s8.addText([
  { text: "금융/보안 관련 (규제)", options: { bullet: true, breakLine: true, fontSize: 11 } },
  { text: "정서적 지원 (불안한 고객)", options: { bullet: true, breakLine: true, fontSize: 11 } },
  { text: "화면 공유 원격 지원", options: { bullet: true, breakLine: true, fontSize: 11 } },
  { text: "건당 1,000~1,500원", options: { bullet: true, fontSize: 11, bold: true } },
], { x: 5.4, y: 2.1, w: 3.9, h: 1.8, fontFace: FONT, color: C.text, lineSpacingMultiple: 1.5, margin: 0 });

// Klarna 교훈
addCard(s8, 0.5, 4.35, 9, 0.65, { fill: C.navy });
s8.addText([
  { text: "Klarna 교훈: ", options: { bold: true, color: C.orange, fontSize: 11 } },
  { text: "AI만으로 700명 대체 → 품질 저하 → 인간 재고용. ", options: { color: C.white, fontSize: 11 } },
  { text: "AI만으로는 부족, 인간 선택권이 반드시 필요.", options: { bold: true, color: C.white, fontSize: 11 } },
], { x: 0.7, y: 4.4, w: 8.6, h: 0.55, fontFace: FONT, valign: "middle", margin: 0 });

// ========================================================
// 슬라이드 9: 글로벌 사례
// ========================================================
const s9 = addLightSlide("글로벌 사례 분석");
s9.addText("검증된 글로벌 벤치마크", { x: 0.5, y: 0.9, w: 9, h: 0.5, fontSize: 22, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0 });

const benchmarks = [
  { name: "Candoo Tech", country: "미국", desc: "시니어 전용 1:1 기술 지원", price: "월 $19~$99", lesson: '전화 먼저 + "컨시어지" 브랜딩' },
  { name: "GrandPad", country: "미국", desc: "시니어 태블릿 + 가족앱", price: "월 $25", lesson: "폐쇄형 가족 네트워크" },
  { name: "Papa", country: "미국", desc: '"주문형 손주" 방문 돌봄', price: "$257M 투자", lesson: "B2B2C 보험 모델" },
  { name: "네이버 케어콜", country: "한국", desc: "AI 안부 전화, 5만 명 대상", price: "만족도 90%", lesson: "AI 기억 기능, 96% 응답률" },
  { name: "카카오뱅크", country: "한국", desc: '"간편홈" 시니어 UX', price: "647만 명 50+", lesson: '"시니어 모드"라 안 부름' },
  { name: "토스", country: "한국", desc: "유니버설 디자인 접근성", price: "시니어모드 폐기", lesson: "분리하지 않는 설계 철학" },
];

// 테이블 헤더
const headerRow = [
  { text: "서비스", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, align: "center" } },
  { text: "국가", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, align: "center" } },
  { text: "설명", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, align: "center" } },
  { text: "규모/가격", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, align: "center" } },
  { text: "우리가 배울 점", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, align: "center" } },
];
const dataRows = benchmarks.map((b, i) => [
  { text: b.name, options: { fill: { color: i % 2 === 0 ? C.white : C.grayLight }, bold: true, fontSize: 10 } },
  { text: b.country, options: { fill: { color: i % 2 === 0 ? C.white : C.grayLight }, fontSize: 10, align: "center" } },
  { text: b.desc, options: { fill: { color: i % 2 === 0 ? C.white : C.grayLight }, fontSize: 10 } },
  { text: b.price, options: { fill: { color: i % 2 === 0 ? C.white : C.grayLight }, fontSize: 10, align: "center" } },
  { text: b.lesson, options: { fill: { color: i % 2 === 0 ? C.white : C.grayLight }, fontSize: 10, bold: true, color: C.orange } },
]);

s9.addTable([headerRow, ...dataRows], { x: 0.5, y: 1.55, w: 9, colW: [1.4, 0.7, 2.2, 1.4, 3.3], border: { pt: 0.5, color: C.grayLight }, rowH: [0.4, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45] });

// ========================================================
// 슬라이드 10: 수익 모델
// ========================================================
const s10 = addLightSlide("수익 모델");
s10.addText("수익 구조와 요금제", { x: 0.5, y: 0.9, w: 9, h: 0.5, fontSize: 22, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0 });

// 요금 카드 3개
const plans = [
  { name: "라이트", price: "19,900", desc: "월 10회 대행\nAI 무제한\n보안 알림", color: C.blue, badge: null },
  { name: "스탠다드", price: "34,900", desc: "무제한 대행\n화면 공유\n교육 콘텐츠", color: C.orange, badge: "가장 인기" },
  { name: "패밀리", price: "49,900", desc: "부모 1인 무제한\n가족앱 연동\nVIP 상담원", color: C.navy, badge: null },
];
plans.forEach((p, i) => {
  const x = 0.5 + i * 3.1;
  addCard(s10, x, 1.55, 2.85, 2.3);
  if (p.badge) {
    s10.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.8, y: 1.45, w: 1.2, h: 0.25, fill: { color: C.orange }, rectRadius: 0.04 });
    s10.addText(p.badge, { x: x + 0.8, y: 1.45, w: 1.2, h: 0.25, fontSize: 9, fontFace: FONT, color: C.white, align: "center", valign: "middle", bold: true, margin: 0 });
  }
  s10.addText(p.name, { x: x + 0.15, y: 1.7, w: 2.55, h: 0.35, fontSize: 16, fontFace: FONT, color: p.color, bold: true, margin: 0 });
  s10.addText([
    { text: p.price, options: { fontSize: 28, bold: true, color: C.navy, fontFace: FONT_TITLE } },
    { text: "원/월", options: { fontSize: 12, color: C.grayDark } },
  ], { x: x + 0.15, y: 2.05, w: 2.55, h: 0.5, margin: 0 });
  s10.addText(p.desc, { x: x + 0.15, y: 2.6, w: 2.55, h: 1.0, fontSize: 11, fontFace: FONT, color: C.grayDark, lineSpacingMultiple: 1.5, margin: 0 });
});

// B2B 수익
s10.addText("B2B 확장 수익", { x: 0.5, y: 4.0, w: 3, h: 0.35, fontSize: 13, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s10.addText([
  { text: "기업 복지 (인당 15,000원/월)", options: { bullet: true, breakLine: true, fontSize: 10 } },
  { text: "통신사 시니어 요금제 번들", options: { bullet: true, breakLine: true, fontSize: 10 } },
  { text: "복지관/지자체 위탁 운영", options: { bullet: true, breakLine: true, fontSize: 10 } },
  { text: "키오스크 업체 QR코드 연동", options: { bullet: true, breakLine: true, fontSize: 10 } },
  { text: "보험사/금융사 고객 혜택", options: { bullet: true, fontSize: 10 } },
], { x: 0.5, y: 4.35, w: 4, h: 0.9, fontFace: FONT, color: C.text, margin: 0 });

// 비용 비교
s10.addText("비용 효율", { x: 5.2, y: 4.0, w: 3, h: 0.35, fontSize: 13, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s10.addText([
  { text: "AI 1건: 420~700원  vs  인간 1건: 1,000~1,500원", options: { breakLine: true, fontSize: 10 } },
  { text: "AI 처리율 70~85% → 비용 절감 핵심", options: { breakLine: true, fontSize: 10, bold: true, color: C.green } },
  { text: "공헌이익률: 라이트 64% / 패밀리 57%", options: { fontSize: 10 } },
], { x: 5.2, y: 4.35, w: 4.3, h: 0.9, fontFace: FONT, color: C.text, lineSpacingMultiple: 1.5, margin: 0 });

// ========================================================
// 슬라이드 11: 재무 시뮬레이션
// ========================================================
const s11 = addLightSlide("재무 시뮬레이션");
s11.addText("3년 재무 전망 (보수적 시나리오)", { x: 0.5, y: 0.9, w: 9, h: 0.5, fontSize: 22, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0 });

// 재무 테이블
const finHeader = [
  { text: "시점", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, align: "center" } },
  { text: "구독자", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, align: "center" } },
  { text: "월 매출", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, align: "center" } },
  { text: "월 비용", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, align: "center" } },
  { text: "월 이익", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, align: "center" } },
  { text: "누적 이익", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 10, align: "center" } },
];
const finData = [
  ["1개월", "10명", "25만", "26만", "-1만", "-1만"],
  ["3개월", "50명", "125만", "80만", "+45만", "+80만"],
  ["6개월", "150명", "375만", "200만", "+175만", "+700만"],
  ["12개월", "500명", "1,250만", "608만", "+642만", "+5,500만"],
  ["24개월", "2,000명", "5,000만", "1,800만", "+3,200만", "4.5억"],
  ["36개월", "5,000명", "1.25억", "2,975만", "+9,525만", "15.9억"],
];
const finRows = finData.map((row, i) => row.map((cell, j) => ({
  text: cell,
  options: {
    fill: { color: i % 2 === 0 ? C.white : C.grayLight },
    fontSize: 10,
    align: "center",
    bold: j === 4 && cell.startsWith("+"),
    color: j === 4 ? (cell.startsWith("+") ? "27AE60" : C.red) : j === 5 ? C.navy : C.text,
  }
})));

s11.addTable([finHeader, ...finRows], { x: 0.5, y: 1.55, w: 9, colW: [1.2, 1.2, 1.5, 1.5, 1.5, 2.1], border: { pt: 0.5, color: C.grayLight } });

// Unit Economics
s11.addText("단위 경제학 (Unit Economics)", { x: 0.5, y: 4.0, w: 4, h: 0.35, fontSize: 13, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
addStatCard(s11, 0.5, 4.35, 2.1, "15,000원", "CAC (획득 비용)", C.blue);
addStatCard(s11, 2.8, 4.35, 2.1, "750,000원", "LTV (생애 가치)", C.green);
addStatCard(s11, 5.1, 4.35, 2.1, "50:1", "LTV/CAC 비율", C.orange);
addStatCard(s11, 7.4, 4.35, 2.1, "< 3%", "월 이탈률", C.navy);

// ========================================================
// 슬라이드 12: 실행 로드맵
// ========================================================
const s12 = addDarkSlide(null, null);
s12.addText("실행 로드맵", { x: 0.7, y: 0.3, w: 4, h: 0.45, fontSize: 13, fontFace: FONT, color: C.orange, bold: true, margin: 0 });
s12.addText("Phase 0 → Phase 5", { x: 0.7, y: 0.7, w: 8.5, h: 0.6, fontSize: 26, fontFace: FONT_TITLE, color: C.white, bold: true, margin: 0 });

const phases = [
  { phase: "Phase 0", period: "1~2주", title: "준비", items: "카카오톡 채널 개설\n080 전화 개통\n시니어 10명 모집", color: C.gray },
  { phase: "Phase 1", period: "1~3개월", title: "MVP 검증", items: "본인 직접 운영\n월 3만원 단일 플랜\n핵심 가설 검증", color: C.blue },
  { phase: "Phase 2", period: "4~6개월", title: "AI 도입", items: "Claude API 연동\n상담원 1~2명 채용\n복지관 1~2곳 제휴", color: C.orange },
  { phase: "Phase 3", period: "7~12개월", title: "가족앱 + 확장", items: "가족 PWA 출시\nAI 음성 도입\nB2B 1~3건 계약", color: C.green },
  { phase: "Phase 4", period: "13~24개월", title: "전국 확장", items: "전국 상담원 네트워크\n통신사/보험사 제휴\n5,000명 목표", color: "9B59B6" },
  { phase: "Phase 5", period: "25~36개월", title: "글로벌", items: "일본 시장 진출\n동남아 확장\n시리즈 투자", color: C.red },
];
phases.forEach((p, i) => {
  const x = 0.4 + i * 1.55;
  s12.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.5, w: 1.4, h: 3.6, fill: { color: p.color, transparency: 80 }, rectRadius: 0.06, line: { color: p.color, width: 1 } });
  s12.addShape(pres.shapes.OVAL, { x: x + 0.35, y: 1.6, w: 0.7, h: 0.7, fill: { color: p.color } });
  s12.addText(String(i), { x: x + 0.35, y: 1.6, w: 0.7, h: 0.7, fontSize: 20, fontFace: FONT_TITLE, color: C.white, align: "center", valign: "middle", margin: 0 });
  s12.addText(p.phase, { x: x + 0.05, y: 2.35, w: 1.3, h: 0.3, fontSize: 10, fontFace: FONT, color: p.color, bold: true, align: "center", margin: 0 });
  s12.addText(p.period, { x: x + 0.05, y: 2.6, w: 1.3, h: 0.2, fontSize: 9, fontFace: FONT, color: C.gray, align: "center", margin: 0 });
  s12.addText(p.title, { x: x + 0.05, y: 2.85, w: 1.3, h: 0.3, fontSize: 12, fontFace: FONT, color: C.white, bold: true, align: "center", margin: 0 });
  s12.addText(p.items, { x: x + 0.1, y: 3.2, w: 1.2, h: 1.6, fontSize: 9, fontFace: FONT, color: C.gray, lineSpacingMultiple: 1.5, margin: 0 });
});

// ========================================================
// 슬라이드 13: 리스크 분석
// ========================================================
const s13 = addLightSlide("리스크 분석");
s13.addText("리스크와 대응 전략", { x: 0.5, y: 0.9, w: 9, h: 0.5, fontSize: 22, fontFace: FONT_TITLE, color: C.navy, bold: true, margin: 0 });

const risks = [
  { risk: '"사기 아냐?" 불신', level: "높음", response: "복지관/지자체 파트너십, 무료 체험, 언론 보도" },
  { risk: "개인정보 유출", level: "매우높음", response: "최소 수집, 직접 계정 접근 금지, 보안 인증" },
  { risk: "대기업 진입", level: "중간", response: "신뢰 관계 해자, 지역 커뮤니티 락인 선점" },
  { risk: "상담원 품질 편차", level: "높음", response: "매뉴얼 표준화, AI 보조, 교육/평가 시스템" },
  { risk: "AI 기술 한계", level: "중간", response: "하이브리드 모델, 인간 백업 항상 유지" },
];

const riskHeader = [
  { text: "리스크", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11 } },
  { text: "영향도", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, align: "center" } },
  { text: "대응 방안", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11 } },
];
const riskRows = risks.map((r, i) => [
  { text: r.risk, options: { fill: { color: i % 2 === 0 ? C.white : C.grayLight }, fontSize: 11, bold: true } },
  { text: r.level, options: { fill: { color: i % 2 === 0 ? C.white : C.grayLight }, fontSize: 11, align: "center", color: r.level === "매우높음" ? C.red : r.level === "높음" ? C.orange : C.grayDark } },
  { text: r.response, options: { fill: { color: i % 2 === 0 ? C.white : C.grayLight }, fontSize: 11 } },
]);
s13.addTable([riskHeader, ...riskRows], { x: 0.5, y: 1.55, w: 9, colW: [2.2, 1.2, 5.6], border: { pt: 0.5, color: C.grayLight } });

// 킬 스위치
addCard(s13, 0.5, 3.8, 9, 1.2, { fill: "FFF3E8" });
s13.addText("킬 스위치 (사업 중단 기준)", { x: 0.7, y: 3.9, w: 5, h: 0.3, fontSize: 12, fontFace: FONT, color: C.red, bold: true, margin: 0 });
s13.addText([
  { text: "6개월 후 유료 구독자 30명 미만", options: { bullet: true, breakLine: true, fontSize: 11 } },
  { text: "NPS -20 이하  |  월 이탈률 20% 이상 지속", options: { bullet: true, breakLine: true, fontSize: 11 } },
  { text: "최대 손실: 약 150만원 (6개월 × 26만원/월) → 리스크 대비 기회가 압도적", options: { bullet: true, fontSize: 11, bold: true, color: C.green } },
], { x: 0.7, y: 4.25, w: 8.6, h: 0.7, fontFace: FONT, color: C.text, margin: 0 });

// ========================================================
// 슬라이드 14: 결론
// ========================================================
const s14 = pres.addSlide();
s14.background = { color: C.navy };
s14.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.12, h: 5.625, fill: { color: C.orange } });

s14.addText("결론", { x: 0.7, y: 0.5, w: 4, h: 0.4, fontSize: 13, fontFace: FONT, color: C.orange, bold: true, margin: 0 });
s14.addText([
  { text: '"기술 지원"을 파는 것이 아니라\n', options: { fontSize: 28, color: C.white, fontFace: FONT_TITLE } },
  { text: '"존엄성"을 파는 서비스', options: { fontSize: 28, color: C.orange, fontFace: FONT_TITLE, bold: true } },
], { x: 0.7, y: 1.0, w: 8.5, h: 1.4, margin: 0 });

s14.addText([
  { text: "키오스크 앞에서 창피당하지 않을 권리", options: { bullet: true, breakLine: true, fontSize: 14, color: C.white } },
  { text: "자녀에게 매번 부탁하지 않아도 되는 자립심", options: { bullet: true, breakLine: true, fontSize: 14, color: C.white } },
  { text: "세상 변화에 뒤처지지 않는다는 안심감", options: { bullet: true, breakLine: true, fontSize: 14, color: C.white } },
  { text: "보이스피싱에 당하지 않을 안전함", options: { bullet: true, fontSize: 14, color: C.white } },
], { x: 0.7, y: 2.5, w: 8.5, h: 1.5, fontFace: FONT, lineSpacingMultiple: 1.6, margin: 0 });

// 하단 요약 숫자
const conclusionStats = [
  { num: "44/50", label: "타당성 점수" },
  { num: "2,300만", label: "타겟 시장" },
  { num: "< 100만원", label: "시작 비용" },
  { num: "15.9억", label: "3년 누적 이익" },
];
conclusionStats.forEach((st, i) => {
  const x = 0.7 + i * 2.3;
  s14.addText(st.num, { x, y: 4.2, w: 2.0, h: 0.5, fontSize: 22, fontFace: FONT_TITLE, color: C.orange, bold: true, margin: 0 });
  s14.addText(st.label, { x, y: 4.65, w: 2.0, h: 0.3, fontSize: 11, fontFace: FONT, color: C.gray, margin: 0 });
});

// ========================================================
// 저장
// ========================================================
const OUTPUT = "C:/Users/Administrator/OneDrive/바탕 화면/06_개발IT/item001-deploy/docs/사업계획서_디지털집사.pptx";
pres.writeFile({ fileName: OUTPUT }).then(() => {
  console.log("PPTX saved to: " + OUTPUT);
}).catch(err => {
  console.error("Error:", err);
});
