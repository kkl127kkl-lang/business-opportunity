"use client";

import { useState, useEffect } from "react";

/* ─── NAV ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-stone-200/60" style={{ background: "rgba(254,251,246,0.85)", padding: scrolled ? "10px 0" : "16px 0", transition: "padding 0.3s" }}>
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🏠</span>
          <span className="font-black text-xl text-green-900 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>디지털 집사</span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          {[["AI 대행", "#service"], ["교육 서비스", "#education"], ["요금제", "#pricing"], ["후기", "#review"]].map(([l, h]) => (
            <a key={h} href={h} className="text-stone-500 text-sm font-medium hover:text-green-800 transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex gap-2.5">
          <a href="/login" className="hidden sm:inline-block px-5 py-2.5 text-sm font-semibold text-green-800 border-2 border-green-800 rounded-full hover:bg-green-800 hover:text-white transition-all">로그인</a>
          <a href="/login" className="px-5 py-2.5 text-sm font-semibold text-white rounded-full shadow-lg shadow-green-900/20 hover:-translate-y-0.5 transition-all" style={{ background: "linear-gradient(135deg, #2D5016, #4A7C28)" }}>무료 체험</a>
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  const [idx, setIdx] = useState(0);
  const msgs = [
    { t: "user", text: "쿠팡에서 휴지 좀 주문해줘" },
    { t: "bot", text: "로켓배송 12,900원 주문 완료! 내일 도착해요 🚀", label: "🤖 AI 대행 완료" },
    { t: "user", text: "KTX 서울→부산 내일 오전" },
    { t: "bot", text: "오전 9시 KTX 예약 완료! 좌석 7A입니다 🚄", label: "🤖 AI 대행 완료" },
    { t: "user", text: "이상한 전화 왔는데 사기야?" },
    { t: "bot", text: "🚨 보이스피싱이에요! 절대 개인정보 알려주지 마세요", label: "🛡️ 보안 감지" },
  ];
  useEffect(() => { const t = setInterval(() => setIdx(p => p < msgs.length - 1 ? p + 1 : p), 1200); return () => clearInterval(t); }, []);

  return (
    <section className="pt-28 pb-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FEFBF6 0%, #E8F0DE 40%, #FFF3E0 70%, #FEFBF6 100%)" }}>
      <div className="max-w-6xl mx-auto px-5 flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-green-700">AI 상담원 24시간 대기 중</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-5" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            어머니, 아버지를 위한<br /><span className="text-green-800">쿠팡 주문도, KTX 예매도</span><br />카톡 한 줄이면 끝.
          </h1>
          <p className="text-lg text-stone-500 leading-relaxed mb-3 max-w-lg">
            50~70대 부모님이 카카오톡으로 말씀만 하시면<br /><strong className="text-green-800">AI 상담원이 즉시 대행</strong>해 드리고, <strong className="text-orange-600">체계적 교육</strong>으로 혼자서도 할 수 있게 도와드립니다.
          </p>
          <p className="text-sm text-stone-400 mb-8">✦ 24시간 AI 상담원 &nbsp;&nbsp;✦ 15개 분야 대행 &nbsp;&nbsp;✦ 체계적 교육 무료 &nbsp;&nbsp;✦ 7일 무료 체험</p>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a href="/login" className="px-8 py-4 text-base font-bold text-white rounded-full shadow-lg shadow-green-900/25 text-center hover:-translate-y-0.5 transition-all" style={{ background: "linear-gradient(135deg, #2D5016, #4A7C28)" }}>💬 카톡으로 시작하기</a>
            <a href="/signup" className="px-8 py-4 text-base font-bold text-white rounded-full shadow-lg shadow-orange-500/25 text-center hover:-translate-y-0.5 transition-all" style={{ background: "linear-gradient(135deg, #D4740E, #F5A623)" }}>🎁 부모님께 선물하기</a>
          </div>
          <div className="flex gap-8">
            {[{ n: "2,847", l: "이용 중" }, { n: "94%", l: "재이용률" }, { n: "4.9", l: "만족도" }].map(s => (
              <div key={s.l}><div className="text-2xl font-black text-green-800">{s.n}</div><div className="text-xs text-stone-400 mt-0.5">{s.l}</div></div>
            ))}
          </div>
        </div>
        {/* Chat UI */}
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-3xl shadow-2xl shadow-black/8 border border-stone-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-stone-100 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #E8F0DE, #FEFBF6)" }}>
              <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-lg">🏠</div>
              <div className="flex-1"><div className="font-bold text-sm">디지털 집사</div><div className="text-xs text-green-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />AI 상담원 응답 중</div></div>
              <span className="text-xs text-stone-400">오후 2:30</span>
            </div>
            <div className="px-4 py-5 space-y-3 min-h-[320px]" style={{ background: "#F8F5F0" }}>
              {msgs.slice(0, idx + 1).map((m, i) => (
                <div key={i} className={`flex ${m.t === "user" ? "justify-end" : "justify-start"}`} style={{ animation: "fadeIn 0.4s ease-out" }}>
                  {m.t === "user" ? (
                    <div className="bg-amber-100 px-4 py-3 rounded-2xl rounded-br-sm max-w-[80%] text-sm leading-relaxed shadow-sm">{m.text}</div>
                  ) : (
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm max-w-[85%] text-sm leading-relaxed shadow-sm border border-stone-100">
                      <span className="text-xs font-bold text-green-700 block mb-1">{m.label}</span>{m.text}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-stone-100 bg-white flex gap-2">
              <div className="flex-1 px-4 py-2.5 rounded-full bg-stone-50 text-xs text-stone-400">메시지를 입력하세요...</div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm" style={{ background: "linear-gradient(135deg, #2D5016, #4A7C28)" }}>→</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </section>
  );
}

/* ─── PROBLEM — 반드시 해결해야 하는 문제들 ─── */
function Problem() {
  const items = [
    { emoji: "🏦", title: "모바일뱅킹 못 해서 은행 왕복 2시간", desc: "인증서·OTP·비밀번호... 송금 한 번에 10단계. 60대 모바일뱅킹 이용률 34%에 불과", stat: "연간 교통비+시간 36만원 낭비", severity: "최상", color: "bg-red-50 border-red-100" },
    { emoji: "🚨", title: "보이스피싱에 노후자금 한순간에", desc: "검찰 사칭 전화, 택배 문자... 판별할 곳이 없어 혼자 당한다. 60대+ 피해자 비율 46%", stat: "평균 피해액 1,800만원", severity: "최상", color: "bg-red-50 border-red-100" },
    { emoji: "🏪", title: "키오스크 못 써서 식당 포기", desc: "뒷사람 눈치에 주문 포기. 어르신 10명 중 7명이 불편 호소. 무인 매장은 계속 늘어나는 중", stat: "무인 매장 주문 포기율 38%", severity: "상", color: "bg-orange-50 border-orange-100" },
    { emoji: "🏥", title: "병원 예약 못 해서 진료 시기 놓침", desc: "전화 예약은 대기만 30분. 앱 예약은 가입부터 막힘. 급한 진료를 미루다 악화", stat: "온라인 예약 시도 실패율 60대 58%", severity: "상", color: "bg-orange-50 border-orange-100" },
    { emoji: "🛒", title: "온라인 쇼핑 결제에서 포기", desc: "장바구니까지는 했는데... 결제 단계에서 멈춤. 더 싼 가격 알면서 매장 직접 방문", stat: "60대 72%가 온라인 주문 포기 경험", severity: "상", color: "bg-orange-50 border-orange-100" },
    { emoji: "😔", title: "자녀한테 매번 물어보기 미안", desc: "\"맨날 물어보면 귀찮아할까 봐...\" 시니어 67%가 자녀 부탁을 꺼림. 결국 혼자 끙끙", stat: "부모-자녀 갈등 원인 2위", severity: "상", color: "bg-orange-50 border-orange-100" },
  ];

  return (
    <section className="py-24 px-5" style={{ background: "#FEFBF6" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-red-600 bg-red-50 px-4 py-1.5 rounded-full tracking-wider">MUST SOLVE</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-5 mb-3 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            반드시 해결해야 할 <span className="text-red-600">6가지 문제</span>
          </h2>
          <p className="text-stone-400">2,017건 실제 고객 목소리 + 정부 통계 기반</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p, i) => (
            <div key={i} className={`rounded-2xl p-7 border ${p.color} hover:-translate-y-1 transition-all duration-300`}>
              <div className="flex justify-between items-start mb-3">
                <span className="text-4xl">{p.emoji}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${p.severity === "최상" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>절박도 {p.severity}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 tracking-tight">{p.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed mb-3">{p.desc}</p>
              <span className="text-xs text-red-600 font-semibold bg-red-50 px-3 py-1.5 rounded-lg inline-block">📊 {p.stat}</span>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #E8F0DE, #FFF3E0)" }}>
          <p className="text-lg font-bold">이 문제들, <span className="text-green-800">AI 대행</span>으로 <span className="underline underline-offset-4">즉시 해결</span>하고 + <span className="text-orange-600">체계적 교육</span>으로 <span className="underline underline-offset-4">스스로 해결</span>할 수 있게</p>
        </div>
      </div>
    </section>
  );
}

/* ─── AI AGENCY SERVICE (메인) ─── */
function AgencyService() {
  const categories = [
    { emoji: "🛒", name: "쇼핑 주문", desc: "쿠팡·네이버·마켓컬리" }, { emoji: "🚄", name: "KTX 예매", desc: "기차표 1분 예약" },
    { emoji: "🏦", name: "은행 송금", desc: "이체·잔액·공과금" }, { emoji: "🔒", name: "보이스피싱", desc: "사기 즉시 판별" },
    { emoji: "🏥", name: "병원 예약", desc: "접수부터 예약까지" }, { emoji: "🍔", name: "음식 주문", desc: "배달앱·키오스크" },
    { emoji: "📱", name: "앱 설정", desc: "설치·업데이트·삭제" }, { emoji: "💰", name: "공과금", desc: "세금·보험·요금" },
    { emoji: "🏠", name: "관공서·민원", desc: "주민등록·증명서" }, { emoji: "📧", name: "카톡·문자", desc: "메시지·단체방" },
    { emoji: "📸", name: "사진·영상", desc: "정리·전송·인화" }, { emoji: "🎬", name: "영상·OTT", desc: "유튜브·넷플릭스" },
    { emoji: "📋", name: "복지·연금", desc: "신청·조회·수령" }, { emoji: "🗺️", name: "길찾기", desc: "교통·택시·지도" },
    { emoji: "📋", name: "전자서명", desc: "인증서·서명·발급" },
  ];

  return (
    <section id="service" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-green-800 bg-green-50 px-4 py-1.5 rounded-full tracking-wider">AI 대행 서비스</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-5 mb-3 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            24시간 <span className="text-green-800">AI 상담원</span>이 대신 해드려요
          </h2>
          <p className="text-stone-500">카카오톡으로 말씀만 하시면, AI가 수초 내 처리합니다</p>
        </div>

        {/* AI 구조 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {[
            { icon: "🤖", title: "AI가 즉시 처리", desc: "쇼핑·예매·배달 등 단순 대행은 AI가 수초 내 완료. 24시간 365일 쉬지 않습니다.", tag: "응답 평균 5초", bg: "bg-green-50", tagBg: "bg-green-100 text-green-700" },
            { icon: "👨‍💼", title: "복잡한 건 전문 상담원", desc: "인증서 갱신, 전자서명, 계좌 이체 등 민감한 업무는 전문 상담원이 화면 공유로 직접 도와드려요.", tag: "원격 화면 공유", bg: "bg-orange-50", tagBg: "bg-orange-100 text-orange-700" },
            { icon: "🛡️", title: "보안 AI 실시간 감시", desc: "보이스피싱 문자·전화를 즉시 판별. 위험 시 가족에게 자동 알림. 연간 1,800만원 피해를 막아드려요.", tag: "가족 긴급 알림", bg: "bg-red-50", tagBg: "bg-red-100 text-red-700" },
          ].map((item, i) => (
            <div key={i} className={`${item.bg} rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300`}>
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold mb-2 tracking-tight">{item.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed mb-4">{item.desc}</p>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${item.tagBg}`}>{item.tag}</span>
            </div>
          ))}
        </div>

        {/* 15개 분야 */}
        <h3 className="text-center font-bold text-lg mb-5">15개 분야, 일상의 모든 디지털 문제를 해결해요</h3>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((c, i) => (
            <div key={i} className="rounded-2xl p-4 text-center border border-stone-100 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer" style={{ background: "#FEFBF6" }}>
              <div className="text-2xl mb-1.5">{c.emoji}</div>
              <div className="text-sm font-bold tracking-tight">{c.name}</div>
              <div className="text-xs text-stone-400">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EDUCATION SERVICE (체계적 교육) ─── */
function EducationService() {
  const [activeLevel, setActiveLevel] = useState("all");

  const courses = [
    // 입문 — 반드시 해결 급선무
    { emoji: "📱", title: "스마트폰 완전 기초", desc: "전원 켜기부터 와이파이, 전화·문자·카톡까지. 스마트폰 처음 쓰시는 분을 위한 코스", steps: 8, time: "1시간", level: "입문", badge: "필수", category: "기초" },
    { emoji: "🏪", title: "키오스크 완전 정복", desc: "맥도날드·카페·은행·병원 키오스크 실전 연습. 실제 화면으로 터치하면서 배워요", steps: 6, time: "40분", level: "입문", badge: "🔥인기", category: "일상" },
    { emoji: "🔐", title: "보이스피싱 완벽 예방", desc: "사기 문자·전화 구별법, 실제 사례 분석, 의심 시 대처법. 가족과 함께 보세요", steps: 4, time: "25분", level: "입문", badge: "필수", category: "보안" },

    // 활용 — 일상 필수
    { emoji: "🏦", title: "모바일뱅킹 마스터", desc: "계좌 조회·송금·공과금 납부·자동이체 설정까지. 은행 안 가도 되는 삶", steps: 8, time: "1시간", level: "활용", badge: "🔥인기", category: "금융" },
    { emoji: "🛒", title: "쿠팡·네이버 쇼핑 A to Z", desc: "검색→주문→결제→배송추적→교환/반품까지. 온라인이 더 싸다는 걸 직접 체험", steps: 7, time: "50분", level: "활용", badge: "", category: "쇼핑" },
    { emoji: "🏥", title: "병원 예약앱 정복", desc: "카카오·네이버로 내 주변 병원 검색→접수→예약. 전화 대기 없이 1분 완료", steps: 5, time: "30분", level: "활용", badge: "🔥인기", category: "건강" },
    { emoji: "🚕", title: "카카오택시·네이버지도", desc: "택시 부르기·길찾기·대중교통 검색·즐겨찾기. 어디서든 길 잃지 않아요", steps: 5, time: "30분", level: "활용", badge: "", category: "교통" },
    { emoji: "🍔", title: "배달앱 주문하기", desc: "배달의민족·쿠팡이츠로 음식 주문. 메뉴 선택→결제→배송 추적까지", steps: 5, time: "30분", level: "활용", badge: "", category: "일상" },

    // 심화 — 자립 완성
    { emoji: "📋", title: "공인인증서·전자서명", desc: "인증서 갱신·설치·전자서명까지. 부동산·보험 계약도 집에서 처리", steps: 6, time: "40분", level: "심화", badge: "", category: "금융" },
    { emoji: "🏠", title: "정부24·민원 서비스", desc: "주민등록등본·납세증명서 등 온라인 발급. 주민센터 안 가도 돼요", steps: 5, time: "30분", level: "심화", badge: "", category: "행정" },
    { emoji: "📸", title: "사진·영상 관리", desc: "사진 정리·전송·클라우드 백업·인화 주문. 소중한 추억 잃어버리지 마세요", steps: 6, time: "40분", level: "심화", badge: "", category: "일상" },
    { emoji: "🎬", title: "유튜브·넷플릭스 즐기기", desc: "영상 검색·재생·구독·저장. 스마트TV 연결까지", steps: 5, time: "30분", level: "심화", badge: "", category: "여가" },
  ];

  const filtered = activeLevel === "all" ? courses : courses.filter(c => c.level === activeLevel);
  const levelColors: Record<string, string> = { "입문": "bg-green-50 text-green-700", "활용": "bg-blue-50 text-blue-700", "심화": "bg-purple-50 text-purple-700" };

  return (
    <section id="education" className="py-24 px-5" style={{ background: "#FEFBF6" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-4 py-1.5 rounded-full tracking-wider">EDUCATION</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-5 mb-3 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            체계적 교육으로 <span className="text-green-800">혼자서도 해결</span>
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto leading-relaxed">
            대행만 받지 마세요. 어르신 눈높이 영상으로 직접 해보면서 배우는 12개 코스.
            <br /><strong className="text-green-800">모든 요금제에서 무료!</strong>
          </p>
        </div>

        {/* 3단계 커리큘럼 */}
        <div className="grid grid-cols-3 gap-3 mb-8 max-w-xl mx-auto">
          {[
            { level: "입문", icon: "🌱", desc: "스마트폰 기초·키오스크·보안", color: "border-green-300 bg-green-50" },
            { level: "활용", icon: "📱", desc: "뱅킹·쇼핑·병원·택시", color: "border-blue-300 bg-blue-50" },
            { level: "심화", icon: "🚀", desc: "인증서·민원·사진·영상", color: "border-purple-300 bg-purple-50" },
          ].map(l => (
            <div key={l.level} className={`rounded-xl p-4 text-center border ${l.color}`}>
              <div className="text-xl mb-1">{l.icon}</div>
              <div className="text-sm font-bold">{l.level}</div>
              <div className="text-xs text-stone-500 mt-0.5">{l.desc}</div>
            </div>
          ))}
        </div>

        {/* 필터 */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {[{ id: "all", label: "전체 12개" }, { id: "입문", label: "🌱 입문" }, { id: "활용", label: "📱 활용" }, { id: "심화", label: "🚀 심화" }].map(f => (
            <button key={f.id} onClick={() => setActiveLevel(f.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeLevel === f.id ? "bg-green-800 text-white shadow-lg" : "bg-white text-stone-500 border border-stone-200 hover:border-green-300"}`}>
              {f.label}
            </button>
          ))}
        </div>

        {/* 코스 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {filtered.map((c, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 border border-stone-100 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              {c.badge && <span className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-md ${c.badge === "필수" ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"}`}>{c.badge}</span>}
              <div className="text-3xl mb-3">{c.emoji}</div>
              <h3 className="text-lg font-bold mb-1.5 tracking-tight">{c.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed mb-4">{c.desc}</p>
              <div className="flex gap-2 flex-wrap mb-4">
                <span className={`text-xs px-2.5 py-1 rounded-md font-semibold ${levelColors[c.level]}`}>{c.level}</span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-stone-50 text-stone-500 font-semibold">⏱ {c.time}</span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-stone-50 text-stone-500 font-semibold">{c.steps}단계</span>
              </div>
              <div className="h-1.5 rounded-full bg-stone-100"><div className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400 w-0" /></div>
              <div className="mt-2 text-xs text-stone-400">아직 시작 전</div>
            </div>
          ))}
        </div>

        {/* 교육 방식 4가지 */}
        <h3 className="text-center font-bold text-lg mb-6">이렇게 배워요</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: "🎥", title: "큰 글씨 영상", desc: "어르신 전용 제작. 천천히, 손 클로즈업, 실제 화면 그대로", color: "bg-orange-50" },
            { icon: "📞", title: "1:1 화면 공유", desc: "상담원이 내 폰 화면을 함께 보면서 하나하나 안내", color: "bg-green-50" },
            { icon: "🔄", title: "무한 반복 연습", desc: "까먹어도 OK. 같은 영상을 원하는 만큼 다시 볼 수 있어요", color: "bg-blue-50" },
            { icon: "🏆", title: "성취 배지 & 알림", desc: "\"엄마가 혼자 송금 성공!\" 가족에게 뿌듯한 알림이 가요", color: "bg-purple-50" },
          ].map((f, i) => (
            <div key={i} className={`${f.color} rounded-2xl p-6 text-center hover:-translate-y-1 transition-all`}>
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="text-sm font-bold tracking-tight">{f.title}</div>
              <div className="text-xs text-stone-500 mt-1.5 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* 학습 여정 */}
        <div className="rounded-2xl p-8 bg-white border border-stone-100">
          <h3 className="text-center font-bold text-lg mb-6">🗺️ 학습 여정 로드맵</h3>
          <div className="flex flex-wrap justify-between gap-4">
            {[
              { s: 1, title: "AI에게 물어보기", desc: "카톡으로 뭐든 질문", icon: "💬", bg: "bg-green-50" },
              { s: 2, title: "영상으로 따라하기", desc: "큰 글씨, 천천히", icon: "🎥", bg: "bg-orange-50" },
              { s: 3, title: "상담원과 실습", desc: "화면 공유로 함께", icon: "📞", bg: "bg-blue-50" },
              { s: 4, title: "혼자서 도전!", desc: "막히면 언제든 도움", icon: "🌟", bg: "bg-purple-50" },
              { s: 5, title: "디지털 자립 완성", desc: "자녀에게 자랑 🎉", icon: "🏆", bg: "bg-emerald-50" },
            ].map(s => (
              <div key={s.s} className="flex-1 min-w-[130px] text-center">
                <div className={`w-12 h-12 rounded-full ${s.bg} flex items-center justify-center text-xl mx-auto mb-2`}>{s.icon}</div>
                <div className="text-xs text-stone-400 font-bold">STEP {s.s}</div>
                <div className="text-sm font-bold tracking-tight">{s.title}</div>
                <div className="text-xs text-stone-500">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING ─── */
function Pricing() {
  const plans = [
    { name: "라이트", price: "19,900원", period: "/월", desc: "가끔 도움이 필요해요", popular: false,
      features: ["월 10건 AI 대행 포함", "24시간 AI 상담 무제한", "✅ 전체 교육 영상 무료", "보이스피싱 보안 알림", "활동 리포트", "초과 시 건당 2,000원"],
      cta: "시작하기", ctaStyle: "border-2 border-green-800 text-green-800 hover:bg-green-800 hover:text-white", gradient: "" },
    { name: "스탠다드", badge: "인기", price: "34,900원", period: "/월", desc: "넉넉한 대행 + 1:1 교육", popular: true,
      features: ["월 30건 AI 대행 포함", "24시간 AI 상담 무제한", "✅ 전체 교육 영상 무료", "전문 상담원 1:1 화면 공유 월 2회", "보이스피싱 보안 + 가족 알림", "초과 시 건당 1,500원"],
      cta: "가장 인기 있는 플랜", ctaStyle: "text-white shadow-lg shadow-green-900/25", gradient: "linear-gradient(135deg, #2D5016, #4A7C28)" },
    { name: "프리미엄", price: "54,900원", period: "/월", desc: "무제한 + VIP 전담", popular: false,
      features: ["무제한 AI 대행", "24시간 AI 상담 무제한", "✅ 전체 교육 영상 + 1:1 교육 무제한", "VIP 전담 상담원 배정", "보이스피싱 보안 + 가족 알림", "우선 상담 + 즉시 연결"],
      cta: "프리미엄 시작", ctaStyle: "text-white shadow-lg shadow-orange-500/25", gradient: "linear-gradient(135deg, #D4740E, #F5A623)" },
    { name: "패밀리", badge: "선물용", price: "49,900원", period: "/월", desc: "부모님께 선물하기 딱", popular: false,
      features: ["월 30건 AI 대행 포함", "24시간 AI 상담 무제한", "✅ 전체 교육 영상 + 성취 배지", "전문 상담원 화면 공유 월 4회", "가족 앱 연동 (활동·보안 알림)", "💝 자녀가 대신 결제·관리"],
      cta: "🎁 선물하기", ctaStyle: "text-white shadow-lg shadow-orange-500/25", gradient: "linear-gradient(135deg, #D4740E, #F5A623)" },
  ];

  return (
    <section id="pricing" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-4 py-1.5 rounded-full tracking-wider">PRICING</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-5 mb-3 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>정액제로 부담 없이</h2>
          <p className="text-stone-400">모든 플랜 7일 무료 체험 · 교육 영상 전 플랜 무료 · 언제든 해지</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {plans.map((p, i) => (
            <div key={i} className={`rounded-3xl bg-white p-7 relative hover:-translate-y-1 transition-all duration-300 ${p.popular ? "border-2 border-green-800 shadow-xl shadow-green-900/10" : "border border-stone-200"}`}>
              {p.badge && <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-3.5 py-1 rounded-full ${p.badge === "인기" ? "bg-green-800" : "bg-orange-500"}`}>{p.badge}</span>}
              <h3 className="text-xl font-black tracking-tight">{p.name}</h3>
              <p className="text-xs text-stone-400 mb-5">{p.desc}</p>
              <div className="mb-6"><span className="text-3xl font-black">{p.price}</span><span className="text-sm text-stone-400">{p.period}</span></div>
              <ul className="mb-6 space-y-0">
                {p.features.map((f, j) => (
                  <li key={j} className={`text-sm py-2 border-b border-stone-50 leading-relaxed ${f.startsWith("✅") ? "text-green-700 font-semibold" : f.startsWith("💝") ? "text-orange-600 font-semibold" : "text-stone-500"}`}>
                    {f.startsWith("✅") || f.startsWith("💝") ? f : `✓ ${f}`}
                  </li>
                ))}
              </ul>
              <a href="/signup" className={`block text-center w-full py-3.5 rounded-full text-sm font-bold transition-all ${p.ctaStyle}`} style={p.gradient ? { background: p.gradient } : {}}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-7 flex-wrap">
          {["✓ 위약금 없음", "✓ 카드 등록 없이 체험", "✓ 즉시 해지 가능", "✓ 교육 영상 전 플랜 무료"].map(t => (
            <span key={t} className="text-xs text-stone-400">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FOR FAMILY ─── */
function ForFamily() {
  return (
    <section className="py-24 px-5" style={{ background: "#FEFBF6" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-4 py-1.5 rounded-full tracking-wider">FOR FAMILY</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-5 mb-3 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            부모님께 드리는 <span className="text-orange-600">가장 실용적인 선물</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-8 border border-stone-100">
            <h3 className="text-lg font-bold mb-5">👶 자녀가 구독료 내는 이유</h3>
            {[
              { icon: "⏰", text: "부모님 전화 1번 = 평균 20~30분. 월 3만원으로 그 시간을 삽니다." },
              { icon: "🛡️", text: "보이스피싱 방어 창구. 의심 문자 오면 AI가 즉시 판별." },
              { icon: "🎁", text: "명절 선물로 완벽. 홍삼보다 실용적이에요." },
              { icon: "🎉", text: "\"엄마가 혼자 쿠팡 주문했어요!\" 성취 알림에 뿌듯." },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 mb-4"><span className="text-lg">{item.icon}</span><p className="text-sm text-stone-500 leading-relaxed">{item.text}</p></div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-8 border border-stone-100">
            <h3 className="text-lg font-bold mb-5">📊 가족 앱에서 한눈에</h3>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-xl p-4"><div className="text-xs text-green-600 font-bold mb-1">🎉 성취 알림 · 방금</div><p className="text-sm font-semibold">엄마가 처음으로 혼자 네이버 쇼핑 주문하셨어요!</p></div>
              <div className="bg-blue-50 rounded-xl p-4"><div className="text-xs text-blue-600 font-bold mb-1">📊 주간 리포트</div><p className="text-sm font-semibold">이번 주: AI 대행 5회, 교육 영상 3개 완료</p></div>
              <div className="bg-red-50 rounded-xl p-4"><div className="text-xs text-red-600 font-bold mb-1">🚨 보안 알림 · 어제</div><p className="text-sm font-semibold">보이스피싱 의심 문자 감지 → 자동 차단 완료</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── REVIEWS ─── */
function Reviews() {
  const reviews = [
    { name: "김순자", age: 67, type: "본인", cat: "AI 대행", text: "카톡 한 줄에 쿠팡 주문 완료! 30분 넘게 헤매던 게 1분이면 끝나요.", emoji: "👵" },
    { name: "이영호", age: 72, type: "본인", cat: "교육", text: "모바일뱅킹 영상 3번 보니까 혼자서 송금 성공! 은행 안 가도 돼요.", emoji: "👴" },
    { name: "박미경", age: 58, type: "본인", cat: "보안", text: "보이스피싱 문자 올 때마다 AI한테 물어봐요. '사기예요!' 바로 알려줘서 안심.", emoji: "👩‍🦳" },
    { name: "정수현", age: 35, type: "선물", cat: "가족", text: "엄마한테 선물했더니 '혼자 쿠팡 주문했어!' 연락이 왔어요. 최고의 효도템.", emoji: "👩" },
    { name: "최진우", age: 41, type: "선물", cat: "교육", text: "아버지가 키오스크 교육 영상 보시더니 맥도날드 혼자 주문하셨대요!", emoji: "👨" },
    { name: "한지영", age: 62, type: "본인", cat: "AI 대행", text: "병원 예약을 AI가 해줘요. 전화 30분 대기 안 해도 되니까 너무 편해요.", emoji: "👵" },
  ];

  return (
    <section id="review" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full tracking-wider">REVIEW</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-5 mb-3 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>이용하신 분들의 이야기</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="rounded-2xl p-7 border border-stone-100 hover:-translate-y-1 transition-all duration-300" style={{ background: "#FEFBF6" }}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3 items-center">
                  <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center text-xl">{r.emoji}</div>
                  <div><div className="font-bold text-sm">{r.name} ({r.age}세)</div><div className="text-xs text-stone-400">{r.type} 이용</div></div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${r.cat === "교육" ? "bg-purple-50 text-purple-700" : r.cat === "가족" ? "bg-orange-50 text-orange-600" : r.cat === "보안" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>{r.cat}</span>
              </div>
              <div className="text-amber-400 text-sm mb-2">★★★★★</div>
              <p className="text-sm text-stone-500 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-10 mt-12 flex-wrap">
          {[{ n: "4.9/5.0", l: "만족도" }, { n: "94%", l: "재이용률" }, { n: "87%", l: "가족 추천" }].map(s => (
            <div key={s.l} className="text-center"><div className="text-2xl font-black text-green-800">{s.n}</div><div className="text-xs text-stone-400 mt-1">{s.l}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function Cta() {
  return (
    <section className="py-20 px-5" style={{ background: "linear-gradient(135deg, #2D5016, #1B3A0E)" }}>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-black text-white mb-4 leading-snug tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>부모님의 디지털 자립,<br />오늘 시작하세요</h2>
        <p className="text-white/60 mb-9">7일 무료 체험 · 카드 등록 없음 · AI 상담원 24시간 대기 중</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a href="/login" className="px-8 py-4 bg-white text-green-900 rounded-full text-base font-bold shadow-xl text-center">💬 카톡으로 시작하기</a>
          <a href="/signup" className="px-8 py-4 border-2 border-white/30 text-white rounded-full text-base font-bold text-center hover:bg-white/10 transition-all">🎁 부모님께 선물하기</a>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="py-14 px-5 bg-stone-900 text-stone-500">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4"><span className="text-2xl">🏠</span><span className="font-black text-lg text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>디지털 집사</span></div>
            <p className="text-sm leading-relaxed">AI 상담원이 대행하고, 체계적 교육으로 디지털 자립.<br />어르신 맞춤 디지털 도우미 서비스.</p>
          </div>
          <div>
            <h4 className="text-white/80 font-bold text-sm mb-4">서비스</h4>
            {["AI 대행 서비스", "교육 서비스 (12개 코스)", "요금제 안내", "이용 후기"].map(s => (<div key={s} className="text-sm mb-2.5 cursor-pointer hover:text-white transition-colors">{s}</div>))}
          </div>
          <div>
            <h4 className="text-white/80 font-bold text-sm mb-4">고객지원</h4>
            <p className="text-sm leading-loose">💬 카카오톡: 디지털집사<br />📞 080-XXX-XXXX<br />📧 help@digitalbutler.kr</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between text-xs gap-3">
          <span>© 2026 디지털 집사. All rights reserved.</span>
          <div className="flex gap-5">
            {["이용약관", "개인정보처리방침", "환불 정책"].map(s => (<span key={s} className="cursor-pointer hover:text-white">{s}</span>))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN ─── */
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problem />
      <AgencyService />
      <EducationService />
      <Pricing />
      <ForFamily />
      <Reviews />
      <Cta />
      <Footer />
    </main>
  );
}
