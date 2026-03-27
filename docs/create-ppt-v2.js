const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const { FaShieldAlt, FaUsers, FaRocket, FaChartLine, FaBrain, FaGlobe, FaHandshake, FaPhone, FaComments, FaHome, FaStar, FaCheckCircle, FaExclamationTriangle, FaLightbulb, FaBullseye, FaMoneyBillWave, FaCogs, FaClipboardCheck } = require("react-icons/fa");

// 아이콘 렌더링 함수
function renderIconSvg(IconComponent, color = "#000000", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// 팩토리 함수들 (객체 재사용 방지)
const makeShadow = () => ({ type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.15 });
const makeCardShadow = () => ({ type: "outer", blur: 4, offset: 1, angle: 135, color: "000000", opacity: 0.1 });

// 색상 팔레트 — 따뜻한 주황색 (시니어 친화적)
const C = {
  primary: "D4551B",     // 따뜻한 주황
  primaryDark: "1E2A3A", // 어두운 남색
  secondary: "F5A623",   // 밝은 골드
  accent: "2D9CDB",      // 하늘색
  bg: "FFF8F0",          // 크림색
  bgDark: "1E2A3A",      // 어두운 배경
  text: "2D3436",        // 본문 글씨
  textLight: "636E72",   // 연한 글씨
  white: "FFFFFF",
  card: "FFFFFF",
  success: "27AE60",
  danger: "E74C3C",
  gray: "BDC3C7",
  lightGray: "F0F0F0",
};

async function createPresentation() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "디지털 집사";
  pres.title = "디지털 집사 사업계획서 v2";

  // 아이콘 미리 생성
  const icons = {
    shield: await iconToBase64Png(FaShieldAlt, `#${C.white}`),
    users: await iconToBase64Png(FaUsers, `#${C.white}`),
    rocket: await iconToBase64Png(FaRocket, `#${C.white}`),
    chart: await iconToBase64Png(FaChartLine, `#${C.white}`),
    brain: await iconToBase64Png(FaBrain, `#${C.white}`),
    globe: await iconToBase64Png(FaGlobe, `#${C.white}`),
    handshake: await iconToBase64Png(FaHandshake, `#${C.white}`),
    phone: await iconToBase64Png(FaPhone, `#${C.white}`),
    comments: await iconToBase64Png(FaComments, `#${C.white}`),
    home: await iconToBase64Png(FaHome, `#${C.white}`),
    star: await iconToBase64Png(FaStar, `#${C.secondary}`),
    check: await iconToBase64Png(FaCheckCircle, `#${C.success}`),
    warning: await iconToBase64Png(FaExclamationTriangle, `#${C.secondary}`),
    lightbulb: await iconToBase64Png(FaLightbulb, `#${C.secondary}`),
    bullseye: await iconToBase64Png(FaBullseye, `#${C.white}`),
    money: await iconToBase64Png(FaMoneyBillWave, `#${C.white}`),
    cogs: await iconToBase64Png(FaCogs, `#${C.white}`),
    clipboard: await iconToBase64Png(FaClipboardCheck, `#${C.white}`),
  };

  // ============================================================
  // 슬라이드 1: 표지
  // ============================================================
  let s1 = pres.addSlide();
  s1.background = { color: C.bgDark };
  // 왼쪽 주황색 바
  s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.15, h: 5.625, fill: { color: C.primary } });
  // 상단 장식 라인
  s1.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 1.2, w: 2, h: 0.06, fill: { color: C.primary } });
  s1.addText("디지털 집사", { x: 0.8, y: 1.4, w: 8, h: 1.2, fontSize: 48, fontFace: "Arial Black", color: C.white, bold: true, margin: 0 });
  s1.addText("Digital Butler", { x: 0.8, y: 2.4, w: 8, h: 0.6, fontSize: 20, fontFace: "Calibri", color: C.primary, margin: 0 });
  s1.addText("중장년 디지털 생활 도우미 서비스 — 사업계획서 v2.0", { x: 0.8, y: 3.2, w: 8, h: 0.5, fontSize: 16, fontFace: "Calibri", color: C.gray, margin: 0 });
  // 핵심 수치 카드 3개
  const metrics = [
    { label: "데이터", value: "2,017건", x: 0.8 },
    { label: "성공 확률", value: "87/100", x: 3.6 },
    { label: "타당성", value: "44/50", x: 6.4 },
  ];
  metrics.forEach(m => {
    s1.addShape(pres.shapes.RECTANGLE, { x: m.x, y: 4.2, w: 2.4, h: 1, fill: { color: "2A3A4A" }, shadow: makeCardShadow() });
    s1.addText(m.value, { x: m.x, y: 4.2, w: 2.4, h: 0.6, fontSize: 22, fontFace: "Arial Black", color: C.primary, align: "center", valign: "middle", margin: 0 });
    s1.addText(m.label, { x: m.x, y: 4.75, w: 2.4, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.gray, align: "center", valign: "middle", margin: 0 });
  });
  s1.addText("2026.03.27", { x: 8, y: 5, w: 1.8, h: 0.4, fontSize: 10, fontFace: "Calibri", color: C.textLight, align: "right", margin: 0 });

  // ============================================================
  // 슬라이드 2: 왜 지금인가?
  // ============================================================
  let s2 = pres.addSlide();
  s2.background = { color: C.bg };
  s2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.bgDark } });
  s2.addText("왜 지금인가?", { x: 0.6, y: 0.1, w: 8, h: 0.7, fontSize: 28, fontFace: "Arial Black", color: C.white, margin: 0 });

  const reasons = [
    { icon: icons.users, title: "초고령사회 진입", desc: "2025년, 65세+ 1,084만 명 (21.2%)", color: C.primary },
    { icon: icons.phone, title: "키오스크 2.4배 폭증", desc: "2019년 19만대 → 2022년 45만대", color: C.accent },
    { icon: icons.shield, title: "디지털포용법 시행", desc: "2026년 1월, 정부가 뒷받침", color: C.success },
    { icon: icons.brain, title: "AI 비용 급감", desc: "Claude API 건당 420원, 자동화 가능", color: C.secondary },
    { icon: icons.comments, title: "디지털 역량 최하위", desc: "고령층 일반인 대비 71.4%", color: C.danger },
    { icon: icons.rocket, title: "경쟁자 없음", desc: '"해결"하는 서비스 전무', color: "8E44AD" },
  ];
  reasons.forEach((r, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.5 + col * 3.1;
    const y = 1.3 + row * 2.0;
    s2.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.8, h: 1.7, fill: { color: C.card }, shadow: makeCardShadow() });
    s2.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.8, h: 0.06, fill: { color: r.color } });
    s2.addShape(pres.shapes.OVAL, { x: x + 0.15, y: y + 0.25, w: 0.45, h: 0.45, fill: { color: r.color } });
    s2.addImage({ data: r.icon, x: x + 0.22, y: y + 0.32, w: 0.3, h: 0.3 });
    s2.addText(r.title, { x: x + 0.7, y: y + 0.2, w: 1.9, h: 0.5, fontSize: 13, fontFace: "Calibri", color: C.text, bold: true, margin: 0 });
    s2.addText(r.desc, { x: x + 0.15, y: y + 0.9, w: 2.5, h: 0.6, fontSize: 10, fontFace: "Calibri", color: C.textLight, margin: 0 });
  });

  // ============================================================
  // 슬라이드 3: 시장 규모 TAM/SAM/SOM
  // ============================================================
  let s3 = pres.addSlide();
  s3.background = { color: C.bg };
  s3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.bgDark } });
  s3.addText("시장 규모 — TAM / SAM / SOM", { x: 0.6, y: 0.1, w: 8, h: 0.7, fontSize: 28, fontFace: "Arial Black", color: C.white, margin: 0 });

  // 동심원 표현 (큰 원 → 작은 원)
  s3.addShape(pres.shapes.OVAL, { x: 0.5, y: 1.2, w: 4.2, h: 4.2, fill: { color: C.primary, transparency: 15 } });
  s3.addShape(pres.shapes.OVAL, { x: 1.3, y: 2.0, w: 2.6, h: 2.6, fill: { color: C.primary, transparency: 30 } });
  s3.addShape(pres.shapes.OVAL, { x: 1.9, y: 2.6, w: 1.4, h: 1.4, fill: { color: C.primary } });
  s3.addText("SOM\n48억", { x: 1.9, y: 2.6, w: 1.4, h: 1.4, fontSize: 11, fontFace: "Calibri", color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
  s3.addText("SAM 4,800억", { x: 1.3, y: 4.1, w: 2.6, h: 0.4, fontSize: 10, fontFace: "Calibri", color: C.primary, align: "center", margin: 0 });
  s3.addText("TAM 4.8조원", { x: 0.5, y: 4.9, w: 4.2, h: 0.4, fontSize: 12, fontFace: "Calibri", color: C.primary, bold: true, align: "center", margin: 0 });

  // 오른쪽 상세 설명
  const tamDetails = [
    { label: "TAM (전체 시장)", value: "4.8조원", desc: "50세+ 2,300만명 × 월 17,400원 WTP" },
    { label: "SAM (접근 가능)", value: "4,800억원", desc: "디지털 소외 체감자 460만명" },
    { label: "SOM (초기 목표)", value: "48억원", desc: "SAM의 1% 침투 (~46,000명)" },
  ];
  tamDetails.forEach((t, i) => {
    const y = 1.3 + i * 1.35;
    s3.addShape(pres.shapes.RECTANGLE, { x: 5.3, y, w: 4.2, h: 1.1, fill: { color: C.card }, shadow: makeCardShadow() });
    s3.addShape(pres.shapes.RECTANGLE, { x: 5.3, y, w: 0.08, h: 1.1, fill: { color: C.primary } });
    s3.addText(t.label, { x: 5.6, y: y + 0.05, w: 3, h: 0.35, fontSize: 11, fontFace: "Calibri", color: C.textLight, margin: 0 });
    s3.addText(t.value, { x: 5.6, y: y + 0.35, w: 3, h: 0.4, fontSize: 22, fontFace: "Arial Black", color: C.primary, margin: 0 });
    s3.addText(t.desc, { x: 5.6, y: y + 0.72, w: 3.7, h: 0.3, fontSize: 9, fontFace: "Calibri", color: C.textLight, margin: 0 });
  });

  // ============================================================
  // 슬라이드 4: 고객 분석 — 2,017건 데이터
  // ============================================================
  let s4 = pres.addSlide();
  s4.background = { color: C.bg };
  s4.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.bgDark } });
  s4.addText("고객 분석 — 2,017건 실제 데이터", { x: 0.6, y: 0.1, w: 8, h: 0.7, fontSize: 28, fontFace: "Arial Black", color: C.white, margin: 0 });

  // 상위 5개 카테고리 바 차트
  s4.addChart(pres.charts.BAR, [{
    name: "건수",
    labels: ["금융/은행", "키오스크", "스마트폰", "보이스피싱", "배달앱"],
    values: [312, 198, 187, 156, 143]
  }], {
    x: 0.5, y: 1.2, w: 4.5, h: 3.8, barDir: "bar",
    chartColors: [C.primary],
    showValue: true,
    dataLabelColor: C.text,
    catAxisLabelColor: C.text,
    valAxisLabelColor: C.textLight,
    valGridLine: { color: "E8E8E8", size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: false,
    showTitle: true,
    title: "TOP 5 카테고리 (건수)",
    titleColor: C.text,
    titleFontSize: 12,
  });

  // 오른쪽: 4가지 페르소나
  const personas = [
    { name: "눈치형 (40%)", emoji: "😰", desc: "실수할까봐 두려움" },
    { name: "귀찮음형 (25%)", emoji: "😤", desc: "세팅만 대신해줘" },
    { name: "진짜 모름형 (20%)", emoji: "😢", desc: "배워도 소용없다 느낌" },
    { name: "보안 불안형 (15%)", emoji: "😨", desc: "피싱 당할까봐 안 씀" },
  ];
  personas.forEach((p, i) => {
    const y = 1.2 + i * 1.05;
    s4.addShape(pres.shapes.RECTANGLE, { x: 5.5, y, w: 4, h: 0.85, fill: { color: C.card }, shadow: makeCardShadow() });
    s4.addShape(pres.shapes.RECTANGLE, { x: 5.5, y, w: 0.06, h: 0.85, fill: { color: C.primary } });
    s4.addText(p.name, { x: 5.8, y: y + 0.05, w: 3.5, h: 0.35, fontSize: 13, fontFace: "Calibri", color: C.text, bold: true, margin: 0 });
    s4.addText(p.desc, { x: 5.8, y: y + 0.4, w: 3.5, h: 0.35, fontSize: 10, fontFace: "Calibri", color: C.textLight, margin: 0 });
  });

  // ============================================================
  // 슬라이드 5: 17개 서비스 카테고리 + WTP
  // ============================================================
  let s5 = pres.addSlide();
  s5.background = { color: C.bg };
  s5.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.bgDark } });
  s5.addText("17개 서비스 카테고리 × WTP 분석", { x: 0.6, y: 0.1, w: 8, h: 0.7, fontSize: 28, fontFace: "Arial Black", color: C.white, margin: 0 });

  // WTP 차트
  s5.addChart(pres.charts.BAR, [{
    name: "WTP (만원)",
    labels: ["보안", "금융", "스마트폰", "의료", "IoT", "키오스크", "배달", "교통", "관공서", "쇼핑", "충전", "지원금", "여행", "문서", "SNS", "OTT", "중고"],
    values: [3, 2.5, 2, 2, 2, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1, 1, 1]
  }], {
    x: 0.3, y: 1.1, w: 9.4, h: 3.0, barDir: "col",
    chartColors: [C.primary],
    showValue: true,
    dataLabelColor: C.text,
    dataLabelPosition: "outEnd",
    catAxisLabelColor: C.text,
    catAxisLabelFontSize: 8,
    valAxisLabelColor: C.textLight,
    valGridLine: { color: "E8E8E8", size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: false,
  });

  // 핵심 인사이트 박스
  s5.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.3, w: 9, h: 1.0, fill: { color: C.card }, shadow: makeCardShadow() });
  s5.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.3, w: 0.08, h: 1.0, fill: { color: C.secondary } });
  s5.addImage({ data: icons.lightbulb, x: 0.8, y: 4.45, w: 0.4, h: 0.4 });
  s5.addText([
    { text: "핵심 발견: ", options: { bold: true } },
    { text: '"안전"에 대한 WTP(30,000원)가 "편의"보다 2~3배 높음 → 보안 서비스를 프리미엄 차별화 포인트로 활용' },
  ], { x: 1.4, y: 4.35, w: 7.8, h: 0.9, fontSize: 12, fontFace: "Calibri", color: C.text, valign: "middle", margin: 0 });

  // ============================================================
  // 슬라이드 6: 서비스 3단계 구조
  // ============================================================
  let s6 = pres.addSlide();
  s6.background = { color: C.bg };
  s6.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.bgDark } });
  s6.addText('서비스 설계 — "해결"하는 서비스', { x: 0.6, y: 0.1, w: 8, h: 0.7, fontSize: 28, fontFace: "Arial Black", color: C.white, margin: 0 });

  // 3단계 피라미드
  const stages = [
    { label: "3단계: 배워볼래?", desc: "맞춤형 1분 영상, 월간 성취 리포트", w: 3.0, color: C.accent },
    { label: "2단계: 같이 할게", desc: "화면 공유, 실시간 안내, 영상통화", w: 5.0, color: C.secondary },
    { label: "1단계: 대신 해줄게  ← 대부분 여기", desc: "카톡/전화 한 마디면 즉시 해결 (AI 70% + 인간 30%)", w: 7.0, color: C.primary },
  ];
  stages.forEach((st, i) => {
    const y = 1.3 + i * 1.4;
    const x = (10 - st.w) / 2;
    s6.addShape(pres.shapes.RECTANGLE, { x, y, w: st.w, h: 1.15, fill: { color: st.color }, shadow: makeShadow() });
    s6.addText(st.label, { x, y: y + 0.05, w: st.w, h: 0.55, fontSize: 16, fontFace: "Calibri", color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
    s6.addText(st.desc, { x, y: y + 0.6, w: st.w, h: 0.45, fontSize: 11, fontFace: "Calibri", color: C.white, align: "center", valign: "middle", margin: 0 });
  });

  // 하단 핵심 메시지
  s6.addText('"가르치는 서비스"가 아니라 "해결하는 서비스" — 해결하면서 자연스럽게 배우게 되는 구조', {
    x: 0.5, y: 5.0, w: 9, h: 0.45, fontSize: 12, fontFace: "Calibri", color: C.textLight, italic: true, align: "center", margin: 0
  });

  // ============================================================
  // 슬라이드 7: 가족 연결 + 접근 채널
  // ============================================================
  let s7 = pres.addSlide();
  s7.background = { color: C.bg };
  s7.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.bgDark } });
  s7.addText("가족 연결 서비스 + 멀티 채널", { x: 0.6, y: 0.1, w: 8, h: 0.7, fontSize: 28, fontFace: "Arial Black", color: C.white, margin: 0 });

  // 가족 연결 다이어그램
  s7.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.2, w: 4.3, h: 3.5, fill: { color: C.card }, shadow: makeShadow() });
  s7.addText("핵심 차별점: 가족 연결", { x: 0.7, y: 1.3, w: 3.9, h: 0.4, fontSize: 14, fontFace: "Calibri", color: C.primary, bold: true, margin: 0 });
  s7.addText([
    { text: "자녀 (2040세대)", options: { bold: true, breakLine: true } },
    { text: "  구독 선물 결제", options: { breakLine: true } },
    { text: "  성취 알림 수신", options: { breakLine: true } },
    { text: "  긴급 보안 알림", options: { breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "부모님 (5060세대)", options: { bold: true, breakLine: true } },
    { text: '  카톡: "집사야, 주문해줘"', options: { breakLine: true } },
    { text: "  AI가 즉시 처리", options: { breakLine: true } },
    { text: "  인간 상담원 에스컬레이션", options: {} },
  ], { x: 0.7, y: 1.8, w: 3.9, h: 2.8, fontSize: 11, fontFace: "Calibri", color: C.text, margin: 0 });

  // 접근 채널
  s7.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.2, w: 4.3, h: 3.5, fill: { color: C.card }, shadow: makeShadow() });
  s7.addText("5개 접근 채널 — 앱 설치 불필요", { x: 5.4, y: 1.3, w: 3.9, h: 0.4, fontSize: 14, fontFace: "Calibri", color: C.primary, bold: true, margin: 0 });
  const channels = [
    "카카오톡 채널 — 채널 추가 한 번",
    "전화 (080 무료) — 전화번호 한 번",
    "PWA 웹앱 — 홈 화면 바로가기",
    "가족 대리 요청 — 자녀가 대신",
    "오프라인 방문 — 직접 찾아감",
  ];
  channels.forEach((ch, i) => {
    s7.addImage({ data: icons.check, x: 5.5, y: 1.95 + i * 0.5, w: 0.25, h: 0.25 });
    s7.addText(ch, { x: 5.9, y: 1.92 + i * 0.5, w: 3.4, h: 0.35, fontSize: 11, fontFace: "Calibri", color: C.text, margin: 0 });
  });

  // 효도 마케팅 배너
  s7.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.9, w: 9, h: 0.5, fill: { color: C.primary } });
  s7.addText("효도 마케팅 → 2040세대까지 고객 확장 + 바이럴 성장 엔진", { x: 0.5, y: 4.9, w: 9, h: 0.5, fontSize: 14, fontFace: "Calibri", color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

  // ============================================================
  // 슬라이드 8: 기술 구조
  // ============================================================
  let s8 = pres.addSlide();
  s8.background = { color: C.bg };
  s8.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.bgDark } });
  s8.addText("기술 구조 — AI + 인간 하이브리드", { x: 0.6, y: 0.1, w: 8, h: 0.7, fontSize: 28, fontFace: "Arial Black", color: C.white, margin: 0 });

  // AI 상담원 박스
  s8.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.2, w: 4.3, h: 2.5, fill: { color: C.card }, shadow: makeShadow() });
  s8.addShape(pres.shapes.OVAL, { x: 0.7, y: 1.35, w: 0.5, h: 0.5, fill: { color: C.accent } });
  s8.addImage({ data: icons.brain, x: 0.78, y: 1.43, w: 0.35, h: 0.35 });
  s8.addText("AI 상담원 (1차 처리)", { x: 1.3, y: 1.35, w: 3.2, h: 0.5, fontSize: 15, fontFace: "Calibri", color: C.text, bold: true, margin: 0 });
  s8.addText([
    { text: "70~85% 자동 해결", options: { bold: true, breakLine: true, color: C.success } },
    { text: "", options: { breakLine: true } },
    { text: "단순 주문/예약/정보 안내", options: { breakLine: true, bullet: true } },
    { text: "보안 판별 (피싱 탐지)", options: { breakLine: true, bullet: true } },
    { text: "FAQ 자동 응답", options: { breakLine: true, bullet: true } },
    { text: "건당 420~700원", options: { bullet: true } },
  ], { x: 0.7, y: 2.0, w: 3.9, h: 1.6, fontSize: 11, fontFace: "Calibri", color: C.text, margin: 0 });

  // 인간 상담원 박스
  s8.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.2, w: 4.3, h: 2.5, fill: { color: C.card }, shadow: makeShadow() });
  s8.addShape(pres.shapes.OVAL, { x: 5.4, y: 1.35, w: 0.5, h: 0.5, fill: { color: C.primary } });
  s8.addImage({ data: icons.users, x: 5.48, y: 1.43, w: 0.35, h: 0.35 });
  s8.addText("인간 상담원 (2차 처리)", { x: 6.0, y: 1.35, w: 3.2, h: 0.5, fontSize: 15, fontFace: "Calibri", color: C.text, bold: true, margin: 0 });
  s8.addText([
    { text: "15~30% 에스컬레이션", options: { bold: true, breakLine: true, color: C.primary } },
    { text: "", options: { breakLine: true } },
    { text: "금융/보안 업무", options: { breakLine: true, bullet: true } },
    { text: "정서적 지원/감정 케어", options: { breakLine: true, bullet: true } },
    { text: "화면 공유/방문 서비스", options: { breakLine: true, bullet: true } },
    { text: "건당 1,000~1,500원", options: { bullet: true } },
  ], { x: 5.4, y: 2.0, w: 3.9, h: 1.6, fontSize: 11, fontFace: "Calibri", color: C.text, margin: 0 });

  // 기술 스택 요약
  s8.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.0, w: 9, h: 1.3, fill: { color: C.card }, shadow: makeCardShadow() });
  const techStack = [
    { label: "AI 엔진", value: "Claude API" },
    { label: "AI 음성", value: "Retell AI" },
    { label: "채널", value: "카카오톡 API" },
    { label: "웹앱", value: "Next.js + PWA" },
    { label: "결제", value: "토스페이먼츠" },
  ];
  techStack.forEach((t, i) => {
    const x = 0.7 + i * 1.8;
    s8.addText(t.label, { x, y: 4.15, w: 1.6, h: 0.4, fontSize: 9, fontFace: "Calibri", color: C.textLight, align: "center", margin: 0 });
    s8.addText(t.value, { x, y: 4.5, w: 1.6, h: 0.5, fontSize: 12, fontFace: "Calibri", color: C.primary, bold: true, align: "center", margin: 0 });
  });

  // ============================================================
  // 슬라이드 9: 7가지 비즈니스 모델
  // ============================================================
  let s9 = pres.addSlide();
  s9.background = { color: C.bg };
  s9.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.bgDark } });
  s9.addText("7가지 비즈니스 모델", { x: 0.6, y: 0.1, w: 8, h: 0.7, fontSize: 28, fontFace: "Arial Black", color: C.white, margin: 0 });

  const models = [
    { name: "충전제", desc: "10,000원 선불\n건당 차감", star: true },
    { name: "월정액 구독", desc: "19,900~49,900원\n핵심 모델", star: true },
    { name: "건당 과금", desc: "AI 500원\n인간 1,500원", star: false },
    { name: "프리미엄", desc: "월 99,000원\n방문+VIP", star: false },
    { name: "B2B2C", desc: "기업 복지\n보험사 연계", star: true },
    { name: "하이브리드", desc: "구독+건당\n+방문 결합", star: false },
    { name: "플랫폼 수수료", desc: "키오스크 QR\n업체 과금", star: false },
  ];
  models.forEach((m, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.3 + col * 2.4;
    const y = 1.2 + row * 2.1;
    s9.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.15, h: 1.8, fill: { color: C.card }, shadow: makeCardShadow() });
    if (m.star) {
      s9.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.15, h: 0.06, fill: { color: C.primary } });
      s9.addImage({ data: icons.star, x: x + 1.7, y: y + 0.15, w: 0.25, h: 0.25 });
    }
    s9.addText(m.name, { x: x + 0.1, y: y + 0.15, w: 1.8, h: 0.4, fontSize: 13, fontFace: "Calibri", color: C.text, bold: true, margin: 0 });
    s9.addText(m.desc, { x: x + 0.1, y: y + 0.65, w: 1.9, h: 1.0, fontSize: 10, fontFace: "Calibri", color: C.textLight, margin: 0 });
  });

  // 구독 플랜 상세 (하단)
  s9.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 4.65, w: 9.4, h: 0.8, fill: { color: C.primary, transparency: 10 } });
  s9.addText([
    { text: "핵심 구독 플랜: ", options: { bold: true } },
    { text: "라이트 19,900원 (월 10회) | 스탠다드 34,900원 (무제한) | 패밀리 49,900원 (가족 연동)" },
  ], { x: 0.5, y: 4.7, w: 9, h: 0.7, fontSize: 12, fontFace: "Calibri", color: C.text, valign: "middle", margin: 0 });

  // ============================================================
  // 슬라이드 10: 재무 시뮬레이션
  // ============================================================
  let s10 = pres.addSlide();
  s10.background = { color: C.bg };
  s10.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.bgDark } });
  s10.addText("재무 시뮬레이션 — 3년 전망", { x: 0.6, y: 0.1, w: 8, h: 0.7, fontSize: 28, fontFace: "Arial Black", color: C.white, margin: 0 });

  // 매출/이익 차트
  s10.addChart(pres.charts.BAR, [
    { name: "월 매출", labels: ["1개월", "3개월", "6개월", "12개월", "24개월", "36개월"], values: [25, 125, 375, 1250, 5000, 12500] },
    { name: "월 이익", labels: ["1개월", "3개월", "6개월", "12개월", "24개월", "36개월"], values: [22, 45, 175, 642, 3200, 9525] },
  ], {
    x: 0.3, y: 1.1, w: 5.5, h: 3.2, barDir: "col",
    chartColors: [C.primary, C.success],
    showValue: false,
    catAxisLabelColor: C.text,
    valAxisLabelColor: C.textLight,
    valGridLine: { color: "E8E8E8", size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: true,
    legendPos: "b",
    showTitle: true,
    title: "보수적 시나리오 (만원)",
    titleColor: C.text,
    titleFontSize: 11,
  });

  // 오른쪽: 핵심 수치
  const finMetrics = [
    { label: "손익분기 (MVP)", value: "2명", desc: "고정비 3만원 → 즉시 달성" },
    { label: "손익분기 (성장)", value: "300명", desc: "6~9개월 예상" },
    { label: "LTV/CAC", value: "50:1", desc: "매우 건강 (3:1 이상 양호)" },
    { label: "3년 누적 이익", value: "15.9억", desc: "보수적 시나리오 기준" },
  ];
  finMetrics.forEach((f, i) => {
    const y = 1.1 + i * 1.05;
    s10.addShape(pres.shapes.RECTANGLE, { x: 6.1, y, w: 3.6, h: 0.85, fill: { color: C.card }, shadow: makeCardShadow() });
    s10.addText(f.label, { x: 6.3, y: y + 0.02, w: 3.2, h: 0.28, fontSize: 9, fontFace: "Calibri", color: C.textLight, margin: 0 });
    s10.addText(f.value, { x: 6.3, y: y + 0.25, w: 3.2, h: 0.35, fontSize: 20, fontFace: "Arial Black", color: C.primary, margin: 0 });
    s10.addText(f.desc, { x: 6.3, y: y + 0.58, w: 3.2, h: 0.25, fontSize: 9, fontFace: "Calibri", color: C.textLight, margin: 0 });
  });

  // MVP 비용 강조
  s10.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 4.6, w: 9.4, h: 0.8, fill: { color: C.success, transparency: 10 } });
  s10.addText([
    { text: "MVP 초기 비용: 0원 ", options: { bold: true, color: C.success } },
    { text: "(카카오톡 채널 무료 + 본인 운영) → 최대 손실 18만원 (6개월 × 3만원)" },
  ], { x: 0.5, y: 4.65, w: 9, h: 0.7, fontSize: 12, fontFace: "Calibri", color: C.text, valign: "middle", margin: 0 });

  // ============================================================
  // 슬라이드 11: 경쟁 분석 (Porter's 5 Forces)
  // ============================================================
  let s11 = pres.addSlide();
  s11.background = { color: C.bg };
  s11.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.bgDark } });
  s11.addText("경쟁 분석 — Porter's 5 Forces", { x: 0.6, y: 0.1, w: 8, h: 0.7, fontSize: 28, fontFace: "Arial Black", color: C.white, margin: 0 });

  // 중앙 경쟁 강도
  s11.addShape(pres.shapes.OVAL, { x: 3.5, y: 2.3, w: 3, h: 1.5, fill: { color: C.success } });
  s11.addText("경쟁 강도\n낮음", { x: 3.5, y: 2.3, w: 3, h: 1.5, fontSize: 16, fontFace: "Calibri", color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

  // 5 forces
  const forces = [
    { label: "신규 진입 위협", level: "중간", x: 3.7, y: 1.1, w: 2.6, h: 0.7, color: C.secondary },
    { label: "공급자 교섭력\n낮음", level: "", x: 0.5, y: 2.5, w: 2.5, h: 1.0, color: C.accent },
    { label: "구매자 교섭력\n중간", level: "", x: 7, y: 2.5, w: 2.5, h: 1.0, color: C.secondary },
    { label: "대체재 위협\n중간", level: "", x: 3.7, y: 4.3, w: 2.6, h: 0.8, color: C.secondary },
  ];
  forces.forEach(f => {
    s11.addShape(pres.shapes.RECTANGLE, { x: f.x, y: f.y, w: f.w, h: f.h, fill: { color: f.color, transparency: 20 } });
    s11.addText(f.label, { x: f.x, y: f.y, w: f.w, h: f.h, fontSize: 11, fontFace: "Calibri", color: C.text, bold: true, align: "center", valign: "middle", margin: 0 });
  });

  // 결론 배너
  s11.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 5.1, w: 9, h: 0.4, fill: { color: C.primary } });
  s11.addText('"해결해주는" 서비스는 시장 공백 — 지금이 선점 적기', { x: 0.5, y: 5.1, w: 9, h: 0.4, fontSize: 12, fontFace: "Calibri", color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

  // ============================================================
  // 슬라이드 12: 글로벌 벤치마크
  // ============================================================
  let s12 = pres.addSlide();
  s12.background = { color: C.bg };
  s12.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.bgDark } });
  s12.addText("글로벌 벤치마크 — 7개 성공 사례", { x: 0.6, y: 0.1, w: 8, h: 0.7, fontSize: 28, fontFace: "Arial Black", color: C.white, margin: 0 });

  const benchmarks = [
    { name: "Candoo Tech", country: "미국", desc: "시니어 1:1 기술 지원, 월 $49~99", learn: "시니어 특화 포지셔닝" },
    { name: "Papa", country: "미국", desc: "시니어+청년 매칭, B2B2C", learn: "보험사 제휴 모델" },
    { name: "GrandPad", country: "미국", desc: "전용 태블릿+서비스 번들", learn: "가족 연결 기능" },
    { name: "Klarna", country: "스웨덴", desc: "AI 700명 대체 → 재고용", learn: "AI만으로는 부족" },
    { name: "네이버 케어콜", country: "한국", desc: "5만명, 만족도 95%", learn: "시니어+AI 검증" },
    { name: "NTT 도코모", country: "일본", desc: "통신사 원격 지원", learn: "통신사 번들 모델" },
  ];
  benchmarks.forEach((b, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.4 + col * 3.15;
    const y = 1.2 + row * 2.1;
    s12.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.9, h: 1.8, fill: { color: C.card }, shadow: makeCardShadow() });
    s12.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: 1.8, fill: { color: C.primary } });
    s12.addText(b.name, { x: x + 0.2, y: y + 0.08, w: 2.5, h: 0.35, fontSize: 13, fontFace: "Calibri", color: C.text, bold: true, margin: 0 });
    s12.addText(b.country, { x: x + 0.2, y: y + 0.4, w: 2.5, h: 0.25, fontSize: 9, fontFace: "Calibri", color: C.textLight, margin: 0 });
    s12.addText(b.desc, { x: x + 0.2, y: y + 0.7, w: 2.5, h: 0.45, fontSize: 10, fontFace: "Calibri", color: C.text, margin: 0 });
    s12.addText("→ " + b.learn, { x: x + 0.2, y: y + 1.2, w: 2.5, h: 0.4, fontSize: 10, fontFace: "Calibri", color: C.primary, bold: true, margin: 0 });
  });

  // ============================================================
  // 슬라이드 13: 실행 로드맵
  // ============================================================
  let s13 = pres.addSlide();
  s13.background = { color: C.bg };
  s13.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.bgDark } });
  s13.addText("실행 로드맵 — 0원 MVP → 글로벌", { x: 0.6, y: 0.1, w: 8, h: 0.7, fontSize: 28, fontFace: "Arial Black", color: C.white, margin: 0 });

  const phases = [
    { phase: "Phase 0", period: "1~2주", title: "0원 MVP 준비", desc: "카톡 채널\n080 전화\n매뉴얼 작성", color: C.textLight },
    { phase: "Phase 1", period: "1~3개월", title: "MVP 검증", desc: "10~50명\n본인 운영\n월 30,000원", color: C.accent },
    { phase: "Phase 2", period: "4~6개월", title: "AI 도입", desc: "100~300명\nClaude API\n웹앱 MVP", color: C.secondary },
    { phase: "Phase 3", period: "7~12개월", title: "가족 앱 출시", desc: "500~1,000명\nPWA 정식\nB2B 시작", color: C.primary },
    { phase: "Phase 4", period: "13~24개월", title: "전국 확장", desc: "2,000~5,000명\n통신사 제휴\nQR 플랫폼", color: C.primary },
  ];
  // 타임라인 라인
  s13.addShape(pres.shapes.LINE, { x: 0.5, y: 2.8, w: 9, h: 0, line: { color: C.gray, width: 3 } });

  phases.forEach((p, i) => {
    const x = 0.3 + i * 1.9;
    // 원형 마커
    s13.addShape(pres.shapes.OVAL, { x: x + 0.6, y: 2.55, w: 0.5, h: 0.5, fill: { color: p.color } });
    s13.addText(String(i), { x: x + 0.6, y: 2.55, w: 0.5, h: 0.5, fontSize: 14, fontFace: "Calibri", color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });
    // 위 내용
    s13.addText(p.phase, { x, y: 1.2, w: 1.7, h: 0.3, fontSize: 10, fontFace: "Calibri", color: p.color, bold: true, align: "center", margin: 0 });
    s13.addText(p.period, { x, y: 1.5, w: 1.7, h: 0.25, fontSize: 9, fontFace: "Calibri", color: C.textLight, align: "center", margin: 0 });
    s13.addText(p.title, { x, y: 1.8, w: 1.7, h: 0.35, fontSize: 12, fontFace: "Calibri", color: C.text, bold: true, align: "center", margin: 0 });
    // 아래 설명
    s13.addText(p.desc, { x, y: 3.3, w: 1.7, h: 1.3, fontSize: 9, fontFace: "Calibri", color: C.textLight, align: "center", margin: 0 });
  });

  // Phase 5 (글로벌)
  s13.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.9, w: 9, h: 0.5, fill: { color: C.bgDark } });
  s13.addShape(pres.shapes.OVAL, { x: 0.7, y: 4.98, w: 0.35, h: 0.35, fill: { color: C.primary } });
  s13.addImage({ data: icons.globe, x: 0.74, y: 5.02, w: 0.27, h: 0.27 });
  s13.addText("Phase 5 (25~36개월): 글로벌 — 일본 (101조엔) / 대만 / 동남아", { x: 1.2, y: 4.9, w: 8, h: 0.5, fontSize: 12, fontFace: "Calibri", color: C.white, bold: true, valign: "middle", margin: 0 });

  // ============================================================
  // 슬라이드 14: 성공 확률 87/100
  // ============================================================
  let s14 = pres.addSlide();
  s14.background = { color: C.bg };
  s14.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.9, fill: { color: C.bgDark } });
  s14.addText("검증 결과 — 성공 확률 87/100", { x: 0.6, y: 0.1, w: 8, h: 0.7, fontSize: 28, fontFace: "Arial Black", color: C.white, margin: 0 });

  // 큰 원형 점수
  s14.addShape(pres.shapes.OVAL, { x: 0.7, y: 1.3, w: 3.0, h: 3.0, fill: { color: C.primary } });
  s14.addText("87", { x: 0.7, y: 1.5, w: 3.0, h: 2.0, fontSize: 72, fontFace: "Arial Black", color: C.white, align: "center", valign: "middle", margin: 0 });
  s14.addText("/100", { x: 0.7, y: 3.1, w: 3.0, h: 0.8, fontSize: 20, fontFace: "Calibri", color: C.white, align: "center", margin: 0 });

  // 6개 프레임워크 점수
  const frameworks = [
    { name: "Problem-Market Fit", score: "38/40", pct: 95 },
    { name: "Solution-Product Fit", score: "34/40", pct: 85 },
    { name: "Business Model Fit", score: "26/30", pct: 87 },
    { name: "MVP Feasibility", score: "29/30", pct: 97 },
    { name: "Timing", score: "28/30", pct: 93 },
    { name: "Founder Fit", score: "23/30", pct: 77 },
  ];
  frameworks.forEach((f, i) => {
    const y = 1.2 + i * 0.65;
    s14.addText(f.name, { x: 4.2, y, w: 2.5, h: 0.35, fontSize: 10, fontFace: "Calibri", color: C.text, margin: 0 });
    s14.addText(f.score, { x: 8.7, y, w: 0.8, h: 0.35, fontSize: 10, fontFace: "Calibri", color: C.primary, bold: true, align: "right", margin: 0 });
    // 진행 바 배경
    s14.addShape(pres.shapes.RECTANGLE, { x: 4.2, y: y + 0.32, w: 5.3, h: 0.15, fill: { color: C.lightGray } });
    // 진행 바
    s14.addShape(pres.shapes.RECTANGLE, { x: 4.2, y: y + 0.32, w: 5.3 * (f.pct / 100), h: 0.15, fill: { color: C.primary } });
  });

  // 하단 요약
  s14.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 5.0, w: 9, h: 0.45, fill: { color: C.primary } });
  s14.addText("시장 기회 + 실행 용이성 + 타이밍 = 모두 \"지금 여기\"를 가리킴", { x: 0.5, y: 5.0, w: 9, h: 0.45, fontSize: 13, fontFace: "Calibri", color: C.white, bold: true, align: "center", valign: "middle", margin: 0 });

  // ============================================================
  // 슬라이드 15: 결론 — 다음 액션
  // ============================================================
  let s15 = pres.addSlide();
  s15.background = { color: C.bgDark };
  s15.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.15, h: 5.625, fill: { color: C.primary } });

  s15.addText('"기술 지원"을 파는 것이 아니라\n"존엄성"을 파는 것', {
    x: 0.8, y: 0.5, w: 8, h: 1.5, fontSize: 30, fontFace: "Arial Black", color: C.white, margin: 0
  });
  s15.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.1, w: 3, h: 0.06, fill: { color: C.primary } });

  const conclusions = [
    "고통이 진짜다 — 2,017건 실제 데이터, 17개 카테고리",
    "돈이 된다 — TAM 4.8조, WTP 평균 17,400원",
    "경쟁이 없다 — \"해결\"하는 서비스 전무",
    "시작이 쉽다 — 0원 MVP, 내일 당장 시작",
    "이탈이 어렵다 — 신뢰 + 가족 연결 이중 락인",
    "정책이 밀어준다 — 디지털포용법 2026.01 시행",
    "글로벌로 간다 — 일본 101조엔, AARP $945억",
  ];
  conclusions.forEach((c, i) => {
    s15.addImage({ data: icons.check, x: 0.8, y: 2.4 + i * 0.38, w: 0.22, h: 0.22 });
    s15.addText(c, { x: 1.15, y: 2.38 + i * 0.38, w: 8, h: 0.35, fontSize: 12, fontFace: "Calibri", color: C.gray, margin: 0 });
  });

  // 다음 액션
  s15.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 5.0, w: 8.8, h: 0.45, fill: { color: C.primary } });
  s15.addText("다음 단계: 랜딩 페이지 + 가족 웹앱 + 카카오톡 AI 챗봇 개발 시작", {
    x: 0.6, y: 5.0, w: 8.8, h: 0.45, fontSize: 13, fontFace: "Calibri", color: C.white, bold: true, align: "center", valign: "middle", margin: 0
  });

  // 파일 저장
  const outputPath = process.argv[2] || "디지털집사_사업계획서_v2.pptx";
  await pres.writeFile({ fileName: outputPath });
  console.log(`PPT 생성 완료: ${outputPath}`);
}

createPresentation().catch(console.error);
