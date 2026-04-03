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
          {[["대행 서비스", "#agency"], ["교육 서비스", "#education"], ["요금제", "#pricing"], ["후기", "#review"]].map(([label, href]) => (
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

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="pt-28 pb-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FEFBF6 0%, #E8F0DE 40%, #FFF3E0 70%, #FEFBF6 100%)" }}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-green-700">지금 2,847명이 이용 중</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-5" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              대행도, 교육도
              <br />
              <span className="text-green-800">카톡 한 줄</span>이면 끝.
            </h1>

            <p className="text-lg text-stone-500 leading-relaxed mb-3 max-w-lg">
              50~70대 부모님이 카카오톡으로 말씀만 하시면
              <br />
              <strong className="text-orange-600">AI가 즉시 해결</strong>하고, <strong className="text-green-800">혼자 하실 수 있게</strong> 도와드립니다.
            </p>

            <p className="text-sm text-stone-400 mb-8">
              ✦ 대행 — 복잡한 건 대신 해드려요 &nbsp;&nbsp;✦ 교육 — 혼자서도 할 수 있게 알려드려요
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

          {/* Right — Chat */}
          <div className="w-full max-w-sm">
            <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-black/5 border border-stone-100">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-stone-100">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-lg">🏠</div>
                <div>
                  <div className="font-bold text-sm">디지털 집사</div>
                  <div className="text-xs text-green-600">● 온라인</div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="self-end bg-orange-50 px-4 py-3 rounded-2xl rounded-br-sm max-w-[80%] text-sm leading-relaxed">
                  키오스크 주문하는 법 알려줘
                </div>
                <div className="self-start bg-green-50 px-4 py-3 rounded-2xl rounded-bl-sm max-w-[85%] text-sm leading-relaxed">
                  <span className="text-xs text-green-700 font-bold">📚 교육 모드</span><br />
                  화면을 보면서 같이 해볼까요?<br />
                  <span className="text-green-600 text-xs">▶ 1단계 영상 보기</span>
                </div>
                <div className="self-end bg-orange-50 px-4 py-3 rounded-2xl rounded-br-sm max-w-[80%] text-sm leading-relaxed">
                  그냥 대신 주문해줘 🍔
                </div>
                <div className="self-start bg-green-50 px-4 py-3 rounded-2xl rounded-bl-sm max-w-[85%] text-sm leading-relaxed">
                  <span className="text-xs text-orange-600 font-bold">🛎️ 대행 모드</span><br />
                  빅맥세트 주문 완료! 15분 후 수령이에요 🎉
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <div className="flex-1 px-4 py-3 rounded-full bg-amber-50 text-xs text-stone-400">메시지를 입력하세요...</div>
                <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-white text-lg">→</div>
              </div>
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
    <section className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-red-600 bg-red-50 px-4 py-1.5 rounded-full tracking-wider">PROBLEM</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-5 mb-3 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            이런 적 있으시죠?
          </h2>
          <p className="text-stone-400">2,017건 실제 고객 목소리에서 뽑았어요</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <div key={i} className="bg-amber-50/50 rounded-2xl p-7 border border-stone-100 hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl mb-3">{p.emoji}</div>
              <h3 className="text-lg font-bold mb-2 tracking-tight">{p.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed mb-3">&ldquo;{p.desc}&rdquo;</p>
              <span className="text-xs text-orange-600 font-semibold bg-orange-50 px-3 py-1.5 rounded-lg inline-block">📊 {p.stat}</span>
            </div>
          ))}
        </div>
        <p className="text-center mt-12 text-lg font-bold text-green-800">
          이 모든 문제, <span className="text-orange-600">대행</span>으로 즉시 해결하고 <span className="text-green-800">교육</span>으로 스스로 해결하세요.
        </p>
      </div>
    </section>
  );
}

/* ─── DUAL SERVICE (대행 + 교육 탭) ─── */
function DualService() {
  const [tab, setTab] = useState<"agency" | "education">("agency");

  const agencyItems = [
    { emoji: "🛒", title: "쇼핑 주문", before: "검색→장바구니→결제→배송지... 10단계", after: "\"휴지 주문해줘\" → 1분 완료", price: "1,500원~" },
    { emoji: "🚄", title: "KTX 예매", before: "코레일 앱→회원가입→좌석 선택→결제", after: "\"서울→부산 내일 오전\" → 예약 완료", price: "3,000원" },
    { emoji: "🏦", title: "은행 송금", before: "앱→로그인→인증서→OTP→비밀번호", after: "\"엄마한테 10만원 보내줘\" → 전송", price: "3,000원" },
    { emoji: "🔒", title: "보이스피싱 판별", before: "혼자 판단→불안→이미 늦음", after: "\"이 문자 사기야?\" → 즉시 판별", price: "무료" },
    { emoji: "🏥", title: "병원 예약", before: "앱 설치→가입→검색→시간 선택", after: "\"내일 오전 내과 예약\" → 완료", price: "3,000원" },
    { emoji: "📋", title: "공인인증서·전자서명", before: "은행 방문→대기→갱신→설치", after: "\"인증서 갱신해줘\" → 원격 해결", price: "5,000원" },
  ];

  const eduItems = [
    { emoji: "🏪", title: "키오스크 정복", desc: "카페·패스트푸드·은행 키오스크를 혼자서 척척", steps: 5, level: "입문", time: "30분", popular: true },
    { emoji: "📱", title: "스마트폰 기초", desc: "전화·문자·카톡·사진까지 기본기를 탄탄하게", steps: 8, level: "입문", time: "1시간", popular: false },
    { emoji: "🛒", title: "쿠팡·네이버 쇼핑", desc: "검색부터 주문·배송추적·교환반품까지", steps: 6, level: "초급", time: "45분", popular: false },
    { emoji: "🏦", title: "모바일 뱅킹 마스터", desc: "계좌조회·송금·공과금 납부를 집에서", steps: 7, level: "초급", time: "1시간", popular: true },
    { emoji: "🚕", title: "카카오택시·지도앱", desc: "택시 부르기·길찾기·대중교통 이용법", steps: 5, level: "입문", time: "30분", popular: false },
    { emoji: "🔐", title: "보이스피싱 예방", desc: "사기 문자·전화 구별법과 대처 방법", steps: 4, level: "필수", time: "20분", popular: true },
    { emoji: "🏥", title: "병원 예약앱 사용법", desc: "카카오·네이버로 병원 접수·예약하기", steps: 5, level: "초급", time: "30분", popular: false },
    { emoji: "🎬", title: "유튜브·넷플릭스", desc: "영상 검색·재생·구독까지 즐기기", steps: 5, level: "입문", time: "30분", popular: false },
    { emoji: "📸", title: "사진·영상 관리", desc: "사진 정리·전송·인화 주문까지", steps: 6, level: "초급", time: "40분", popular: false },
  ];

  return (
    <section id="agency" className="py-24 px-5" style={{ background: "#FEFBF6" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-green-800 bg-green-50 px-4 py-1.5 rounded-full tracking-wider">SERVICE</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-5 mb-3 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            대행 + 교육, 두 날개로 날아요
          </h2>
          <p className="text-stone-500 max-w-md mx-auto">
            급하면 <strong>대신 해드리고</strong>, 여유 있으면 <strong>함께 배워요</strong>
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-12">
          <button
            onClick={() => setTab("agency")}
            className={`px-8 py-4 rounded-2xl font-bold text-base transition-all ${tab === "agency" ? "bg-green-800 text-white shadow-lg shadow-green-900/30" : "bg-white text-stone-500 border border-stone-200 hover:border-green-800 hover:text-green-800"}`}
          >
            🛎️ 대행 서비스<br /><span className="text-xs font-normal opacity-80">대신 해드려요</span>
          </button>
          <button
            onClick={() => setTab("education")}
            className={`px-8 py-4 rounded-2xl font-bold text-base transition-all ${tab === "education" ? "bg-green-800 text-white shadow-lg shadow-green-900/30" : "bg-white text-stone-500 border border-stone-200 hover:border-green-800 hover:text-green-800"}`}
          >
            📚 교육 서비스<br /><span className="text-xs font-normal opacity-80">혼자 할 수 있게</span>
          </button>
        </div>

        {/* 대행 */}
        {tab === "agency" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {agencyItems.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-stone-100 hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl">{item.emoji}</span>
                  <span className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">{item.price}</span>
                </div>
                <h3 className="text-lg font-bold mb-3 tracking-tight">{item.title}</h3>
                <div className="mb-2">
                  <div className="text-xs text-stone-400 mb-1">BEFORE</div>
                  <p className="text-sm text-stone-400 line-through">{item.before}</p>
                </div>
                <div>
                  <div className="text-xs text-green-700 font-semibold mb-1">AFTER</div>
                  <p className="text-sm text-green-800 font-semibold">{item.after}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 교육 */}
        {tab === "education" && (
          <div id="education" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {eduItems.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-stone-100 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-700 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                {item.popular && (
                  <span className="absolute top-4 right-4 text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">🔥 인기</span>
                )}
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="text-lg font-bold mb-1.5 tracking-tight">{item.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed mb-4">{item.desc}</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-md bg-green-50 text-green-700 font-semibold">{item.level}</span>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-semibold">⏱ {item.time}</span>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 font-semibold">{item.steps}단계</span>
                </div>
                <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-green-700 to-green-500 w-0" />
                </div>
                <div className="mt-2 text-xs text-stone-400">아직 시작 전</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── EDUCATION DETAIL ─── */
function EducationDetail() {
  const features = [
    { icon: "🎥", title: "어르신 눈높이 영상", desc: "큰 글씨, 천천히, 손 클로즈업. 어르신 전용 영상으로 따라하기만 하면 돼요.", bg: "bg-orange-50", color: "text-orange-600" },
    { icon: "📞", title: "1:1 화면 공유 교육", desc: "상담원이 내 화면을 함께 보면서 하나하나 알려드려요.", bg: "bg-green-50", color: "text-green-700" },
    { icon: "🔄", title: "반복 연습 시스템", desc: "까먹어도 괜찮아요. 같은 내용을 원하는 만큼 반복 연습할 수 있어요.", bg: "bg-blue-50", color: "text-blue-700" },
    { icon: "🏆", title: "성취 배지 & 가족 알림", desc: "\"엄마가 오늘 처음으로 혼자 송금하셨어요!\" 자녀에게 알림이 가요.", bg: "bg-purple-50", color: "text-purple-700" },
  ];

  const steps = [
    { step: 1, title: "AI 무료 상담", desc: "카톡으로 뭐든 물어보세요", icon: "💬", bg: "bg-green-50" },
    { step: 2, title: "영상으로 따라하기", desc: "큰 글씨, 천천히, 반복 가능", icon: "🎥", bg: "bg-orange-50" },
    { step: 3, title: "1:1 화면 공유", desc: "상담원과 함께 직접 해보기", icon: "📞", bg: "bg-blue-50" },
    { step: 4, title: "혼자서 도전!", desc: "막히면 언제든 도움 요청", icon: "🌟", bg: "bg-purple-50" },
    { step: 5, title: "디지털 자립 완성", desc: "자녀에게 자랑하세요 🎉", icon: "🏆", bg: "bg-emerald-50" },
  ];

  return (
    <section id="education" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-4 py-1.5 rounded-full tracking-wider">EDUCATION</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-5 mb-3 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            &ldquo;가르치는 게 아니라,<br />
            <span className="text-green-800">함께 해보는 거예요&rdquo;</span>
          </h2>
          <p className="text-stone-500 max-w-lg mx-auto leading-relaxed">
            배워야 한다는 부담 없이, 필요할 때 옆에서 같이 하면서 자연스럽게 익히는 방식이에요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {features.map((f, i) => (
            <div key={i} className="rounded-2xl p-8 border border-stone-100 hover:-translate-y-1 transition-all duration-300" style={{ background: "#FEFBF6" }}>
              <div className={`w-14 h-14 rounded-xl ${f.bg} flex items-center justify-center text-2xl mb-5`}>{f.icon}</div>
              <h3 className={`text-xl font-bold mb-2 tracking-tight ${f.color}`}>{f.title}</h3>
              <p className="text-stone-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Roadmap */}
        <div className="rounded-3xl p-8 lg:p-10 border border-stone-100" style={{ background: "#FEFBF6" }}>
          <h3 className="text-xl font-black mb-8 text-center tracking-tight">🗺️ 교육 여정 로드맵</h3>
          <div className="flex flex-wrap justify-between gap-6">
            {steps.map((s) => (
              <div key={s.step} className="flex-1 min-w-[140px] text-center">
                <div className={`w-14 h-14 rounded-full ${s.bg} flex items-center justify-center text-2xl mx-auto mb-3`}>{s.icon}</div>
                <div className="text-xs text-stone-400 font-bold mb-1">STEP {s.step}</div>
                <div className="text-sm font-bold tracking-tight">{s.title}</div>
                <div className="text-xs text-stone-500 mt-1">{s.desc}</div>
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
    {
      name: "충전제", badge: "대행 전용", badgeColor: "bg-stone-500", price: "10,000원~", period: "선불 충전", desc: "한 번만 써볼래요", popular: false,
      features: ["🎉 가입 시 5,000원 무료 크레딧", "AI 상담(교육) 항상 무료", "간단 대행 1,500원 · 일반 3,000원", "복합 대행 5,000원", "충전 후 1년간 유효", "💝 가족이 대신 충전 가능"],
      cta: "충전하기", ctaStyle: "border-2 border-green-800 text-green-800 hover:bg-green-800 hover:text-white",
    },
    {
      name: "라이트", price: "19,900원", period: "/월", desc: "가끔 도움이 필요해요", popular: false,
      features: ["월 10회 대행 포함", "AI 교육 무제한", "영상 가이드 전체 열람", "보안 알림", "활동 리포트"],
      cta: "시작하기", ctaStyle: "border-2 border-green-800 text-green-800 hover:bg-green-800 hover:text-white",
    },
    {
      name: "스탠다드", badge: "인기", badgeColor: "bg-green-800", price: "34,900원", period: "/월", desc: "대행 + 교육 풀패키지", popular: true,
      features: ["무제한 대행 상담", "1:1 화면 공유 교육 월 4회", "전체 영상 가이드 + 신규 우선", "맞춤 교육 커리큘럼", "우선 상담", "월간 성장 리포트"],
      cta: "가장 인기 있는 플랜", ctaStyle: "bg-green-800 text-white shadow-lg shadow-green-900/25",
    },
    {
      name: "패밀리", badge: "선물용", badgeColor: "bg-orange-500", price: "49,900원", period: "/월", desc: "부모님께 최고를 드리고 싶어요", popular: false,
      features: ["무제한 대행 + 교육", "VIP 전담 상담원", "무제한 화면 공유 교육", "가족 앱 + 긴급 알림", "성취 배지 & 자녀 알림", "💝 부모님 크레딧 대리 충전"],
      cta: "선물하기", ctaStyle: "bg-orange-500 text-white shadow-lg shadow-orange-500/25",
    },
  ];

  return (
    <section id="pricing" className="py-24 px-5" style={{ background: "#FEFBF6" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-4 py-1.5 rounded-full tracking-wider">PRICING</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-5 mb-3 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            부담 없이 시작하세요
          </h2>
          <p className="text-stone-400">모든 플랜 7일 무료 체험 · 언제든 해지 가능</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {plans.map((plan, i) => (
            <div key={i} className={`rounded-3xl bg-white p-7 relative transition-all duration-300 hover:-translate-y-1 ${plan.popular ? "border-2 border-green-800 shadow-xl shadow-green-900/10" : "border border-stone-200"}`}>
              {plan.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 ${plan.badgeColor} text-white text-xs font-bold px-3.5 py-1 rounded-full whitespace-nowrap`}>
                  {plan.badge}
                </span>
              )}
              <h3 className="text-xl font-black tracking-tight">{plan.name}</h3>
              <p className="text-xs text-stone-400 mb-5">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-3xl font-black tracking-tight">{plan.price}</span>
                <span className="text-sm text-stone-400">{plan.period}</span>
              </div>
              <ul className="mb-7 space-y-0">
                {plan.features.map((f, j) => (
                  <li key={j} className="text-sm text-stone-500 py-2 border-b border-stone-50 leading-relaxed">
                    {f.startsWith("💝") || f.startsWith("🎉") ? f : `✓ ${f}`}
                  </li>
                ))}
              </ul>
              <a href="/signup" className={`block text-center w-full py-3.5 rounded-full text-sm font-bold transition-all ${plan.ctaStyle}`}>
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

/* ─── REVIEWS ─── */
function Reviews() {
  const reviews = [
    { name: "김순자", age: 67, type: "본인 이용", cat: "교육", text: "키오스크 교육 영상 보면서 따라했더니 이제 혼자서도 맥도날드 주문해요! 뒷사람 눈치 안 봐도 되니까 너무 좋아요.", emoji: "👵" },
    { name: "이영호", age: 72, type: "본인 이용", cat: "대행", text: "KTX 예매를 항상 아들한테 부탁했는데, 카톡으로 한 줄이면 끝이에요. 이제 안 미안해요.", emoji: "👴" },
    { name: "박미경", age: 58, type: "본인 이용", cat: "교육+대행", text: "모바일뱅킹 교육 듣고 처음으로 혼자 송금했어요. 막히는 부분은 대행으로 대신 해줘서 걱정 없어요.", emoji: "👩‍🦳" },
    { name: "정수현", age: 35, type: "부모님 선물", cat: "가족", text: "엄마한테 선물했는데 일주일 만에 '오늘 처음으로 혼자 쿠팡 주문했어!' 연락이 왔어요. 최고의 효도템!", emoji: "👩" },
    { name: "최진우", age: 41, type: "부모님 선물", cat: "교육", text: "아버지가 교육 영상 보면서 카카오택시 혼자 부르셨대요. 그 뿌듯해하시는 목소리에 저도 울컥...", emoji: "👨" },
    { name: "한지영", age: 62, type: "본인 이용", cat: "대행", text: "보이스피싱 문자 올 때마다 집사한테 물어봐요. 즉시 '사기예요!' 알려주니까 마음이 편해요.", emoji: "👵" },
  ];

  return (
    <section id="review" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full tracking-wider">REVIEW</span>
          <h2 className="text-3xl lg:text-4xl font-black mt-5 mb-3 tracking-tight" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            이용하신 분들의 이야기
          </h2>
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
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${r.cat.includes("교육") ? "bg-purple-50 text-purple-700" : "bg-orange-50 text-orange-600"}`}>{r.cat}</span>
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
        <p className="text-white/60 mb-9">7일 무료 체험 · 카드 등록 없음 · 1분이면 시작</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a href="/login" className="px-8 py-4 bg-white text-green-900 rounded-full text-base font-bold shadow-xl text-center">
            💬 카톡으로 시작하기
          </a>
          <a href="/signup" className="px-8 py-4 border-2 border-white/30 text-white rounded-full text-base font-bold text-center hover:bg-white/10 transition-all">
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
    <footer className="py-14 px-5 bg-stone-900 text-stone-500">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-2xl">🏠</span>
              <span className="font-black text-lg text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>디지털 집사</span>
            </div>
            <p className="text-sm leading-relaxed">AI + 사람이 함께하는 어르신 맞춤 디지털 도우미<br />대행으로 즉시 해결, 교육으로 디지털 자립</p>
          </div>
          <div>
            <h4 className="text-white/80 font-bold text-sm mb-4">서비스</h4>
            {["대행 서비스", "교육 서비스", "요금제 안내", "이용 후기"].map((s) => (
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
      <Problem />
      <DualService />
      <EducationDetail />
      <Pricing />
      <Reviews />
      <CtaSection />
      <Footer />
    </main>
  );
}
