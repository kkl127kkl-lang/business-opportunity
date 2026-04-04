"use client";

import { useState, useEffect } from "react";

/* ══════════════════════════════════════════════════════════════
   디지털 집사 — 최종 버전
   
   구조: 공감(Problem) → 해결(Solution) → 증거(Proof) → 행동(CTA)
   톤: AI + 사람이 함께 (AI만 강조 X)
   보완지시서 전면 반영
   ══════════════════════════════════════════════════════════════ */

const C = {
  green: "#2D5016", gl: "#4A7C28", gs: "#E8F0DE",
  orange: "#D4740E", ol: "#F5A623", os: "#FFF3E0",
  bg: "#FEFBF6", card: "#FFFFFF",
  tx: "#1A1A1A", sub: "#555", mut: "#888",
  red: "#C62828", rs: "#FFEBEE",
  blue: "#1565C0", bs: "#E3F2FD",
  purple: "#5E35B1", ps: "#EDE7F6",
  sh: "0 2px 8px rgba(0,0,0,0.06)",
};
const sf = "'Noto Serif KR',serif";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800;900&family=Noto+Serif+KR:wght@700;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{font-family:'Noto Sans KR',sans-serif;background:${C.bg};color:${C.tx};font-size:18px;line-height:1.8;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.bp{transition:transform 0.1s,opacity 0.1s}.bp:active{transform:scale(0.97)!important;opacity:0.85}
:focus-visible{outline:3px solid ${C.green};outline-offset:3px;border-radius:8px}
.lift{transition:transform 0.2s,box-shadow 0.2s}.lift:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,0,0,0.08)}
.sr{opacity:0;transform:translateY(30px);transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1)}.sr.v{opacity:1;transform:none}
@keyframes msgIn{from{opacity:0;transform:translateY(10px) scale(0.96)}to{opacity:1;transform:none}}
@keyframes sosPulse{0%,100%{box-shadow:0 0 0 0 rgba(198,40,40,0.35)}50%{box-shadow:0 0 0 16px rgba(198,40,40,0)}}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media(max-width:768px){.hm{display:none!important}.r3{grid-template-columns:1fr!important}.r5{grid-template-columns:repeat(3,1fr)!important}.fcm{flex-direction:column!important}.ht{font-size:1.9rem!important}}
@media(max-width:480px){.r5{grid-template-columns:repeat(2,1fr)!important}body{font-size:16px}}
@supports(padding:env(safe-area-inset-bottom)){.safe-b{padding-bottom:calc(16px + env(safe-area-inset-bottom))}}
`;

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("v"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".sr").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ═══ 1. NAV ═══
function Nav() {
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 40); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  return (
    <header role="banner">
      <nav aria-label="메인 네비게이션" className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-stone-200/50"
        style={{ background: "rgba(254,251,246,0.92)", padding: sc ? "8px 0" : "14px 0", transition: "padding 0.2s" }}>
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2" aria-label="디지털 집사 홈">
            <span className="text-2xl" aria-hidden="true">🏠</span>
            <span className="font-black text-xl tracking-tight" style={{ color: C.green, fontFamily: sf }}>디지털 집사</span>
          </a>
          <div className="hm flex gap-6 items-center">
            {[["서비스", "#solution"], ["요금제", "#pricing"], ["교육", "#edu"], ["후기", "#review"], ["FAQ", "#faq"]].map(([l, h]) => (
              <a key={h} href={h} className="text-[15px] font-medium hover:underline underline-offset-4" style={{ color: C.sub }}>{l}</a>
            ))}
          </div>
          <div className="flex gap-2">
            <a href="/login" className="hm bp px-5 py-2.5 text-[15px] font-bold rounded-full border-2" style={{ borderColor: C.green, color: C.green }}>로그인</a>
            <a href="/login" className="bp px-5 py-2.5 text-[15px] font-bold text-white rounded-full shadow-lg"
              style={{ background: `linear-gradient(135deg,${C.green},${C.gl})` }}>무료 체험</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

// ═══ 2. HERO ═══
function Hero() {
  const [idx, setIdx] = useState(0);
  const msgs = [
    { t: "u", text: "쿠팡에서 휴지 좀 주문해줘" },
    { t: "b", text: "코코 3겹 30롤 12,900원\n로켓배송 주문 완료! 내일 오전 도착 🚀", label: "🏠 디지털 집사" },
    { t: "u", text: "KTX 서울→부산 내일 오전" },
    { t: "b", text: "내일 9시 KTX 1매 예약 완료!\n좌석 7호차 12A (창측) 🚄", label: "🏠 디지털 집사" },
    { t: "u", text: "이상한 전화 왔는데 사기야?" },
    { t: "b", text: "🚨 보이스피싱이에요!\n절대 개인정보 알려주지 마세요.\n가족(정수현 님)께 긴급 알림 보냈어요.", label: "🛡️ 보안 알림" },
  ];
  useEffect(() => { const t = setInterval(() => setIdx((p) => Math.min(p + 1, msgs.length - 1)), 1400); return () => clearInterval(t); }, []);

  return (
    <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: `linear-gradient(160deg,${C.bg} 0%,${C.gs} 35%,${C.os} 65%,${C.bg} 100%)` }}>
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-[0.04] pointer-events-none" style={{ background: `radial-gradient(circle,${C.green},transparent)` }} />
      <div className="max-w-6xl mx-auto px-5 flex flex-col lg:flex-row gap-14 items-center">
        <div className="flex-1 max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7 border" style={{ background: C.gs, borderColor: "#c8dbb5" }}>
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: C.gl }} />
            <span className="text-sm font-bold" style={{ color: C.green }}>지금 2,847명 이용 중</span>
          </div>

          <h1 className="ht font-black leading-tight tracking-tight mb-6" style={{ fontSize: "2.8rem", fontFamily: sf, lineHeight: 1.2 }}>
            어머니, 아버지를 위한
            <br /><span style={{ color: C.green }}>쿠팡 주문도, KTX 예매도</span>
            <br />
            <span className="relative inline-block">
              카톡 한 줄이면 끝.
              <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none" aria-hidden="true">
                <path d="M0 4C40 1 80 1 100 3C120 5 160 5 200 1" stroke={C.orange} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
              </svg>
            </span>
          </h1>

          <p className="text-lg leading-relaxed mb-1" style={{ color: C.sub }}>50~70대 부모님이 카카오톡으로 말씀만 하시면</p>
          {/* AI + 사람 함께 강조 */}
          <p className="text-xl font-bold mb-2" style={{ color: C.green }}>AI가 빠르게, 전문 상담원이 따뜻하게.</p>
          <p className="text-base mb-8" style={{ color: C.sub }}>5분 안에 해결해 드립니다.</p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10 fcm">
            <a href="/login" className="bp flex items-center justify-center gap-2 px-8 text-lg font-bold text-white rounded-full shadow-xl"
              style={{ background: `linear-gradient(135deg,${C.green},${C.gl})`, minHeight: 56 }}>💬 카톡으로 시작하기</a>
            <a href="/signup" className="bp flex items-center justify-center gap-2 px-8 text-lg font-bold text-white rounded-full shadow-xl"
              style={{ background: `linear-gradient(135deg,${C.orange},${C.ol})`, minHeight: 56 }}>🎁 부모님께 선물하기</a>
          </div>

          <div className="flex gap-10">
            {[{ n: "2,847명", l: "현재 이용" }, { n: "94%", l: "재이용률" }, { n: "4.9점", l: "만족도" }].map((s) => (
              <div key={s.l}><div className="text-2xl font-black" style={{ color: C.green }}>{s.n}</div><div className="text-sm" style={{ color: C.mut }}>{s.l}</div></div>
            ))}
          </div>
          <p className="text-sm mt-6" style={{ color: C.mut }}>✓ 7일 무료 체험 &nbsp;✓ 카드 등록 없음 &nbsp;✓ 24시간 상담 &nbsp;✓ 개인정보 안전</p>
        </div>

        {/* 채팅 UI */}
        <div className="w-full max-w-[380px] lg:flex-shrink-0">
          <div className="rounded-3xl shadow-2xl overflow-hidden" style={{ background: C.card, border: "1px solid #e8e4de" }}>
            <div className="px-5 py-4 flex items-center gap-3 border-b border-stone-100" style={{ background: `linear-gradient(135deg,${C.gs},${C.bg})` }}>
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl shadow-md" style={{ background: C.green }}>🏠</div>
              <div className="flex-1">
                <div className="font-bold text-base">디지털 집사</div>
                <div className="text-sm flex items-center gap-1.5" style={{ color: C.gl }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22c55e" }} />응답 중
                </div>
              </div>
              <span className="text-xs" style={{ color: C.mut }}>오후 2:30</span>
            </div>
            <div className="px-4 py-5 space-y-3" style={{ minHeight: 340, background: "linear-gradient(180deg,#F8F5F0,#F5F2ED)" }}>
              {msgs.slice(0, idx + 1).map((m, i) => (
                <div key={i} className={`flex ${m.t === "u" ? "justify-end" : "justify-start"}`} style={{ animation: "msgIn 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
                  {m.t === "u" ? (
                    <div className="px-4 py-3 rounded-2xl rounded-br-sm max-w-[78%] text-base leading-relaxed shadow-sm" style={{ background: "#FDE68A" }}>{m.text}</div>
                  ) : (
                    <div className="px-4 py-3 rounded-2xl rounded-bl-sm max-w-[85%] text-base leading-relaxed shadow-sm border" style={{ background: C.card, borderColor: "#eee" }}>
                      <span className="text-xs font-bold block mb-1.5" style={{ color: C.green }}>{m.label}</span>
                      {m.text.split("\n").map((line, j) => <span key={j}>{line}<br /></span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-stone-100 flex gap-2" style={{ background: C.card }}>
              <div className="flex-1 px-4 py-3 rounded-full text-sm flex items-center" style={{ background: "#f5f5f0", color: C.mut }}>무엇이든 물어보세요...</div>
              <button className="bp w-10 h-10 rounded-full flex items-center justify-center text-white text-sm shadow-md"
                style={{ background: `linear-gradient(135deg,${C.green},${C.gl})` }} aria-label="보내기">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══ 3. PROBLEM — 공감 먼저 ═══
function Problem() {
  return (
    <section className="py-24 px-5" style={{ background: C.card }} aria-label="고객 공감">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 sr">
          <span className="text-sm font-bold px-4 py-2 rounded-full" style={{ color: C.red, background: C.rs }}>이런 적 있으시죠?</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-6 mb-3 tracking-tight" style={{ fontFamily: sf }}>
            &ldquo;나 때문에 자식이 힘들겠지...&rdquo;
          </h2>
          <p className="text-lg mt-3 mx-auto max-w-md leading-relaxed" style={{ color: C.sub }}>
            겉으로는 &ldquo;필요 없다&rdquo;고 말하지만,<br />속으로는 간절히 원하고 계세요.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { icon: "🏦", voice: "비밀번호, 인증서, OTP... 송금 한 번이 이렇게 어려운 줄 몰랐어", stat: "모바일뱅킹 이용률 60대 34%", cost: "은행 왕복 연 36만원 낭비", sev: "최상" },
            { icon: "🚨", voice: "검찰이라며 전화가 왔는데... 물어볼 곳이 없어", stat: "60대+ 피해 46%", cost: "평균 피해액 1,800만원", sev: "최상" },
            { icon: "🏪", voice: "키오스크 앞에서 줄 막아서 뒷사람 눈치가...", stat: "어르신 70% 불편 호소", cost: "좋아하던 식당 포기", sev: "상" },
            { icon: "🏥", voice: "전화 예약은 30분 대기, 앱은 가입부터 막혀", stat: "60대 예약 실패율 58%", cost: "급한 진료 미루다 악화", sev: "상" },
            { icon: "😔", voice: "맨날 물어보면 귀찮아할까 봐... 혼자 끙끙", stat: "시니어 67%가 부탁 꺼림", cost: "가족 관계까지 영향", sev: "상" },
          ].map((item, i) => (
            <article key={i} className="flex items-start gap-5 p-6 rounded-2xl border border-stone-100 lift sr" style={{ background: C.bg, transitionDelay: `${i * 0.08}s` }}>
              <span className="text-3xl flex-shrink-0 mt-1" aria-hidden="true">{item.icon}</span>
              <div className="flex-1">
                <p className="text-lg font-semibold mb-2 leading-relaxed">&ldquo;{item.voice}&rdquo;</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: "#f0ece6", color: C.sub }}>{item.stat}</span>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: C.rs, color: C.red }}>{item.cost}</span>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: item.sev === "최상" ? "#fccaca" : "#fde0b5", color: item.sev === "최상" ? C.red : C.orange }}>절박도 {item.sev}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-14 text-center sr">
          <p className="text-2xl font-black tracking-tight" style={{ fontFamily: sf }}>
            이 모든 문제, <span style={{ color: C.green }}>디지털 집사</span>가 오늘부터 해결해 드립니다.
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══ 4. SOLUTION — AI + 사람이 함께 ═══
function Solution() {
  return (
    <section id="solution" className="py-24 px-5" style={{ background: C.bg }} aria-label="해결 방법">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 sr">
          <span className="text-sm font-bold px-4 py-2 rounded-full" style={{ color: C.green, background: C.gs }}>SOLUTION</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-6 mb-3 tracking-tight" style={{ fontFamily: sf }}>
            <span style={{ color: C.green }}>AI가 빠르게</span>, <span style={{ color: C.orange }}>사람이 따뜻하게</span>
          </h2>
          <p className="text-lg mx-auto max-w-lg leading-relaxed" style={{ color: C.sub }}>
            간단한 건 AI가 수초 만에, 복잡한 건 전문 상담원이 화면을 함께 보면서.
            <br />24시간 언제든, 카톡 한 줄이면 시작됩니다.
          </p>
        </div>

        {/* 3 pillars — AI + 사람 + 보안 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 r3 mb-12">
          {[
            { icon: "🤖", title: "간단한 건 AI가 즉시", desc: "쇼핑 주문, KTX 예매, 배달 주문,\n택시 호출 등 일상적인 대행은\nAI가 수초 만에 처리해요.", tag: "응답 5초 · 24시간", bg: C.gs, tBg: "#d4e8c0", tC: C.green },
            { icon: "👨‍💼", title: "복잡한 건 사람이 직접", desc: "인증서 갱신, 전자서명, 모바일뱅킹 등\n민감한 업무는 전문 상담원이\n화면을 함께 보며 도와드려요.", tag: "화면 공유 · 1:1 안내", bg: C.os, tBg: "#fde0b5", tC: C.orange },
            { icon: "🛡️", title: "보이스피싱? 즉시 판별", desc: "의심 문자·전화를 보내주시면\nAI가 즉시 판별하고, 위험하면\n가족에게 긴급 알림을 보내요.", tag: "가족 알림 · GPS 공유", bg: C.rs, tBg: "#fccaca", tC: C.red },
          ].map((item, i) => (
            <article key={i} className="lift rounded-2xl p-7 sr" style={{ background: item.bg, transitionDelay: `${i * 0.1}s` }}>
              <div className="text-4xl mb-4" aria-hidden="true">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-base leading-relaxed mb-5 whitespace-pre-line" style={{ color: C.sub }}>{item.desc}</p>
              <span className="text-sm font-bold px-3 py-2 rounded-xl" style={{ color: item.tC, background: item.tBg }}>{item.tag}</span>
            </article>
          ))}
        </div>

        {/* 3단계 — 이렇게 쉬워요 */}
        <div className="rounded-2xl p-8 border border-stone-100 mb-10 sr" style={{ background: C.card, boxShadow: C.sh }}>
          <h3 className="text-xl font-bold text-center mb-8">딱 3단계면 끝</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 r3">
            {[
              { s: "01", icon: "💬", title: "카톡으로 말하기", desc: "\"휴지 주문해줘\"\n한 줄만 보내세요.", tag: "10초" },
              { s: "02", icon: "🏠", title: "집사가 처리", desc: "AI가 빠르게 처리하고\n필요하면 상담원이 이어받아요.", tag: "평균 5분" },
              { s: "03", icon: "✅", title: "결과 확인!", desc: "카톡으로 바로 알려드리고\n가족에게도 알림이 가요.", tag: "완료" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mx-auto mb-3 border-2" style={{ borderColor: C.green, background: C.gs }}>{item.icon}</div>
                <div className="text-xs font-black mb-1" style={{ color: C.mut }}>STEP {item.s}</div>
                <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                <p className="text-sm whitespace-pre-line" style={{ color: C.sub }}>{item.desc}</p>
                <span className="text-xs font-bold mt-2 inline-block px-2 py-1 rounded-lg" style={{ color: C.green, background: C.gs }}>{item.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Before → After */}
        <div className="rounded-2xl overflow-hidden border border-stone-100 mb-10 sr">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8" style={{ background: "#faf7f2" }}>
              <div className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color: C.red }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: "#fccaca" }}>✕</span>디지털 집사 없이
              </div>
              {[
                { task: "쿠팡 주문", steps: "앱 설치→가입→검색→장바구니→결제→배송지", time: "30분+" },
                { task: "KTX 예매", steps: "코레일 앱→가입→날짜→시간→좌석→결제", time: "20분+" },
                { task: "모바일 송금", steps: "은행앱→인증서→OTP→비밀번호→확인", time: "15분+" },
              ].map((item, i) => (
                <div key={i} className="mb-4">
                  <div className="text-sm font-semibold mb-1">{item.task}</div>
                  <p className="text-xs line-through leading-relaxed" style={{ color: C.mut }}>{item.steps}</p>
                  <span className="text-xs font-semibold" style={{ color: C.red }}>{item.time}</span>
                </div>
              ))}
            </div>
            <div className="p-8" style={{ background: `${C.gs}60` }}>
              <div className="text-sm font-bold mb-5 flex items-center gap-2" style={{ color: C.green }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: "#d4e8c0" }}>✓</span>디지털 집사에게 카톡 한 줄
              </div>
              {[
                { q: "\"휴지 주문해줘\"", a: "→ 주문 완료! 내일 도착", time: "1분" },
                { q: "\"서울→부산 내일 오전\"", a: "→ KTX 예약 완료!", time: "1분" },
                { q: "\"엄마한테 10만원\"", a: "→ 송금 완료!", time: "30초" },
              ].map((item, i) => (
                <div key={i} className="mb-4">
                  <span className="text-sm font-bold" style={{ color: C.green }}>{item.q} </span>
                  <span className="text-sm" style={{ color: C.gl }}>{item.a}</span>
                  <div className="text-xs font-semibold" style={{ color: C.gl }}>{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SOS */}
        <div className="rounded-2xl p-8 border-2 flex flex-col md:flex-row items-center gap-6 sr"
          style={{ borderColor: C.red, background: `linear-gradient(135deg,${C.rs},#fff5f5)` }}>
          <button className="bp flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black text-white"
            style={{ background: C.red, animation: "sosPulse 2s infinite" }} aria-label="긴급 SOS">SOS</button>
          <div>
            <h3 className="text-xl font-bold mb-2" style={{ color: C.red }}>🚨 긴급할 땐 SOS 한 번이면 돼요</h3>
            <p className="text-base leading-relaxed mb-2" style={{ color: C.sub }}>보이스피싱 의심, 급한 문제 발생 시 전문 상담원 즉시 연결.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: "#fccaca", color: C.red }}>📍 GPS 위치 공유</span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: "#fccaca", color: C.red }}>👨‍👩‍👧 보호자 자동 알림</span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: "#fccaca", color: C.red }}>📞 원터치 연결</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══ 5. 15개 분야 ═══
function Categories() {
  return (
    <section className="py-24 px-5" style={{ background: C.card }} aria-label="서비스 분야">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sr">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight" style={{ fontFamily: sf }}>이런 것 <span style={{ color: C.green }}>다</span> 돼요</h2>
          <p className="text-base mt-2" style={{ color: C.sub }}>15개 분야 · 뭐든 카톡으로 물어보세요</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 r5 sr" role="list">
          {[
            ["🛒", "쇼핑 주문"], ["🚄", "KTX 예매"], ["🏦", "은행 송금"], ["🛡️", "보이스피싱"], ["🏥", "병원 예약"],
            ["🍔", "배달 주문"], ["📱", "앱 설정"], ["💰", "공과금"], ["🏛️", "관공서"], ["💬", "카톡·문자"],
            ["📸", "사진·영상"], ["🎬", "유튜브"], ["📋", "복지·연금"], ["🗺️", "길찾기"], ["📝", "전자서명"],
          ].map(([e, n], i) => (
            <div key={i} className="rounded-xl p-4 text-center lift cursor-default" style={{ background: C.bg }} role="listitem">
              <div className="text-2xl mb-1" aria-hidden="true">{e}</div>
              <div className="text-sm font-semibold" style={{ color: C.sub }}>{n}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══ 6. PRICING ═══
function Pricing() {
  const plans = [
    { name: "기본", price: "9,900", per: "원/월", desc: "교육 + 가끔 대행", pop: false, badge: "",
      feat: [{ t: "전체 교육 콘텐츠 무료", b: true }, { t: "월 3건 대행 포함", b: true }, { t: "24시간 상담 무제한", b: false }, { t: "보이스피싱 보안 알림", b: false }, { t: "초과 시 건당 3,000원", b: false }],
      cta: "시작하기", grad: "" },
    { name: "프리미엄", price: "29,900", per: "원/월", desc: "넉넉한 대행 + SOS + 전담", pop: true, badge: "가장 인기",
      feat: [{ t: "전체 교육 콘텐츠 무료", b: true }, { t: "월 10건 대행 포함", b: true }, { t: "24시간 상담 무제한", b: false }, { t: "전문 상담원 화면 공유 월 4회", b: true }, { t: "우선 처리 + SOS 긴급", b: true }, { t: "담당 매니저 배정", b: false }, { t: "초과 시 건당 2,000원", b: false }],
      cta: "가장 인기 있는 플랜", grad: `linear-gradient(135deg,${C.green},${C.gl})` },
    { name: "가족 플랜", price: "39,900", per: "원/월", desc: "자녀가 결제 · 부모님이 사용", pop: false, badge: "🎁 선물용",
      feat: [{ t: "프리미엄 전체 포함", b: true }, { t: "자녀 앱에서 부모님 관리", b: true }, { t: "활동·보안 실시간 알림", b: true }, { t: "성취 배지 & 자녀 알림", b: false }, { t: "자녀가 대행 대신 요청", b: false }, { t: "💝 자녀가 결제·관리", b: false }],
      cta: "🎁 부모님께 선물하기", grad: `linear-gradient(135deg,${C.orange},${C.ol})` },
  ];

  return (
    <section id="pricing" className="py-24 px-5" style={{ background: C.bg }} aria-label="요금제">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 sr">
          <span className="text-sm font-bold px-4 py-2 rounded-full" style={{ color: C.orange, background: C.os }}>PRICING</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-6 mb-3 tracking-tight" style={{ fontFamily: sf }}>
            월 <span style={{ color: C.green }}>9,900원</span>부터.<br />하루 330원으로 모든 디지털 걱정 끝.
          </h2>
          <p style={{ color: C.mut }}>모든 플랜 7일 무료 체험 · 카드 등록 없음 · 언제든 해지</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 r3 items-start">
          {plans.map((p, i) => (
            <article key={i} className={`lift rounded-3xl p-8 relative sr ${p.pop ? "border-2 shadow-xl" : "border"}`}
              style={{ background: C.card, borderColor: p.pop ? C.green : "#e8e4de", transitionDelay: `${i * 0.1}s` }}>
              {p.badge && <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap"
                style={{ background: p.badge.includes("인기") ? C.green : C.orange }}>{p.badge}</span>}
              <h3 className="text-2xl font-black">{p.name}</h3>
              <p className="text-sm mb-5" style={{ color: C.mut }}>{p.desc}</p>
              <div className="mb-6"><span className="text-4xl font-black">{p.price}</span><span className="text-base" style={{ color: C.mut }}>{p.per}</span></div>
              <ul className="mb-6">
                {p.feat.map((f, j) => (
                  <li key={j} className="text-base py-2.5 border-b leading-relaxed" style={{ borderColor: "#f5f2ed", color: f.b ? C.tx : C.sub, fontWeight: f.b ? 600 : 400 }}>
                    {f.t.startsWith("💝") ? f.t : `✓ ${f.t}`}
                  </li>
                ))}
              </ul>
              <a href="/signup" className={`bp flex items-center justify-center w-full rounded-full text-base font-bold ${p.grad ? "text-white shadow-lg" : ""}`}
                style={{ minHeight: 56, background: p.grad || "transparent", border: p.grad ? "none" : `2px solid ${C.green}`, color: p.grad ? "white" : C.green }}>
                {p.cta}
              </a>
              {p.name === "가족 플랜" && (
                <p className="text-center text-sm mt-4" style={{ color: C.orange }}>📲 결제 링크를 카톡으로 자녀에게 공유 가능</p>
              )}
            </article>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-8 flex-wrap">
          {["✓ 위약금 없음", "✓ 7일 무료 체험", "✓ 즉시 해지"].map((t) => (
            <span key={t} className="text-sm" style={{ color: C.mut }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══ 7. EDUCATION (서브) ═══
function Education() {
  const [lv, setLv] = useState("all");
  const courses = [
    { e: "📱", title: "스마트폰 완전 기초", desc: "전원·와이파이·전화·문자·카톡", lv: "입문", time: "1시간", steps: 8, stars: 1, hot: false },
    { e: "🏪", title: "키오스크 완전 정복", desc: "맥도날드·카페·은행 실전 연습", lv: "입문", time: "40분", steps: 6, stars: 1, hot: true },
    { e: "🔐", title: "보이스피싱 완벽 예방", desc: "사기 문자·전화 구별법+대처법", lv: "입문", time: "25분", steps: 4, stars: 1, hot: false },
    { e: "🏦", title: "모바일뱅킹 마스터", desc: "조회·송금·공과금·자동이체", lv: "활용", time: "1시간", steps: 8, stars: 2, hot: true },
    { e: "🛒", title: "온라인 쇼핑 A to Z", desc: "검색→주문→결제→교환반품", lv: "활용", time: "50분", steps: 7, stars: 2, hot: false },
    { e: "🏥", title: "병원 예약앱 정복", desc: "카카오·네이버로 1분 예약", lv: "활용", time: "30분", steps: 5, stars: 2, hot: true },
    { e: "🚕", title: "카카오택시·네이버지도", desc: "택시 호출·길찾기·대중교통", lv: "활용", time: "30분", steps: 5, stars: 1, hot: false },
    { e: "🍔", title: "배달앱 주문하기", desc: "배민·쿠팡이츠 주문→추적", lv: "활용", time: "30분", steps: 5, stars: 1, hot: false },
    { e: "📝", title: "공인인증서·전자서명", desc: "갱신·설치·서명까지 집에서", lv: "심화", time: "40분", steps: 6, stars: 3, hot: false },
    { e: "🏛️", title: "정부24·민원 서비스", desc: "등본·납세증명 온라인 발급", lv: "심화", time: "30분", steps: 5, stars: 2, hot: false },
    { e: "📸", title: "사진·영상 관리", desc: "정리·전송·백업·인화 주문", lv: "심화", time: "40분", steps: 6, stars: 2, hot: false },
    { e: "🎬", title: "유튜브·넷플릭스", desc: "검색·재생·구독·TV연결", lv: "심화", time: "30분", steps: 5, stars: 1, hot: false },
  ];
  const filtered = lv === "all" ? courses : courses.filter((c) => c.lv === lv);
  const lvC: Record<string, { bg: string; tx: string }> = { "입문": { bg: C.gs, tx: C.green }, "활용": { bg: C.bs, tx: C.blue }, "심화": { bg: C.ps, tx: C.purple } };

  return (
    <section id="edu" className="py-24 px-5" style={{ background: C.card }} aria-label="교육 서비스">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sr">
          <span className="text-sm font-bold px-4 py-2 rounded-full" style={{ color: C.purple, background: C.ps }}>EDUCATION</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-6 mb-3 tracking-tight" style={{ fontFamily: sf }}>
            대행만 받지 마세요. <span style={{ color: C.green }}>혼자서도 해보세요.</span>
          </h2>
          <p className="text-lg mx-auto max-w-lg leading-relaxed" style={{ color: C.sub }}>
            &ldquo;가르치는 것&rdquo;이 아니라 &ldquo;옆에서 같이 해보는 것&rdquo;.
            <br /><strong style={{ color: C.purple }}>정액제 가입 시 전체 무료!</strong>
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap sr" role="tablist">
          {[{ id: "all", l: "전체 12개" }, { id: "입문", l: "🌱 입문" }, { id: "활용", l: "📱 활용" }, { id: "심화", l: "🚀 심화" }].map((f) => (
            <button key={f.id} onClick={() => setLv(f.id)} role="tab" aria-selected={lv === f.id}
              className="bp px-5 py-2.5 rounded-full text-base font-semibold"
              style={{ background: lv === f.id ? C.green : C.card, color: lv === f.id ? "white" : C.sub, border: lv === f.id ? "none" : "1.5px solid #e0ddd8", boxShadow: lv === f.id ? "0 4px 12px rgba(45,80,22,0.25)" : "none" }}>
              {f.l}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 r3 mb-10">
          {filtered.map((c, i) => (
            <article key={`${c.title}-${lv}`} className="lift rounded-2xl p-7 border border-stone-100 relative group overflow-hidden sr"
              style={{ background: C.bg, transitionDelay: `${i * 0.06}s` }}>
              <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg,${C.green},${C.orange})` }} />
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl" aria-hidden="true">{c.e}</span>
                {c.hot && <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: C.os, color: C.orange }}>🔥인기</span>}
              </div>
              <h4 className="text-lg font-bold mb-1">{c.title}</h4>
              <p className="text-base mb-4" style={{ color: C.sub }}>{c.desc}</p>
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ background: lvC[c.lv].bg, color: lvC[c.lv].tx }}>{c.lv}</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ background: "#f0ece6", color: C.sub }}>⏱ {c.time}</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ background: "#f0ece6", color: C.sub }}>{c.steps}단계</span>
                <span className="text-xs px-2.5 py-1 rounded-lg" style={{ background: "#f0ece6", color: C.mut }}>{"⭐".repeat(c.stars)}</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "#e8e4de" }}><div className="h-full rounded-full" style={{ width: "0%", background: `linear-gradient(90deg,${C.green},${C.gl})` }} /></div>
              <div className="flex justify-between mt-2">
                <span className="text-sm" style={{ color: C.mut }}>아직 시작 전</span>
                <span className="text-sm font-semibold" style={{ color: C.green }}>시작하기 →</span>
              </div>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sr">
          {[
            { icon: "🎥", title: "큰 글씨 영상", desc: "천천히, 실제 화면 그대로" },
            { icon: "📞", title: "1:1 화면 공유", desc: "상담원이 함께 보며 안내" },
            { icon: "🔄", title: "무한 반복", desc: "까먹어도 다시 볼 수 있어요" },
            { icon: "🏆", title: "완료 시 격려", desc: "\"대단해요! 이제 혼자서도!\"" },
          ].map((f, i) => (
            <div key={i} className="rounded-2xl p-6 text-center" style={{ background: "#f3edf7" }}>
              <div className="text-2xl mb-2" aria-hidden="true">{f.icon}</div>
              <div className="text-base font-bold">{f.title}</div>
              <div className="text-sm mt-1" style={{ color: C.sub }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══ 8. FOR FAMILY ═══
function ForFamily() {
  return (
    <section className="py-24 px-5" style={{ background: C.bg }} aria-label="가족">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 sr">
          <span className="text-sm font-bold px-4 py-2 rounded-full" style={{ color: C.orange, background: C.os }}>FOR FAMILY</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-6 mb-3 tracking-tight" style={{ fontFamily: sf }}>
            이번 추석엔 홍삼 대신,<br /><span style={{ color: C.orange }}>디지털 집사</span>를 선물하세요.
          </h2>
          <p style={{ color: C.sub }}>부모님 전화 1번 = 평균 20~30분. 월 3만원으로 그 시간을 사세요.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 r3">
          <article className="rounded-2xl p-8 border border-stone-100 sr" style={{ background: C.card, boxShadow: C.sh }}>
            <h3 className="text-xl font-bold mb-6">📱 자녀 앱 미리보기</h3>
            <div className="space-y-3">
              <div className="rounded-xl p-4 border" style={{ background: C.gs, borderColor: "#c8dbb5" }}><div className="text-xs font-bold mb-1" style={{ color: C.green }}>🎉 성취 알림 · 방금</div><p className="text-base font-semibold" style={{ color: C.green }}>엄마가 처음으로 혼자 쿠팡 주문하셨어요!</p></div>
              <div className="rounded-xl p-4 border" style={{ background: C.bs, borderColor: "#bbd4f0" }}><div className="text-xs font-bold mb-1" style={{ color: C.blue }}>📊 주간 리포트</div><p className="text-base font-semibold" style={{ color: C.blue }}>대행 5회 · 교육 3개 완료 · 보안 이상 없음</p></div>
              <div className="rounded-xl p-4 border" style={{ background: C.rs, borderColor: "#f5c6c6" }}><div className="text-xs font-bold mb-1" style={{ color: C.red }}>🚨 긴급 알림 · 어제</div><p className="text-base font-semibold" style={{ color: C.red }}>보이스피싱 의심 문자 감지 → 자동 차단</p></div>
            </div>
          </article>
          <article className="rounded-2xl p-8 border border-stone-100 sr" style={{ background: C.card, boxShadow: C.sh }}>
            <h3 className="text-xl font-bold mb-6">💝 자녀가 선물하는 이유</h3>
            {[
              { icon: "⏰", title: "내 시간이 돌아와요", desc: "부모님 디지털 도움 전화 = 월 5시간 절약." },
              { icon: "🛡️", title: "사기 걱정이 사라져요", desc: "의심 문자 오면 즉시 판별, 위험하면 저한테도 알림." },
              { icon: "🎉", title: "뿌듯한 알림이 와요", desc: "\"아버지가 모바일뱅킹 혼자 성공!\" 에 울컥..." },
              { icon: "🎁", title: "매일 도움 주는 선물", desc: "홍삼은 한 달이면 끝. 집사는 매일 도와요." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 mb-5 last:mb-0">
                <span className="text-xl flex-shrink-0" aria-hidden="true">{item.icon}</span>
                <div><div className="text-base font-bold">{item.title}</div><p className="text-sm leading-relaxed" style={{ color: C.sub }}>{item.desc}</p></div>
              </div>
            ))}
            <div className="mt-6 rounded-xl p-4 border border-dashed" style={{ borderColor: C.orange, background: `${C.os}80` }}>
              <p className="text-sm font-semibold" style={{ color: C.orange }}>
                📲 자녀가 대신 대행 요청도 할 수 있어요!
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

// ═══ 9. REVIEWS ═══
function Reviews() {
  const reviews = [
    { name: "김순자", age: 67, type: "본인", cat: "대행", text: "카톡 한 줄에 쿠팡 주문 완료! 30분 헤매던 게 1분이면 끝. 아들한테 안 물어봐도 되니까 기분이 좋아요.", emoji: "👵" },
    { name: "이영호", age: 72, type: "본인", cat: "교육", text: "모바일뱅킹 영상 3번 봤더니 혼자 송금 성공! 은행 안 가도 되니까 다리 아픈 것도 덜해요.", emoji: "👴" },
    { name: "박미경", age: 58, type: "본인", cat: "보안", text: "검찰 사칭 전화 왔을 때 바로 '사기예요!' 알려줬어요. 사람 상담원이 친절하게 설명해줘서 안심됐어요.", emoji: "👩‍🦳" },
    { name: "정수현", age: 35, type: "선물", cat: "가족", text: "엄마한테 선물했더니 '오늘 혼자 쿠팡 주문했어!' 연락이 왔어요. 저도 울컥... 최고의 효도템.", emoji: "👩" },
    { name: "최진우", age: 41, type: "선물", cat: "교육", text: "아버지가 키오스크 영상 보시더니 맥도날드 혼자 주문하셨대요. 그 자랑하시는 목소리에 울컥...", emoji: "👨" },
    { name: "한지영", age: 62, type: "본인", cat: "대행", text: "병원 예약을 대신 해줘요. 전화 30분 대기가 카톡 30초로 바뀌었어요. 왜 진작 안 썼을까.", emoji: "👵" },
  ];
  const cc: Record<string, { bg: string; tx: string }> = { "대행": { bg: C.gs, tx: C.green }, "교육": { bg: C.ps, tx: C.purple }, "보안": { bg: C.rs, tx: C.red }, "가족": { bg: C.os, tx: C.orange } };

  return (
    <section id="review" className="py-24 px-5" style={{ background: C.card }} aria-label="후기">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 sr">
          <span className="text-sm font-bold px-4 py-2 rounded-full" style={{ color: "#2E7D32", background: "#E8F5E9" }}>REVIEW</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-6 mb-3 tracking-tight" style={{ fontFamily: sf }}>&ldquo;왜 진작 안 썼을까&rdquo;</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 r3">
          {reviews.map((r, i) => (
            <article key={i} className="lift rounded-2xl p-7 border border-stone-100 sr" style={{ background: C.bg, transitionDelay: `${i * 0.08}s` }}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ background: C.gs }}>{r.emoji}</div>
                  <div><div className="font-bold text-base">{r.name} ({r.age}세)</div><div className="text-sm" style={{ color: C.mut }}>{r.type} 이용</div></div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ background: cc[r.cat]?.bg, color: cc[r.cat]?.tx }}>{r.cat}</span>
              </div>
              <div className="text-amber-400 text-base mb-2">★★★★★</div>
              <p className="text-base leading-relaxed" style={{ color: C.sub }}>&ldquo;{r.text}&rdquo;</p>
            </article>
          ))}
        </div>
        <div className="flex justify-center gap-14 mt-14 flex-wrap sr">
          {[{ n: "4.9/5.0", l: "만족도" }, { n: "94%", l: "재이용률" }, { n: "87%", l: "가족 추천율" }].map((s) => (
            <div key={s.l} className="text-center"><div className="text-3xl font-black" style={{ color: C.green }}>{s.n}</div><div className="text-sm mt-1" style={{ color: C.mut }}>{s.l}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══ 10. FAQ ═══
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    { q: "정말 카카오톡으로만 하면 되나요?", a: "네! 카카오톡에서 '디지털집사'를 친구 추가하시면 바로 이용할 수 있어요. 별도 앱 설치나 회원가입 없이 카톡 한 줄이면 바로 응답합니다." },
    { q: "AI만 응답하나요? 사람 상담은 안 되나요?", a: "아닙니다! 간단한 건 AI가 빠르게 처리하고, 복잡하거나 민감한 건 전문 상담원이 바로 이어받아요. AI + 사람이 함께 도와드리는 구조예요." },
    { q: "개인정보가 걱정돼요", a: "비밀번호, 계좌번호 등 민감 정보는 암호화 처리되며, 상담 완료 후 즉시 삭제됩니다. 개인정보보호법을 철저히 준수하고 있어요." },
    { q: "자녀가 대신 결제할 수 있나요?", a: "네! 가족 플랜에서 자녀가 결제하고 부모님이 사용하는 구조예요. 결제 링크를 카카오톡으로 바로 공유할 수 있어요." },
    { q: "해지하고 싶으면 어떻게 하나요?", a: "언제든 즉시 해지 가능해요. 위약금 없고, 남은 기간만큼 환불해 드립니다. 카톡으로 '해지할게요' 한 마디면 끝!" },
    { q: "교육 영상은 따로 돈을 내야 하나요?", a: "정액제(기본·프리미엄·가족) 가입 시 전체 교육 영상 12개 코스를 무료로 이용하실 수 있어요." },
  ];

  return (
    <section id="faq" className="py-24 px-5" style={{ background: C.bg }} aria-label="자주 묻는 질문">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14 sr">
          <span className="text-sm font-bold px-4 py-2 rounded-full" style={{ color: C.green, background: C.gs }}>FAQ</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-6 mb-3 tracking-tight" style={{ fontFamily: sf }}>자주 묻는 질문</h2>
        </div>
        <div className="space-y-3 sr">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl border border-stone-100 overflow-hidden" style={{ background: C.card }}>
              <button className="bp w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span className="text-base font-bold">{item.q}</span>
                <span className="text-xl flex-shrink-0" style={{ color: C.green, transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5" style={{ animation: "fadeIn 0.3s ease" }}>
                  <p className="text-base leading-relaxed" style={{ color: C.sub }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══ 11. CTA ═══
function Cta() {
  return (
    <section className="py-24 px-5 relative overflow-hidden" style={{ background: `linear-gradient(135deg,${C.green} 0%,#1B3A0E 50%,#0F2408 100%)` }}>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%,white 1px,transparent 1px),radial-gradient(circle at 80% 50%,white 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="max-w-2xl mx-auto text-center relative sr">
        <h2 className="text-3xl lg:text-4xl font-black text-white mb-5 leading-snug tracking-tight" style={{ fontFamily: sf }}>
          모르면 전화 한 통.<br />5분 안에 해결됩니다.
        </h2>
        <p className="text-white/50 mb-2">AI가 빠르게, 사람이 따뜻하게.</p>
        <p className="text-white/30 text-sm mb-10">7일 무료 체험 · 카드 등록 없음 · 언제든 해지</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 fcm">
          <a href="/login" className="bp flex items-center justify-center px-10 text-lg font-bold rounded-full shadow-2xl"
            style={{ background: "white", color: C.green, minHeight: 56 }}>💬 카톡으로 시작하기</a>
          <a href="/signup" className="bp flex items-center justify-center px-10 text-lg font-bold text-white rounded-full shadow-xl"
            style={{ background: `linear-gradient(135deg,${C.orange},${C.ol})`, minHeight: 56 }}>🎁 부모님께 선물하기</a>
        </div>
      </div>
    </section>
  );
}

// ═══ 12. FOOTER ═══
function Footer() {
  return (
    <footer className="py-16 px-5 safe-b" style={{ background: "#1A1A1A", color: "#888" }} role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 r3">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-2xl" aria-hidden="true">🏠</span>
              <span className="font-black text-lg text-white" style={{ fontFamily: sf }}>디지털 집사</span>
            </div>
            <p className="text-base leading-relaxed">AI가 빠르게, 사람이 따뜻하게.<br />어르신 맞춤 디지털 도우미 서비스.</p>
          </div>
          <nav aria-label="푸터 서비스"><h4 className="text-white/80 font-bold text-base mb-4">서비스</h4>
            {["대행 서비스", "교육 서비스 (12코스)", "요금제 안내", "이용 후기", "자주 묻는 질문"].map((s) => (
              <div key={s} className="text-base mb-3 cursor-pointer hover:text-white transition-colors">{s}</div>))}
          </nav>
          <div><h4 className="text-white/80 font-bold text-base mb-4">고객지원</h4>
            <p className="text-base leading-loose">💬 카카오톡: 디지털집사<br />📞 080-XXX-XXXX (수신자부담)<br />📧 help@digitalbutler.kr</p>
            <p className="text-sm mt-2" style={{ color: "#555" }}>평일 09~21시 · 주말 10~18시</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between text-sm gap-3">
          <span>© 2026 디지털 집사. All rights reserved.</span>
          <nav className="flex gap-5" aria-label="약관">{["이용약관", "개인정보처리방침", "환불 정책"].map((s) => (
            <a key={s} href="#" className="hover:text-white transition-colors">{s}</a>))}</nav>
        </div>
      </div>
    </footer>
  );
}

// ══════════════════════════════════════
// MAIN PAGE — 최적 순서
// 공감(Problem) → 해결(Solution) → 증거(Proof) → 행동(CTA)
// ══════════════════════════════════════
export default function Home() {
  useReveal();
  return (
    <>
      <style>{CSS}</style>
      <main>
        <Nav />
        <Hero />
        <Problem />
        <Solution />
        <Categories />
        <Pricing />
        <Education />
        <ForFamily />
        <Reviews />
        <FAQ />
        <Cta />
        <Footer />
      </main>
    </>
  );
}
