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
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-stone-200/60"
      style={{ background: "rgba(254,251,246,0.85)", padding: scrolled ? "10px 0" : "16px 0", transition: "padding 0.3s" }}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🏠</span>
          <span className="font-black text-xl text-green-900 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            디지털 집사
          </span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          {[["서비스 소개", "#service"], ["AI 상담원", "#ai-agent"], ["요금제", "#pricing"], ["교육", "#education"], ["후기", "#review"]].map(([label, href]) => (
            <a key={href} href={href} className="text-stone-500 text-sm font-medium hover:text-green-800 transition-colors">
              {label}
            </a>
          ))}
        </div>
        <div className="flex gap-2.5">
          <a href="/login" className="hidden sm:inline-block px-5 py-2.5 text-sm font-semibold text-green-800 border-2 border-green-800 rounded-full hover:bg-green-800 hover:text-white transition-all">
            로그인
          </a>
          <a href="/login" className="px-5 py-2.5 text-sm font-semibold text-white rounded-full shadow-lg shadow-green-900/20 transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #2D5016, #4A7C28)" }}>
            무료 체험
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO with CHAT UI ─── */
function Hero() {
  const [msgIndex, setMsgIndex] = useState(0);
  const messages = [
    { type: "user", text: "쿠팡에서 휴지 좀 주문해줘" },
    { type: "bot", text: "로켓배송 12,900원 주문 완료! 내일 도착해요 🚀", label: "🤖 AI 대행 완료" },
    { type: "user", text: "KTX 서울→부산 내일 오전" },
    { type: "bot", text: "오전 9시 KTX 예약 완료! 좌석 7A입니다 🚄", label: "🤖 AI 대행 완료" },
    { type: "user", text: "이상한 전화 왔는데 사기야?" },
    { type: "bot", text: "🚨 보이스피싱이에요! 절대 개인정보 알려주지 마세요. 가족분께 알림 보냈어요.", label: "🛡️ 보안 감지" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pt-28 pb-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FEFBF6 0%, #E8F0DE 40%, #FFF3E0 70%, #FEFBF6 100%)" }}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-green-700">AI 상담원 24시간 대기 중</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-5" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              어머니, 아버지를 위한
              <br />
              <span className="text-green-800">쿠팡 주문도, KTX 예매도</span>
              <br />
              카톡 한 줄이면 끝.
            </h1>

            <p className="text-lg text-stone-500 leading-relaxed mb-3 max-w-lg">
              50~70대 부모님이 카카오톡으로 말씀만 하시면
              <br />
              <strong className="text-green-800">AI 상담원이 즉시 대행</strong>해 드립니다.
            </p>

            <p className="text-sm text-stone-400 mb-8">
              ✦ 24시간 AI 상담원 &nbsp;&nbsp;✦ 쇼핑·예매·송금·보안 15개 분야 &nbsp;&nbsp;✦ 7일 무료 체험
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href="/login" className="px-8 py-4 text-base font-bold text-white rounded-full shadow-lg shadow-green-900/25 text-center transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #2D5016, #4A7C28)" }}>
                💬 카톡으로 시작하기
              </a>
              <a href="/signup" className="px-8 py-4 text-base font-bold text-white rounded-full shadow-lg shadow-orange-500/25 text-center transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #D4740E, #F5A623)" }}>
                🎁 부모님께 선물하기
              </a>
            </div>

            <div className="flex gap-8">
              {[{ num: "2,847", label: "이용 중" }, { num: "94%", label: "재이용률" }, { num: "4.9", label: "만족도" }].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-green-800 tracking-tight">{s.num}</div>
                  <div className="text-xs text-stone-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Chat UI (이전 포맷 유지) */}
          <div className="w-full max-w-sm">
            <div className="bg-white rounded-3xl shadow-2xl shadow-black/8 border border-stone-100 overflow-hidden">
              {/* Chat Header */}
              <div className="px-5 py-4 border-b border-stone-100 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #E8F0DE, #FEFBF6)" }}>
                <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-lg">🏠</div>
                <div className="flex-1">
                  <div className="font-bold text-sm">디지털 집사</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    AI 상담원 응답 중
                  </div>
                </div>
                <span className="text-xs text-stone-400">오후 2:30</span>
              </div>

              {/* Chat Messages */}
              <div className="px-4 py-5 space-y-3 min-h-[320px]" style={{ background: "#F8F5F0" }}>
                {messages.slice(0, msgIndex + 1).map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    style={{ animation: "fadeIn 0.4s ease-out" }}
                  >
                    {msg.type === "user" ? (
                      <div className="bg-amber-100 px-4 py-3 rounded-2xl rounded-br-sm max-w-[80%] text-sm leading-relaxed shadow-sm">
                        {msg.text}
                      </div>
                    ) : (
                      <div className="max-w-[85%]">
                        <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed shadow-sm border border-stone-100">
                          <span className="text-xs font-bold text-green-700 block mb-1">{msg.label}</span>
                          {msg.text}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="px-4 py-3 border-t border-stone-100 bg-white flex gap-2">
                <div className="flex-1 px-4 py-2.5 rounded-full bg-stone-50 text-xs text-stone-400 flex items-center">
                  메시지를 입력하세요...
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm" style={{ background: "linear-gradient(135deg, #2D5016, #4A7C28)" }}>→</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

/* ─── AI AGENT 소개 ─── */
function AiAgent() {
  return (
    <section id="ai-agent" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-green-800 bg-green-50 px-4 py-1.5 rounded-full tracking-wider">AI AGENT</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-5 mb-3 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            24시간 일하는 <span className="text-green-800">AI 상담원</span>
          </h2>
          <p className="text-stone-500 max-w-lg mx-auto leading-relaxed">
            카카오톡으로 말씀만 하시면, AI가 알아서 주문·예약·송금까지 완료해 드려요.
            <br />복잡한 건 전문 상담원이 바로 이어받습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[
            { icon: "🤖", title: "AI가 즉시 처리", desc: "쇼핑 주문, KTX 예매, 배달 주문 등 단순 대행은 AI가 수초 내 처리합니다.", tag: "응답 평균 5초", bg: "bg-green-50", tagBg: "bg-green-100 text-green-700" },
            { icon: "👨‍💼", title: "복잡한 건 전문 상담원", desc: "인증서 갱신, 전자서명, 계좌 이체 등 민감한 업무는 사람이 직접 도와드려요.", tag: "원격 화면 공유", bg: "bg-orange-50", tagBg: "bg-orange-100 text-orange-700" },
            { icon: "🛡️", title: "보안 AI 실시간 감시", desc: "보이스피싱 문자·전화를 즉시 판별하고, 위험 시 가족에게 자동 알림을 보냅니다.", tag: "가족 긴급 알림", bg: "bg-red-50", tagBg: "bg-red-100 text-red-700" },
          ].map((item, i) => (
            <div key={i} className={`${item.bg} rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300`}>
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold mb-2 tracking-tight">{item.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed mb-4">{item.desc}</p>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${item.tagBg}`}>{item.tag}</span>
            </div>
          ))}
        </div>

        {/* Before → After */}
        <div className="rounded-2xl border border-stone-100 overflow-hidden" style={{ background: "#FEFBF6" }}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 border-b md:border-b-0 md:border-r border-stone-100">
              <div className="text-xs font-bold text-red-500 mb-4">❌ AI 없이</div>
              {["앱 설치 → 회원가입 → 검색 → 장바구니 → 결제 → 배송지...", "코레일 앱 → 로그인 → 날짜 선택 → 좌석 → 결제 → 확인...", "은행 앱 → 인증서 → OTP → 비밀번호 → 이체 확인..."].map((t, i) => (
                <p key={i} className="text-sm text-stone-400 line-through mb-3 leading-relaxed">{t}</p>
              ))}
              <p className="text-xs text-red-400 font-semibold mt-2">평균 10~15단계, 30분 이상 소요</p>
            </div>
            <div className="p-8">
              <div className="text-xs font-bold text-green-700 mb-4">✅ AI 상담원</div>
              {[{ q: "\"휴지 주문해줘\"", a: "→ 1분 완료, 내일 도착" }, { q: "\"서울→부산 내일 오전\"", a: "→ KTX 예약 완료" }, { q: "\"엄마한테 10만원 보내줘\"", a: "→ 송금 완료" }].map((item, i) => (
                <div key={i} className="mb-3">
                  <span className="text-sm font-bold text-green-800">{item.q}</span>
                  <span className="text-sm text-green-600 ml-2">{item.a}</span>
                </div>
              ))}
              <p className="text-xs text-green-600 font-semibold mt-2">카톡 한 줄, 평균 1분 이내 완료</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROBLEM ─── */
function Problem() {
  const problems = [
    { emoji: "🛒", title: "온라인 쇼핑하다 포기", desc: "장바구니 담는 건 했는데... 결제가 안 돼", stat: "60대 72% 주문 포기 경험" },
    { emoji: "🏪", title: "키오스크 앞에서 당황", desc: "뒷사람 눈치에 화면은 빨리 넘어가고...", stat: "무인 매장 주문 포기율 38%" },
    { emoji: "🏦", title: "은행 앱이 너무 복잡해", desc: "비밀번호, 인증서, OTP... 송금 한 번이 전쟁", stat: "모바일뱅킹 이용률 60대 34%" },
    { emoji: "😔", title: "자녀한테 또 물어보기 미안", desc: "맨날 물어보면 귀찮아할까 봐...", stat: "시니어 67%가 자녀에게 부탁 꺼림" },
    { emoji: "🚨", title: "이 문자, 사기인지 모르겠어", desc: "택배 배송 확인하라는데 눌러도 돼?", stat: "보이스피싱 피해 60대+ 46%" },
    { emoji: "📱", title: "배워도 또 까먹어", desc: "교육 받았는데 집에 오면 기억이 안 나...", stat: "디지털 교육 후 활용률 23%" },
  ];

  return (
    <section className="py-24 px-5" style={{ background: "#FEFBF6" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-red-600 bg-red-50 px-4 py-1.5 rounded-full tracking-wider">PROBLEM</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-5 mb-3 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>이런 적 있으시죠?</h2>
          <p className="text-stone-400">2,017건 실제 고객 목소리에서 뽑았어요</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 border border-stone-100 hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl mb-3">{p.emoji}</div>
              <h3 className="text-lg font-bold mb-2 tracking-tight">{p.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed mb-3">&ldquo;{p.desc}&rdquo;</p>
              <span className="text-xs text-orange-600 font-semibold bg-orange-50 px-3 py-1.5 rounded-lg inline-block">📊 {p.stat}</span>
            </div>
          ))}
        </div>
        <p className="text-center mt-12 text-lg font-bold">이 모든 문제, <span className="text-green-800">AI 상담원</span>이 즉시 해결해 드립니다.</p>
      </div>
    </section>
  );
}

/* ─── SERVICE CATEGORIES ─── */
function ServiceSection() {
  const categories = [
    { emoji: "🛒", name: "쇼핑 주문", desc: "쿠팡·네이버·마켓컬리" },
    { emoji: "🚄", name: "KTX 예매", desc: "기차표 1분 예약" },
    { emoji: "🏦", name: "은행 송금", desc: "이체·잔액·공과금" },
    { emoji: "🔒", name: "보이스피싱", desc: "사기 즉시 판별" },
    { emoji: "🏥", name: "병원 예약", desc: "접수부터 예약까지" },
    { emoji: "🍔", name: "음식 주문", desc: "배달앱·키오스크" },
    { emoji: "📱", name: "앱 설정", desc: "설치·업데이트·삭제" },
    { emoji: "💰", name: "공과금", desc: "세금·보험·요금" },
    { emoji: "🏠", name: "관공서·민원", desc: "주민등록·증명서" },
    { emoji: "📧", name: "카톡·문자", desc: "메시지·단체방" },
    { emoji: "📸", name: "사진·영상", desc: "정리·전송·인화" },
    { emoji: "🎬", name: "영상·OTT", desc: "유튜브·넷플릭스" },
    { emoji: "📋", name: "복지·연금", desc: "신청·조회·수령" },
    { emoji: "🗺️", name: "길찾기", desc: "교통·택시·지도" },
    { emoji: "📋", name: "전자서명", desc: "인증서·서명·발급" },
  ];

  return (
    <section id="service" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-green-800 bg-green-50 px-4 py-1.5 rounded-full tracking-wider">SERVICE</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-5 mb-3 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>이런 것 <span className="text-green-800">다 돼요</span></h2>
          <p className="text-stone-500">15개 분야, 일상의 모든 디지털 문제를 AI가 해결해요</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((c, i) => (
            <div key={i} className="rounded-2xl p-5 text-center border border-stone-100 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg hover:shadow-green-900/5 transition-all duration-300 cursor-pointer" style={{ background: "#FEFBF6" }}>
              <div className="text-3xl mb-2">{c.emoji}</div>
              <div className="text-sm font-bold tracking-tight">{c.name}</div>
              <div className="text-xs text-stone-400 mt-0.5">{c.desc}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-stone-400 mt-6">이 외에도 계속 추가되고 있어요 — <strong>뭐든 물어보세요!</strong></p>
      </div>
    </section>
  );
}

/* ─── PRICING (정액제 중심) ─── */
function Pricing() {
  const plans = [
    {
      name: "라이트", price: "19,900원", period: "/월", desc: "가끔 도움이 필요해요", popular: false,
      features: ["월 10건 AI 대행 포함", "24시간 AI 상담 무제한", "보이스피싱 보안 알림", "활동 리포트", "초과 시 건당 2,000원"],
      eduNote: "✅ 전체 교육 영상 무료 포함", eduIncluded: true,
      cta: "시작하기", ctaStyle: "border-2 border-green-800 text-green-800 hover:bg-green-800 hover:text-white",
    },
    {
      name: "스탠다드", badge: "인기", price: "34,900원", period: "/월", desc: "넉넉한 대행 + 전문 상담원", popular: true,
      features: ["월 30건 AI 대행 포함", "24시간 AI 상담 무제한", "전문 상담원 화면 공유 월 2회", "보이스피싱 보안 + 가족 알림", "우선 상담", "초과 시 건당 1,500원"],
      eduNote: "✅ 전체 교육 영상 + 1:1 교육 월 2회", eduIncluded: true,
      cta: "가장 인기 있는 플랜", ctaStyle: "text-white shadow-lg shadow-green-900/25",
    },
    {
      name: "프리미엄", price: "54,900원", period: "/월", desc: "무제한 + VIP 전담", popular: false,
      features: ["무제한 AI 대행", "24시간 AI 상담 무제한", "전문 상담원 화면 공유 무제한", "VIP 전담 상담원 배정", "보이스피싱 보안 + 가족 알림", "우선 상담 + 즉시 연결"],
      eduNote: "✅ 전체 교육 영상 + 1:1 교육 포함", eduIncluded: true,
      cta: "프리미엄 시작", ctaStyle: "text-white shadow-lg shadow-orange-500/25",
    },
    {
      name: "패밀리", badge: "선물용", price: "49,900원", period: "/월", desc: "부모님께 선물하기 딱 좋은", popular: false,
      features: ["월 30건 AI 대행 포함", "24시간 AI 상담 무제한", "전문 상담원 화면 공유 월 4회", "가족 앱 연동 (활동·보안 알림)", "성취 배지 & 자녀 알림", "💝 자녀가 대신 결제·관리"],
      eduNote: "✅ 전체 교육 영상 + 성취 배지 알림", eduIncluded: true,
      cta: "🎁 선물하기", ctaStyle: "text-white shadow-lg shadow-orange-500/25",
    },
  ];

  return (
    <section id="pricing" className="py-24 px-5" style={{ background: "#FEFBF6" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-4 py-1.5 rounded-full tracking-wider">PRICING</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-5 mb-3 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>정액제로 부담 없이</h2>
          <p className="text-stone-400">모든 플랜 7일 무료 체험 · 언제든 해지 가능</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {plans.map((plan, i) => (
            <div key={i} className={`rounded-3xl bg-white p-7 relative transition-all duration-300 hover:-translate-y-1 ${plan.popular ? "border-2 border-green-800 shadow-xl shadow-green-900/10" : "border border-stone-200"}`}>
              {plan.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-3.5 py-1 rounded-full whitespace-nowrap ${plan.badge === "인기" ? "bg-green-800" : "bg-orange-500"}`}>
                  {plan.badge}
                </span>
              )}
              <h3 className="text-xl font-black tracking-tight">{plan.name}</h3>
              <p className="text-xs text-stone-400 mb-5">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-3xl font-black tracking-tight">{plan.price}</span>
                <span className="text-sm text-stone-400">{plan.period}</span>
              </div>
              <ul className="mb-4 space-y-0">
                {plan.features.map((f, j) => (
                  <li key={j} className="text-sm text-stone-500 py-2 border-b border-stone-50 leading-relaxed">
                    {f.startsWith("💝") ? f : `✓ ${f}`}
                  </li>
                ))}
              </ul>
              <div className={`text-xs font-bold px-3 py-2 rounded-lg mb-5 ${plan.eduIncluded ? "bg-purple-50 text-purple-700" : "bg-stone-50 text-stone-400"}`}>
                📚 {plan.eduNote}
              </div>
              <a href="/signup" className={`block text-center w-full py-3.5 rounded-full text-sm font-bold transition-all ${plan.ctaStyle}`}
                style={plan.popular ? { background: "linear-gradient(135deg, #2D5016, #4A7C28)" } : plan.name === "프리미엄" || plan.name === "패밀리" ? { background: "linear-gradient(135deg, #D4740E, #F5A623)" } : {}}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-7 flex-wrap">
          {["✓ 위약금 없음", "✓ 카드 등록 없이 체험", "✓ 즉시 해지 가능"].map((t) => (
            <span key={t} className="text-xs text-stone-400">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EDUCATION (서브 서비스) ─── */
function Education() {
  const courses = [
    { emoji: "🏪", title: "키오스크 정복", time: "30분", popular: true },
    { emoji: "📱", title: "스마트폰 기초", time: "1시간", popular: false },
    { emoji: "🛒", title: "쿠팡·네이버 쇼핑", time: "45분", popular: false },
    { emoji: "🏦", title: "모바일 뱅킹", time: "1시간", popular: true },
    { emoji: "🚕", title: "카카오택시·지도", time: "30분", popular: false },
    { emoji: "🔐", title: "보이스피싱 예방", time: "20분", popular: true },
  ];

  return (
    <section id="education" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-4 py-1.5 rounded-full tracking-wider">EDUCATION</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-5 mb-3 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            대행만 받지 말고, <span className="text-green-800">직접 해보세요</span>
          </h2>
          <p className="text-stone-500 max-w-lg mx-auto leading-relaxed">
            어르신 눈높이 맞춤 영상으로 혼자서도 할 수 있게 도와드려요.
            <br /><strong className="text-purple-700">모든 요금제에서 무료 제공!</strong>
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {courses.map((c, i) => (
            <div key={i} className="rounded-2xl p-5 text-center border border-stone-100 hover:-translate-y-1 transition-all duration-300 relative" style={{ background: "#FEFBF6" }}>
              {c.popular && <span className="absolute top-2 right-2 text-xs">🔥</span>}
              <div className="text-3xl mb-2">{c.emoji}</div>
              <div className="text-sm font-bold tracking-tight">{c.title}</div>
              <div className="text-xs text-stone-400 mt-1">⏱ {c.time}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: "🎥", title: "큰 글씨 영상", desc: "천천히, 손 클로즈업 화면" },
            { icon: "📞", title: "1:1 화면 공유", desc: "상담원이 함께 보며 안내" },
            { icon: "🔄", title: "무한 반복", desc: "까먹어도 다시 볼 수 있어요" },
            { icon: "🏆", title: "성취 알림", desc: "\"엄마가 혼자 송금 성공!\"" },
          ].map((f, i) => (
            <div key={i} className="bg-purple-50/50 rounded-2xl p-6 text-center">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="text-sm font-bold tracking-tight">{f.title}</div>
              <div className="text-xs text-stone-500 mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="#pricing" className="inline-block px-8 py-3.5 text-sm font-bold text-purple-700 border-2 border-purple-300 rounded-full hover:bg-purple-700 hover:text-white transition-all">
            📚 요금제 보고 시작하기 →
          </a>
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
            <h3 className="text-lg font-bold mb-5 tracking-tight">👶 자녀가 구독료 내는 이유</h3>
            {[
              { icon: "⏰", text: "부모님 전화 1번 = 평균 20~30분. 월 3만원으로 그 시간을 삽니다." },
              { icon: "🛡️", text: "보이스피싱 방어 창구가 생겨요. 60대+ 피해 36%는 실제 공포." },
              { icon: "🎁", text: "명절 선물로 완벽. 홍삼보다 실용적이에요." },
              { icon: "🎉", text: "\"엄마가 혼자 쿠팡 주문했어요!\" 성취 알림에 뿌듯해져요." },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 mb-4">
                <span className="text-lg">{item.icon}</span>
                <p className="text-sm text-stone-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-8 border border-stone-100">
            <h3 className="text-lg font-bold mb-5 tracking-tight">📊 가족 앱에서 한눈에</h3>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-xs text-green-600 font-bold mb-1">🎉 성취 알림 · 방금</div>
                <p className="text-sm font-semibold">엄마가 처음으로 혼자 네이버 쇼핑 주문하셨어요!</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-xs text-blue-600 font-bold mb-1">📊 주간 리포트 · 1시간 전</div>
                <p className="text-sm font-semibold">이번 주: AI 대행 5회, 교육 영상 2개 시청</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <div className="text-xs text-red-600 font-bold mb-1">🚨 보안 알림 · 어제</div>
                <p className="text-sm font-semibold">보이스피싱 의심 문자 감지 → 자동 차단 완료</p>
              </div>
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
    { name: "김순자", age: 67, type: "본인 이용", cat: "AI 대행", text: "카톡 한 줄에 쿠팡 주문 완료! 30분 넘게 헤매던 게 이제 1분이면 끝나요.", emoji: "👵" },
    { name: "이영호", age: 72, type: "본인 이용", cat: "AI 대행", text: "KTX 예매를 항상 아들한테 부탁했는데, AI가 대신 해주니까 이제 안 미안해요.", emoji: "👴" },
    { name: "박미경", age: 58, type: "본인 이용", cat: "보안", text: "보이스피싱 문자 올 때마다 AI한테 물어봐요. 즉시 알려주니까 마음이 편해요.", emoji: "👩‍🦳" },
    { name: "정수현", age: 35, type: "부모님 선물", cat: "가족", text: "엄마한테 선물했는데 일주일 만에 '혼자 쿠팡 주문했어!' 연락이 왔어요.", emoji: "👩" },
    { name: "최진우", age: 41, type: "부모님 선물", cat: "교육", text: "아버지가 교육 영상 보면서 카카오택시 혼자 부르셨대요. 뿌듯해하시더라고요.", emoji: "👨" },
    { name: "한지영", age: 62, type: "본인 이용", cat: "AI 대행", text: "키오스크 앞에서 당황했는데, AI가 화면 보면서 알려줘요. 이제 혼자 주문해요!", emoji: "👵" },
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
                  <div>
                    <div className="font-bold text-sm">{r.name} ({r.age}세)</div>
                    <div className="text-xs text-stone-400">{r.type}</div>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${r.cat === "교육" ? "bg-purple-50 text-purple-700" : r.cat === "가족" ? "bg-orange-50 text-orange-600" : r.cat === "보안" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>{r.cat}</span>
              </div>
              <div className="text-amber-400 text-sm mb-2">★★★★★</div>
              <p className="text-sm text-stone-500 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-10 mt-12 flex-wrap">
          {[{ num: "4.9/5.0", label: "만족도" }, { num: "94%", label: "재이용률" }, { num: "87%", label: "가족 추천" }].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-green-800 tracking-tight">{s.num}</div>
              <div className="text-xs text-stone-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CtaSection() {
  return (
    <section className="py-20 px-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #2D5016, #1B3A0E)" }}>
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-3xl font-black text-white mb-4 leading-snug tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
          부모님의 디지털 자립,<br />오늘 시작하세요
        </h2>
        <p className="text-white/60 mb-9 leading-relaxed">7일 무료 체험 · 카드 등록 없음 · 1분이면 시작<br />AI 상담원이 24시간 기다리고 있어요</p>
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
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-2xl">🏠</span>
              <span className="font-black text-lg text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>디지털 집사</span>
            </div>
            <p className="text-sm leading-relaxed">AI + 사람이 함께하는 어르신 맞춤 디지털 도우미<br />AI 상담원이 대행하고, 교육으로 디지털 자립</p>
          </div>
          <div>
            <h4 className="text-white/80 font-bold text-sm mb-4">서비스</h4>
            {["AI 대행 서비스", "교육 서비스", "요금제 안내", "이용 후기"].map((s) => (
              <div key={s} className="text-sm mb-2.5 cursor-pointer hover:text-white transition-colors">{s}</div>
            ))}
          </div>
          <div>
            <h4 className="text-white/80 font-bold text-sm mb-4">고객지원</h4>
            <p className="text-sm leading-loose">💬 카카오톡: 디지털집사<br />📞 080-XXX-XXXX<br />📧 help@digitalbutler.kr</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between text-xs gap-3">
          <span>© 2026 디지털 집사. All rights reserved.</span>
          <div className="flex gap-5">
            <span className="cursor-pointer hover:text-white">이용약관</span>
            <span className="cursor-pointer hover:text-white">개인정보처리방침</span>
            <span className="cursor-pointer hover:text-white">환불 정책</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN PAGE ─── */
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <AiAgent />
      <Problem />
      <ServiceSection />
      <Pricing />
      <Education />
      <ForFamily />
      <Reviews />
      <CtaSection />
      <Footer />
    </main>
  );
}
