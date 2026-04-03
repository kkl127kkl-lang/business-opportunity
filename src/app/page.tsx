"use client";

import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════
   디지털 집사 — AI 상담원 기반 대행 서비스 (메인)
   + 체계적 교육 서비스 (서브, 정액제 가입 시 무료)
   ══════════════════════════════════════════════════ */

/* ─── NAV ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-stone-200/60"
      style={{ background: "rgba(254,251,246,0.88)", padding: scrolled ? "10px 0" : "16px 0", transition: "padding 0.3s" }}>
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <span className="text-2xl">🏠</span>
          <span className="font-black text-xl text-green-900 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>디지털 집사</span>
        </a>
        <div className="hidden md:flex gap-8 items-center">
          {[["어떻게 도와주나요", "#how"], ["AI 상담원", "#ai"], ["요금제", "#pricing"], ["교육", "#edu"], ["후기", "#review"]].map(([l, h]) => (
            <a key={h} href={h} className="text-stone-500 text-sm font-medium hover:text-green-800 transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex gap-2.5">
          <a href="/login" className="hidden sm:inline-block px-5 py-2.5 text-sm font-semibold text-green-800 border-2 border-green-800 rounded-full hover:bg-green-800 hover:text-white transition-all">로그인</a>
          <a href="/login" className="px-5 py-2.5 text-sm font-semibold text-white rounded-full shadow-lg shadow-green-900/20 hover:-translate-y-0.5 transition-all"
            style={{ background: "linear-gradient(135deg, #2D5016, #4A7C28)" }}>무료 체험</a>
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO — 감성 카피 + 채팅 UI ─── */
function Hero() {
  const [idx, setIdx] = useState(0);
  const msgs = [
    { t: "user", text: "쿠팡에서 휴지 좀 주문해줘" },
    { t: "bot", text: "코코 3겹 30롤 12,900원 로켓배송 주문 완료!\n내일 오전 도착 예정이에요 🚀", label: "🤖 AI 상담원" },
    { t: "user", text: "KTX 서울→부산 내일 오전" },
    { t: "bot", text: "내일 오전 9시 KTX 1매 예약 완료!\n좌석 7호차 12A (창측) 🚄", label: "🤖 AI 상담원" },
    { t: "user", text: "이상한 전화 왔는데 사기야?" },
    { t: "bot", text: "🚨 보이스피싱이에요!\n절대 개인정보 알려주지 마세요.\n가족분(정수현 님)께 긴급 알림 보냈어요.", label: "🛡️ 보안 AI" },
  ];

  useEffect(() => {
    const t = setInterval(() => setIdx(p => p < msgs.length - 1 ? p + 1 : p), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="pt-32 pb-20 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FEFBF6 0%, #E8F0DE 35%, #FFF3E0 65%, #FEFBF6 100%)" }}>
      {/* Decorative circles */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #2D5016, transparent)" }} />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, #D4740E, transparent)" }} />

      <div className="max-w-6xl mx-auto px-5 flex flex-col lg:flex-row gap-14 items-center relative">
        {/* Left — Copy */}
        <div className="flex-1 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-green-50/80 backdrop-blur-sm px-4 py-2 rounded-full mb-7 border border-green-100">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-green-700">지금 2,847명이 이용 중 · AI 상담원 24시간 대기</span>
          </div>

          <h1 className="text-[2.6rem] lg:text-[3.2rem] font-black leading-[1.2] tracking-tight mb-6"
            style={{ fontFamily: "'Noto Serif KR', serif" }}>
            어머니, 아버지를 위한
            <br />
            <span className="text-green-800">쿠팡 주문도, KTX 예매도</span>
            <br />
            <span className="relative">
              카톡 한 줄이면 끝.
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                <path d="M0 6C40 2 80 2 100 4C120 6 160 6 200 2" stroke="#D4740E" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
              </svg>
            </span>
          </h1>

          <p className="text-lg text-stone-600 leading-relaxed mb-2 max-w-md">
            50~70대 부모님이 카카오톡으로 말씀만 하시면
          </p>
          <p className="text-lg font-bold text-green-800 mb-8 max-w-md">
            AI 상담원이 5분 안에 해결해 드립니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <a href="/login"
              className="px-9 py-4 text-base font-bold text-white rounded-full shadow-xl shadow-green-900/20 text-center hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #2D5016, #4A7C28)" }}>
              💬 카톡으로 시작하기
            </a>
            <a href="/signup"
              className="px-9 py-4 text-base font-bold text-white rounded-full shadow-xl shadow-orange-500/20 text-center hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #D4740E, #F5A623)" }}>
              🎁 부모님께 선물하기
            </a>
          </div>

          <div className="flex gap-10">
            {[{ n: "2,847명", l: "현재 이용 중" }, { n: "94%", l: "재이용률" }, { n: "4.9점", l: "만족도 (5점 만점)" }].map(s => (
              <div key={s.l}>
                <div className="text-xl font-black text-green-800 tracking-tight">{s.n}</div>
                <div className="text-xs text-stone-400 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>

          <p className="text-xs text-stone-400 mt-6">✓ 7일 무료 체험 · ✓ 24시간 AI 상담원 · ✓ 개인정보 안전 보호</p>
        </div>

        {/* Right — Chat UI (원본 포맷 유지) */}
        <div className="w-full max-w-[380px] lg:flex-shrink-0">
          <div className="bg-white rounded-3xl shadow-2xl shadow-black/[0.06] border border-stone-100/80 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 flex items-center gap-3 border-b border-stone-100"
              style={{ background: "linear-gradient(135deg, #E8F0DE 0%, #FEFBF6 100%)" }}>
              <div className="w-11 h-11 rounded-full bg-green-800 flex items-center justify-center text-xl shadow-lg shadow-green-900/20">🏠</div>
              <div className="flex-1">
                <div className="font-bold text-sm tracking-tight">디지털 집사</div>
                <div className="text-xs text-green-600 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  AI 상담원 응답 중
                </div>
              </div>
              <span className="text-[11px] text-stone-400">오후 2:30</span>
            </div>

            {/* Messages */}
            <div className="px-4 py-5 space-y-3 min-h-[340px]" style={{ background: "linear-gradient(180deg, #F8F5F0 0%, #F5F2ED 100%)" }}>
              {msgs.slice(0, idx + 1).map((m, i) => (
                <div key={i} className={`flex ${m.t === "user" ? "justify-end" : "justify-start"}`}
                  style={{ animation: "msgIn 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
                  {m.t === "user" ? (
                    <div className="bg-amber-100/90 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-br-sm max-w-[78%] text-[13px] leading-relaxed shadow-sm">
                      {m.text}
                    </div>
                  ) : (
                    <div className="max-w-[85%]">
                      <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm text-[13px] leading-relaxed shadow-sm border border-stone-100/80">
                        <span className="text-[11px] font-bold text-green-700 block mb-1.5">{m.label}</span>
                        {m.text.split("\n").map((line, j) => <span key={j}>{line}<br /></span>)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-stone-100 bg-white flex gap-2">
              <div className="flex-1 px-4 py-2.5 rounded-full bg-stone-50 text-[12px] text-stone-400 flex items-center">
                무엇이든 물어보세요...
              </div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm shadow-md"
                style={{ background: "linear-gradient(135deg, #2D5016, #4A7C28)" }}>→</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
}

/* ─── 사회적 증거 (Social Proof Bar) ─── */
function SocialProof() {
  return (
    <section className="py-6 bg-white border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-5 flex flex-wrap justify-center gap-x-10 gap-y-3">
        {[
          "📰 서울디지털재단 2024 조사: \"시니어 74%가 디지털 도움 필요\"",
          "🏆 고객 만족도 4.9/5.0",
          "🔒 개인정보보호 인증",
        ].map((t, i) => (
          <span key={i} className="text-xs text-stone-400 font-medium">{t}</span>
        ))}
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS — 3단계 ─── */
function HowItWorks() {
  return (
    <section id="how" className="py-24 px-5 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-green-800 bg-green-50 px-4 py-1.5 rounded-full tracking-wider">HOW IT WORKS</span>
          <h2 className="text-3xl lg:text-[2.5rem] font-black mt-6 mb-4 tracking-tight leading-snug"
            style={{ fontFamily: "'Noto Serif KR', serif" }}>
            복잡한 건 없어요.<br /><span className="text-green-800">딱 3단계면 끝.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01", icon: "💬", title: "카톡으로 말하기",
              desc: "\"휴지 주문해줘\", \"KTX 예매해줘\"\n카카오톡에 한 줄만 보내세요.\n앱 설치도, 회원가입도 필요 없어요.",
              highlight: "10초면 충분",
            },
            {
              step: "02", icon: "🤖", title: "AI 상담원이 처리",
              desc: "AI가 즉시 알아듣고 주문·예약·송금까지 대신 처리해요.\n복잡한 건 전문 상담원이 바로 이어받습니다.",
              highlight: "평균 5분 내 완료",
            },
            {
              step: "03", icon: "✅", title: "결과 확인",
              desc: "\"주문 완료!\", \"예약 완료!\"\n카톡으로 결과를 바로 알려드려요.\n가족에게도 자동 알림이 갑니다.",
              highlight: "가족 동시 알림",
            },
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="text-[80px] font-black text-stone-100 absolute -top-4 -left-2 leading-none select-none">{item.step}</div>
              <div className="relative bg-white rounded-2xl p-8 border border-stone-100 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-green-900/5">
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">{item.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed mb-4 whitespace-pre-line">{item.desc}</p>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">{item.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-stone-400 text-sm mb-5">이게 전부예요. 복잡한 앱도, 어려운 기계도 필요 없습니다.</p>
          <a href="/login" className="inline-block px-8 py-4 text-base font-bold text-white rounded-full shadow-lg shadow-green-900/20 hover:-translate-y-0.5 transition-all"
            style={{ background: "linear-gradient(135deg, #2D5016, #4A7C28)" }}>
            💬 지금 바로 체험하기 — 7일 무료
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── AI AGENT 상세 ─── */
function AiSection() {
  return (
    <section id="ai" className="py-24 px-5" style={{ background: "#FEFBF6" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-green-800 bg-green-50 px-4 py-1.5 rounded-full tracking-wider">AI 상담원</span>
          <h2 className="text-3xl lg:text-[2.5rem] font-black mt-6 mb-4 tracking-tight leading-snug"
            style={{ fontFamily: "'Noto Serif KR', serif" }}>
            24시간 잠들지 않는<br /><span className="text-green-800">당신만의 디지털 비서</span>
          </h2>
          <p className="text-stone-500 max-w-lg mx-auto leading-relaxed">
            &ldquo;자식한테 미안하지 않아도 되는, 나만의 디지털 비서&rdquo;<br />
            — 실제 이용자 김순자 님(67세)
          </p>
        </div>

        {/* 3 pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {[
            {
              icon: "🤖", title: "AI가 5초 만에 응답",
              desc: "쇼핑 주문, KTX 예매, 배달 주문, 택시 호출 등 일상 대행은 AI가 수초 내 처리합니다. 새벽 3시에도, 명절 아침에도.",
              tag: "24시간 365일", bg: "bg-green-50", tagBg: "bg-green-100 text-green-700",
              detail: "응답 평균 5초 · 처리 평균 1분 · 야간 가능"
            },
            {
              icon: "👨‍💼", title: "복잡한 건 사람이 직접",
              desc: "공인인증서 갱신, 전자서명, 모바일뱅킹 설정 등 민감한 업무는 전문 상담원이 화면을 함께 보면서 도와드려요.",
              tag: "원격 화면 공유", bg: "bg-orange-50", tagBg: "bg-orange-100 text-orange-700",
              detail: "평일 09~21시 · 화면 공유 · 녹화 제공"
            },
            {
              icon: "🛡️", title: "보이스피싱, AI가 먼저 잡아",
              desc: "의심스러운 문자·전화를 보내주시면 즉시 판별해 드려요. 위험하면 가족에게 자동 긴급 알림까지.",
              tag: "평균 피해 1,800만원 예방", bg: "bg-red-50", tagBg: "bg-red-100 text-red-700",
              detail: "실시간 판별 · 가족 알림 · 차단 안내"
            },
          ].map((item, i) => (
            <div key={i} className={`${item.bg} rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl`}>
              <div className="text-4xl mb-5">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">{item.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed mb-5">{item.desc}</p>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${item.tagBg} block w-fit mb-3`}>{item.tag}</span>
              <p className="text-[11px] text-stone-400">{item.detail}</p>
            </div>
          ))}
        </div>

        {/* 15개 분야 */}
        <div className="rounded-2xl p-8 bg-white border border-stone-100">
          <h3 className="text-lg font-bold text-center mb-6 tracking-tight">이런 것 <span className="text-green-800">다</span> 돼요 — 15개 분야</h3>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { e: "🛒", n: "쇼핑 주문" }, { e: "🚄", n: "KTX 예매" }, { e: "🏦", n: "은행 송금" },
              { e: "🔒", n: "보이스피싱" }, { e: "🏥", n: "병원 예약" }, { e: "🍔", n: "배달 주문" },
              { e: "📱", n: "앱 설정" }, { e: "💰", n: "공과금" }, { e: "🏠", n: "관공서 민원" },
              { e: "💬", n: "카톡·문자" }, { e: "📸", n: "사진·영상" }, { e: "🎬", n: "유튜브·OTT" },
              { e: "📋", n: "복지·연금" }, { e: "🗺️", n: "길찾기·택시" }, { e: "📋", n: "전자서명" },
            ].map((c, i) => (
              <div key={i} className="rounded-xl p-3 text-center hover:bg-green-50 hover:-translate-y-0.5 transition-all cursor-default">
                <div className="text-2xl mb-1">{c.e}</div>
                <div className="text-xs font-semibold text-stone-600">{c.n}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-stone-400 mt-5">이 외에도 계속 추가되고 있어요 — <strong>뭐든 카톡으로 물어보세요</strong></p>
        </div>

        {/* Before → After */}
        <div className="mt-10 rounded-2xl overflow-hidden border border-stone-100">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 bg-stone-50">
              <div className="text-xs font-bold text-red-500 mb-5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-[10px]">✕</span>
                AI 상담원 없이
              </div>
              {[
                { task: "쿠팡 주문", steps: "앱 설치 → 가입 → 검색 → 장바구니 → 결제 → 배송지 입력", time: "30분+" },
                { task: "KTX 예매", steps: "코레일 앱 → 가입 → 날짜 → 시간 → 좌석 → 결제", time: "20분+" },
                { task: "모바일 송금", steps: "은행앱 → 인증서 → OTP → 비밀번호 → 이체확인", time: "15분+" },
              ].map((item, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="text-sm font-semibold text-stone-600 mb-1">{item.task}</div>
                  <p className="text-xs text-stone-400 line-through leading-relaxed">{item.steps}</p>
                  <span className="text-[11px] text-red-400 font-semibold">{item.time} 소요</span>
                </div>
              ))}
            </div>
            <div className="p-8 bg-green-50/50">
              <div className="text-xs font-bold text-green-700 mb-5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-[10px]">✓</span>
                AI 상담원에게 카톡 한 줄
              </div>
              {[
                { q: "\"휴지 주문해줘\"", a: "→ 12,900원 주문 완료! 내일 도착", time: "1분" },
                { q: "\"서울→부산 내일 오전\"", a: "→ 9시 KTX 예약 완료! 좌석 7A", time: "1분" },
                { q: "\"엄마한테 10만원\"", a: "→ 100,000원 송금 완료!", time: "30초" },
              ].map((item, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="text-sm font-bold text-green-800 mb-0.5">{item.q}</div>
                  <p className="text-sm text-green-700">{item.a}</p>
                  <span className="text-[11px] text-green-600 font-semibold">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROBLEM — 감성적 고통 포인트 ─── */
function Problem() {
  return (
    <section className="py-24 px-5 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-[2.5rem] font-black tracking-tight leading-snug"
            style={{ fontFamily: "'Noto Serif KR', serif" }}>
            &ldquo;나 때문에 자식이 힘들겠지...&rdquo;
          </h2>
          <p className="text-stone-400 mt-4 max-w-md mx-auto leading-relaxed">
            겉으로는 &ldquo;필요 없다&rdquo;고 말하지만,<br />속으로는 간절히 원하고 계세요.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { icon: "🏦", voice: "비밀번호, 인증서, OTP... 송금 한 번이 이렇게 어려운 줄 몰랐어", pain: "모바일뱅킹 이용률 60대 34%", cost: "은행 왕복 교통비+시간 연 36만원 낭비", severity: "최상" },
            { icon: "🚨", voice: "검찰이라며 전화가 왔는데... 물어볼 곳이 없어", pain: "60대+ 보이스피싱 피해 46%", cost: "평균 피해액 1,800만원", severity: "최상" },
            { icon: "🏪", voice: "키오스크 앞에서 줄 막아서 뒷사람 눈치가...", pain: "어르신 70%가 키오스크 불편 호소", cost: "좋아하던 식당·카페 포기", severity: "상" },
            { icon: "🏥", voice: "전화 예약은 30분 대기인데, 앱은 가입부터 막혀", pain: "60대 온라인 예약 실패율 58%", cost: "급한 진료를 미루다 악화", severity: "상" },
            { icon: "😔", voice: "맨날 물어보면 귀찮아할까 봐... 혼자 끙끙 앓아", pain: "시니어 67%가 자녀 부탁 꺼림", cost: "가족 관계까지 영향", severity: "상" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-5 p-6 rounded-2xl border border-stone-100 hover:border-green-200 transition-all"
              style={{ background: "#FEFBF6" }}>
              <span className="text-3xl flex-shrink-0 mt-1">{item.icon}</span>
              <div className="flex-1">
                <p className="text-base font-semibold text-stone-700 mb-2 leading-relaxed">&ldquo;{item.voice}&rdquo;</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-stone-100 text-stone-500">{item.pain}</span>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-red-50 text-red-600">{item.cost}</span>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${item.severity === "최상" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>절박도 {item.severity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg font-black text-stone-800 mb-2">이 모든 문제,</p>
          <p className="text-2xl font-black tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            <span className="text-green-800">AI 상담원</span>이 오늘부터 해결해 드립니다.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING — 정액제 ─── */
function Pricing() {
  const plans = [
    {
      name: "라이트", price: "19,900", period: "원/월", desc: "가끔 도움받고 싶어요", popular: false,
      badge: null,
      features: [
        { text: "월 10건 AI 대행", bold: true },
        { text: "24시간 AI 상담 무제한", bold: false },
        { text: "보이스피싱 보안 알림", bold: false },
        { text: "활동 리포트", bold: false },
        { text: "초과 시 건당 2,000원", bold: false },
      ],
      edu: "교육 영상 별도 (개별 구매)", eduIncluded: false,
      cta: "시작하기", gradient: "",
    },
    {
      name: "스탠다드", price: "34,900", period: "원/월", desc: "넉넉하게, 교육까지 무료로", popular: true,
      badge: "가장 인기",
      features: [
        { text: "월 25건 AI 대행", bold: true },
        { text: "24시간 AI 상담 무제한", bold: false },
        { text: "전문 상담원 화면 공유 월 2회", bold: true },
        { text: "보이스피싱 보안 + 가족 알림", bold: false },
        { text: "우선 상담 (대기 없음)", bold: false },
        { text: "초과 시 건당 1,500원", bold: false },
      ],
      edu: "✅ 전체 교육 영상·코스 무료 포함", eduIncluded: true,
      cta: "가장 인기 있는 플랜", gradient: "linear-gradient(135deg, #2D5016, #4A7C28)",
    },
    {
      name: "프리미엄", price: "54,900", period: "원/월", desc: "무제한 + VIP 전담 상담원", popular: false,
      badge: null,
      features: [
        { text: "무제한 AI 대행", bold: true },
        { text: "24시간 AI 상담 무제한", bold: false },
        { text: "VIP 전담 상담원 배정", bold: true },
        { text: "전문 상담원 화면 공유 무제한", bold: true },
        { text: "보이스피싱 보안 + 가족 알림", bold: false },
        { text: "즉시 연결 (VIP 전용 라인)", bold: false },
      ],
      edu: "✅ 전체 교육 + 1:1 맞춤 교육 포함", eduIncluded: true,
      cta: "프리미엄 시작", gradient: "linear-gradient(135deg, #1a1a1a, #333)",
    },
    {
      name: "패밀리", price: "49,900", period: "원/월", desc: "부모님께 선물하기 딱 좋은", popular: false,
      badge: "🎁 선물용",
      features: [
        { text: "월 25건 AI 대행", bold: true },
        { text: "24시간 AI 상담 무제한", bold: false },
        { text: "전문 상담원 화면 공유 월 4회", bold: true },
        { text: "가족 앱 연동 (활동·보안 알림)", bold: true },
        { text: "성취 배지 & 자녀 알림", bold: false },
        { text: "💝 자녀가 대신 결제·관리", bold: false },
      ],
      edu: "✅ 전체 교육 영상·코스 무료 포함", eduIncluded: true,
      cta: "🎁 부모님께 선물하기", gradient: "linear-gradient(135deg, #D4740E, #F5A623)",
    },
  ];

  return (
    <section id="pricing" className="py-24 px-5" style={{ background: "#FEFBF6" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-4 py-1.5 rounded-full tracking-wider">PRICING</span>
          <h2 className="text-3xl lg:text-[2.5rem] font-black mt-6 mb-4 tracking-tight leading-snug"
            style={{ fontFamily: "'Noto Serif KR', serif" }}>
            월 <span className="text-green-800">19,900원</span>부터.<br />하루 660원으로 모든 디지털 걱정 끝.
          </h2>
          <p className="text-stone-400">모든 플랜 7일 무료 체험 · 언제든 해지 가능</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {plans.map((p, i) => (
            <div key={i} className={`rounded-3xl bg-white p-7 relative hover:-translate-y-2 transition-all duration-300 ${p.popular ? "border-2 border-green-800 shadow-xl shadow-green-900/10 scale-[1.02]" : "border border-stone-200"}`}>
              {p.badge && <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap shadow-lg ${p.badge.includes("인기") ? "bg-green-800" : "bg-orange-500"}`}>{p.badge}</span>}
              <h3 className="text-xl font-black tracking-tight">{p.name}</h3>
              <p className="text-xs text-stone-400 mb-4">{p.desc}</p>
              <div className="mb-6">
                <span className="text-[2rem] font-black tracking-tight">{p.price}</span>
                <span className="text-sm text-stone-400">{p.period}</span>
              </div>
              <ul className="mb-4">
                {p.features.map((f, j) => (
                  <li key={j} className={`text-sm py-2 border-b border-stone-50 leading-relaxed ${f.bold ? "text-stone-700 font-semibold" : "text-stone-500"}`}>
                    {f.text.startsWith("💝") ? f.text : `✓ ${f.text}`}
                  </li>
                ))}
              </ul>
              {/* 교육 포함 여부 */}
              <div className={`text-xs font-bold px-3 py-2.5 rounded-xl mb-5 ${p.eduIncluded ? "bg-purple-50 text-purple-700 border border-purple-100" : "bg-stone-50 text-stone-400"}`}>
                📚 {p.edu}
              </div>
              <a href="/signup"
                className={`block text-center w-full py-3.5 rounded-full text-sm font-bold transition-all ${p.gradient ? "text-white shadow-lg hover:-translate-y-0.5" : "border-2 border-green-800 text-green-800 hover:bg-green-800 hover:text-white"}`}
                style={p.gradient ? { background: p.gradient } : {}}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6 mt-8 flex-wrap">
          {["✓ 위약금 없음", "✓ 카드 등록 없이 체험", "✓ 즉시 해지 가능"].map(t => (
            <span key={t} className="text-xs text-stone-400">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EDUCATION — 체계적 교육 (서브 서비스) ─── */
function Education() {
  const [level, setLevel] = useState("all");
  const courses = [
    { e: "📱", title: "스마트폰 완전 기초", desc: "전원·와이파이·전화·문자·카톡", lv: "입문", time: "1시간", steps: 8, hot: false, must: true },
    { e: "🏪", title: "키오스크 완전 정복", desc: "맥도날드·카페·은행 실전 연습", lv: "입문", time: "40분", steps: 6, hot: true, must: false },
    { e: "🔐", title: "보이스피싱 완벽 예방", desc: "사기 문자·전화 구별법 + 대처법", lv: "입문", time: "25분", steps: 4, hot: false, must: true },
    { e: "🏦", title: "모바일뱅킹 마스터", desc: "조회·송금·공과금·자동이체", lv: "활용", time: "1시간", steps: 8, hot: true, must: false },
    { e: "🛒", title: "온라인 쇼핑 A to Z", desc: "검색→주문→결제→교환반품", lv: "활용", time: "50분", steps: 7, hot: false, must: false },
    { e: "🏥", title: "병원 예약앱 정복", desc: "카카오·네이버로 1분 예약", lv: "활용", time: "30분", steps: 5, hot: true, must: false },
    { e: "🚕", title: "카카오택시·네이버지도", desc: "택시 호출·길찾기·대중교통", lv: "활용", time: "30분", steps: 5, hot: false, must: false },
    { e: "🍔", title: "배달앱 주문하기", desc: "배민·쿠팡이츠 메뉴→결제→추적", lv: "활용", time: "30분", steps: 5, hot: false, must: false },
    { e: "📋", title: "공인인증서·전자서명", desc: "갱신·설치·서명까지 집에서", lv: "심화", time: "40분", steps: 6, hot: false, must: false },
    { e: "🏠", title: "정부24·민원 서비스", desc: "등본·납세증명 온라인 발급", lv: "심화", time: "30분", steps: 5, hot: false, must: false },
    { e: "📸", title: "사진·영상 관리", desc: "정리·전송·백업·인화 주문", lv: "심화", time: "40분", steps: 6, hot: false, must: false },
    { e: "🎬", title: "유튜브·넷플릭스 즐기기", desc: "검색·재생·구독·TV 연결", lv: "심화", time: "30분", steps: 5, hot: false, must: false },
  ];

  const filtered = level === "all" ? courses : courses.filter(c => c.lv === level);
  const lvColor: Record<string, string> = { "입문": "bg-green-50 text-green-700", "활용": "bg-blue-50 text-blue-700", "심화": "bg-purple-50 text-purple-700" };

  return (
    <section id="edu" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-4 py-1.5 rounded-full tracking-wider">EDUCATION</span>
          <h2 className="text-3xl lg:text-[2.5rem] font-black mt-6 mb-4 tracking-tight leading-snug"
            style={{ fontFamily: "'Noto Serif KR', serif" }}>
            대행만 받지 마세요.<br /><span className="text-green-800">혼자서도 할 수 있게</span> 도와드려요.
          </h2>
          <p className="text-stone-500 max-w-lg mx-auto leading-relaxed">
            어르신 눈높이 영상 + 1:1 화면 공유 교육 12개 코스.
            <br /><strong className="text-purple-700">스탠다드 이상 요금제에서 전체 무료!</strong>
          </p>
        </div>

        {/* 3단계 */}
        <div className="grid grid-cols-3 gap-3 mb-6 max-w-lg mx-auto">
          {[
            { lv: "입문", icon: "🌱", desc: "기초·키오스크·보안" },
            { lv: "활용", icon: "📱", desc: "뱅킹·쇼핑·병원·택시" },
            { lv: "심화", icon: "🚀", desc: "인증서·민원·영상" },
          ].map(l => (
            <div key={l.lv} className="rounded-xl p-3 text-center border border-stone-100 bg-white">
              <div className="text-lg">{l.icon}</div>
              <div className="text-sm font-bold">{l.lv}</div>
              <div className="text-[11px] text-stone-400">{l.desc}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {[{ id: "all", l: "전체 12개" }, { id: "입문", l: "🌱 입문" }, { id: "활용", l: "📱 활용" }, { id: "심화", l: "🚀 심화" }].map(f => (
            <button key={f.id} onClick={() => setLevel(f.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${level === f.id ? "bg-green-800 text-white shadow-lg" : "bg-white text-stone-500 border border-stone-200"}`}>{f.l}</button>
          ))}
        </div>

        {/* Course cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {filtered.map((c, i) => (
            <div key={i} className="rounded-2xl p-6 border border-stone-100 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden" style={{ background: "#FEFBF6" }}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{c.e}</span>
                <div className="flex gap-1.5">
                  {c.must && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-600">필수</span>}
                  {c.hot && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-50 text-orange-600">🔥인기</span>}
                </div>
              </div>
              <h4 className="text-base font-bold mb-1 tracking-tight">{c.title}</h4>
              <p className="text-sm text-stone-500 mb-4">{c.desc}</p>
              <div className="flex gap-2 flex-wrap">
                <span className={`text-[11px] px-2 py-0.5 rounded font-semibold ${lvColor[c.lv]}`}>{c.lv}</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-stone-50 text-stone-500 font-semibold">⏱ {c.time}</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-stone-50 text-stone-500 font-semibold">{c.steps}단계</span>
              </div>
            </div>
          ))}
        </div>

        {/* 교육 방식 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🎥", title: "큰 글씨 영상", desc: "천천히, 실제 화면 그대로" },
            { icon: "📞", title: "1:1 화면 공유", desc: "상담원이 함께 보며 안내" },
            { icon: "🔄", title: "무한 반복", desc: "까먹어도 다시 보면 돼요" },
            { icon: "🏆", title: "성취 배지", desc: "\"엄마가 혼자 성공!\" 알림" },
          ].map((f, i) => (
            <div key={i} className="bg-purple-50/40 rounded-xl p-5 text-center">
              <div className="text-xl mb-1.5">{f.icon}</div>
              <div className="text-sm font-bold">{f.title}</div>
              <div className="text-[11px] text-stone-500 mt-0.5">{f.desc}</div>
            </div>
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
          <h2 className="text-3xl lg:text-[2.5rem] font-black mt-6 mb-2 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            이번 추석엔 홍삼 대신,<br /><span className="text-orange-600">디지털 집사</span>를 선물하세요.
          </h2>
          <p className="text-stone-400 mt-3">부모님 전화 1번 = 평균 20~30분. 월 3만원으로 그 시간을 사세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 border border-stone-100 shadow-sm">
            <h3 className="text-lg font-bold mb-6 tracking-tight">📱 가족 앱에서 한눈에</h3>
            <div className="space-y-3">
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <div className="text-[11px] text-green-600 font-bold mb-1">🎉 성취 알림 · 방금</div>
                <p className="text-sm font-semibold text-green-800">엄마가 처음으로 혼자 쿠팡 주문하셨어요!</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="text-[11px] text-blue-600 font-bold mb-1">📊 주간 리포트</div>
                <p className="text-sm font-semibold text-blue-800">AI 대행 5회 · 교육 영상 3개 완료 · 보안 이상 없음</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                <div className="text-[11px] text-red-600 font-bold mb-1">🚨 긴급 알림 · 어제 14:23</div>
                <p className="text-sm font-semibold text-red-800">보이스피싱 의심 문자 감지 → 자동 차단 완료</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-stone-100 shadow-sm">
            <h3 className="text-lg font-bold mb-6 tracking-tight">💝 자녀가 선물하는 이유</h3>
            {[
              { icon: "⏰", title: "내 시간이 돌아와요", desc: "부모님 디지털 도움 전화 = 월 5시간. 그 시간이 절약됩니다." },
              { icon: "🛡️", title: "사기 걱정이 사라져요", desc: "의심 문자가 오면 AI가 즉시 판별. 가족에게도 알림." },
              { icon: "🎉", title: "뿌듯한 알림이 와요", desc: "\"아버지가 오늘 모바일뱅킹 혼자 성공하셨어요!\"" },
              { icon: "🎁", title: "최고의 효도 선물이에요", desc: "홍삼은 한 달이면 끝. 디지털 집사는 매일 도와드려요." },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 mb-5 last:mb-0">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="text-sm font-bold text-stone-700">{item.title}</div>
                  <p className="text-xs text-stone-500 leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── REVIEWS ─── */
function Reviews() {
  const reviews = [
    { name: "김순자", age: 67, type: "본인", cat: "AI 대행", text: "카톡 한 줄에 쿠팡 주문 완료! 30분 넘게 헤매던 게 1분이면 끝나요. 아들한테 안 물어봐도 되니까 기분이 좋아요.", emoji: "👵" },
    { name: "이영호", age: 72, type: "본인", cat: "교육", text: "모바일뱅킹 영상 3번 봤더니 혼자 송금 성공! 은행 안 가도 되니까 다리 아픈 것도 덜해요.", emoji: "👴" },
    { name: "박미경", age: 58, type: "본인", cat: "보안", text: "검찰 사칭 전화 왔을 때 AI가 바로 '사기예요!' 알려줬어요. 딸한테도 알림이 갔대요. 큰일 날 뻔했어요.", emoji: "👩‍🦳" },
    { name: "정수현", age: 35, type: "선물", cat: "가족", text: "엄마한테 선물했더니 '오늘 혼자 쿠팡 주문했어!' 연락이 왔어요. 저도 울컥... 최고의 효도템.", emoji: "👩" },
    { name: "최진우", age: 41, type: "선물", cat: "교육", text: "아버지가 키오스크 영상 보시더니 맥도날드 혼자 주문하셨대요. 그 자랑하시는 목소리가 아직도 기억나요.", emoji: "👨" },
    { name: "한지영", age: 62, type: "본인", cat: "AI 대행", text: "병원 예약을 AI가 해줘요. 전화 30분 대기가 카톡 30초로 바뀌었어요. 왜 진작 안 썼을까.", emoji: "👵" },
  ];

  return (
    <section id="review" className="py-24 px-5" style={{ background: "#FEFBF6" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full tracking-wider">REVIEW</span>
          <h2 className="text-3xl lg:text-[2.5rem] font-black mt-6 mb-4 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            &ldquo;왜 진작 안 썼을까&rdquo;
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 border border-stone-100 hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3 items-center">
                  <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center text-xl">{r.emoji}</div>
                  <div>
                    <div className="font-bold text-sm">{r.name} ({r.age}세)</div>
                    <div className="text-[11px] text-stone-400">{r.type} 이용</div>
                  </div>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${r.cat === "교육" ? "bg-purple-50 text-purple-700" : r.cat === "가족" ? "bg-orange-50 text-orange-600" : r.cat === "보안" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>{r.cat}</span>
              </div>
              <div className="text-amber-400 text-sm mb-2.5 tracking-wider">★★★★★</div>
              <p className="text-sm text-stone-600 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-12 mt-14 flex-wrap">
          {[{ n: "4.9/5.0", l: "만족도" }, { n: "94%", l: "재이용률" }, { n: "87%", l: "가족 추천율" }].map(s => (
            <div key={s.l} className="text-center">
              <div className="text-3xl font-black text-green-800 tracking-tight">{s.n}</div>
              <div className="text-xs text-stone-400 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ─── */
function Cta() {
  return (
    <section className="py-24 px-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #2D5016 0%, #1B3A0E 50%, #0F2408 100%)" }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="max-w-2xl mx-auto text-center relative">
        <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 leading-snug tracking-tight"
          style={{ fontFamily: "'Noto Serif KR', serif" }}>
          모르면 전화 한 통.<br />5분 안에 해결됩니다.
        </h2>
        <p className="text-white/50 mb-4 text-sm">부모님의 디지털 자립, 오늘 시작하세요.</p>
        <p className="text-white/40 mb-10 text-xs">7일 무료 체험 · 카드 등록 없음 · AI 상담원 24시간 대기 중</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/login" className="px-10 py-4 bg-white text-green-900 rounded-full text-base font-bold shadow-2xl text-center hover:-translate-y-1 transition-all">
            💬 카톡으로 시작하기
          </a>
          <a href="/signup" className="px-10 py-4 rounded-full text-base font-bold text-center hover:-translate-y-1 transition-all text-white shadow-xl"
            style={{ background: "linear-gradient(135deg, #D4740E, #F5A623)" }}>
            🎁 부모님께 선물하기
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="py-16 px-5 bg-stone-900 text-stone-500">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-2xl">🏠</span>
              <span className="font-black text-lg text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>디지털 집사</span>
            </div>
            <p className="text-sm leading-relaxed">AI 상담원이 대행하고,<br />체계적 교육으로 디지털 자립을 돕는<br />어르신 맞춤 서비스입니다.</p>
          </div>
          <div>
            <h4 className="text-white/80 font-bold text-sm mb-4">서비스</h4>
            {["AI 대행 서비스", "교육 서비스 (12코스)", "요금제 안내", "이용 후기", "자주 묻는 질문"].map(s => (
              <div key={s} className="text-sm mb-2.5 cursor-pointer hover:text-white transition-colors">{s}</div>
            ))}
          </div>
          <div>
            <h4 className="text-white/80 font-bold text-sm mb-4">고객지원</h4>
            <p className="text-sm leading-loose">💬 카카오톡: 디지털집사<br />📞 080-XXX-XXXX (수신자부담)<br />📧 help@digitalbutler.kr<br /><span className="text-xs text-stone-600">평일 09~21시 · 주말 10~18시</span></p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between text-xs gap-3">
          <span>© 2026 디지털 집사. All rights reserved. · 사업자등록번호: XXX-XX-XXXXX</span>
          <div className="flex gap-5">
            {["이용약관", "개인정보처리방침", "환불 정책"].map(s => (
              <span key={s} className="cursor-pointer hover:text-white">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════ */
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <AiSection />
      <Problem />
      <Pricing />
      <Education />
      <ForFamily />
      <Reviews />
      <Cta />
      <Footer />
    </main>
  );
}
