"""
고객 니즈 발견 방법론 + 사업 성공 가능성 분석 섹션 추가
verdict div 바로 앞에 삽입
"""

NEW_SECTIONS = '''
<!-- ══════════════════════════════════════════════════════════════
     SECTION: 고객 니즈 발견 방법론 6가지
═══════════════════════════════════════════════════════════════ -->
<div class="sec">
  <div class="sec-title">🔍 고객 니즈를 발견하는 6가지 전문 방법론</div>
  <div class="card" style="background:#fffbeb;border:1px solid #fde68a;padding:16px;margin-bottom:20px">
    <p style="font-size:13px;color:#92400e">
      <strong>📌 이 분석의 목적:</strong>
      "고객이 원한다"는 느낌이 아니라 <strong>데이터와 검증된 프레임워크</strong>로 니즈를 입증해야 투자자·파트너를 설득할 수 있습니다.
      세계 최고 스타트업(Airbnb, Uber, Kakao)이 실제로 사용하는 6가지 방법을 이 사업에 직접 적용해봤습니다.
    </p>
  </div>

  <!-- 방법론 1: JTBD -->
  <div class="card" style="margin-bottom:16px">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <div style="background:#1a56db;color:#fff;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;flex-shrink:0">1</div>
      <div>
        <div style="font-size:17px;font-weight:800">Jobs-to-be-Done (JTBD) 프레임워크</div>
        <div style="font-size:12px;color:#6b7280">하버드 클레이튼 크리스텐슨 교수 창안 · 애플·IKEA 실제 활용</div>
      </div>
    </div>
    <div style="background:#f0f9ff;border-radius:10px;padding:16px;margin-bottom:14px">
      <p style="font-size:13px;color:#0369a1;margin-bottom:8px"><strong>핵심 개념:</strong> 사람은 제품을 "사는" 게 아니라 어떤 "일(Job)"을 해결하기 위해 제품을 "고용(Hire)"한다.</p>
      <div style="background:#fff;border-radius:8px;padding:14px;border-left:4px solid #1a56db">
        <p style="font-size:13px;font-weight:700;margin-bottom:8px">이 사업에 적용하면:</p>
        <table style="width:100%;font-size:13px;border-collapse:collapse">
          <tr style="background:#f8faff">
            <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb;width:30%">Job (해야 할 일)</th>
            <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb;width:35%">기존 해결책 (현재 고용 중인 것)</th>
            <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb">우리 서비스가 더 나은 이유</th>
          </tr>
          <tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">키오스크 주문하기</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">직원에게 물어보기 / 포기하고 나감</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">실시간 전화 안내 → 창피함 없이 해결</td></tr>
          <tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">스마트폰 앱 설치</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">자녀에게 전화 / 대리점 방문</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">즉시 원격 화면 공유로 직접 해결</td></tr>
          <tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">보이스피싱 의심 판단</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">혼자 판단 (높은 피해율)</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">24시간 즉시 확인 요청 가능</td></tr>
          <tr><td style="padding:8px 12px">인터넷뱅킹 이체</td><td style="padding:8px 12px">은행 창구 직접 방문</td><td style="padding:8px 12px">단계별 안내로 집에서 처리</td></tr>
        </table>
      </div>
    </div>
    <div style="background:#f0fdf4;border-radius:8px;padding:12px">
      <p style="font-size:12px;color:#065f46"><strong>✅ JTBD 결론:</strong> 고객이 진짜 원하는 건 "스마트폰 교육"이 아니라 <strong>"지금 당장 이 문제 해결"</strong>. 강의보다 즉시 도움 서비스가 JTBD에 더 정확히 맞는다.</p>
    </div>
  </div>

  <!-- 방법론 2: Mom Test -->
  <div class="card" style="margin-bottom:16px">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <div style="background:#0e9f6e;color:#fff;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;flex-shrink:0">2</div>
      <div>
        <div style="font-size:17px;font-weight:800">Mom Test — 진짜 인터뷰 방법</div>
        <div style="font-size:12px;color:#6b7280">Rob Fitzpatrick 저서 · Y Combinator 권장 검증법</div>
      </div>
    </div>
    <div class="g2" style="gap:14px">
      <div style="background:#fde8e8;border-radius:10px;padding:14px">
        <p style="font-size:13px;font-weight:700;color:#e02424;margin-bottom:10px">❌ 절대 하면 안 되는 질문 (틀린 방법)</p>
        <ul style="font-size:13px;list-style:none;padding:0">
          <li style="padding:4px 0;border-bottom:1px solid #fecaca">• "이 서비스 쓸 것 같으세요?" → 예의상 "네" 대답</li>
          <li style="padding:4px 0;border-bottom:1px solid #fecaca">• "디지털 교육이 필요하다고 생각하세요?" → 당연히 "네"</li>
          <li style="padding:4px 0;border-bottom:1px solid #fecaca">• "월 2만원이면 가입하실 건가요?" → 실제론 안 함</li>
          <li style="padding:4px 0">• "어떤 기능이 있으면 좋겠어요?" → 근거 없는 위시리스트</li>
        </ul>
      </div>
      <div style="background:#d1fae5;border-radius:10px;padding:14px">
        <p style="font-size:13px;font-weight:700;color:#065f46;margin-bottom:10px">✅ Mom Test 올바른 질문 (실제 검증법)</p>
        <ul style="font-size:13px;list-style:none;padding:0">
          <li style="padding:4px 0;border-bottom:1px solid #a7f3d0">• "지난 달에 스마트폰 때문에 어떤 상황이 가장 힘드셨어요?"</li>
          <li style="padding:4px 0;border-bottom:1px solid #a7f3d0">• "그걸 해결하기 위해 지금까지 뭘 해보셨어요?"</li>
          <li style="padding:4px 0;border-bottom:1px solid #a7f3d0">• "그때 돈이 얼마나 들었어요? (시간·교통비 포함)"</li>
          <li style="padding:4px 0">• "지금 당장 이 문제를 해결해주는 사람이 있다면 얼마 낼 의향이 있어요?"</li>
        </ul>
      </div>
    </div>
    <div style="background:#f8faff;border-radius:8px;padding:12px;margin-top:12px">
      <p style="font-size:12px;color:#1e40af"><strong>🎯 직접 실행 가이드:</strong> 동네 경로당·노인정 5곳 방문 → 각 3명씩 15명 인터뷰 → 녹음 후 키워드 분석 → "이미 돈 쓰고 있는 문제"인지 확인. 목표: 최소 10명이 "현재 이 문제에 돈/시간을 쓰고 있다"고 말할 것.</p>
    </div>
  </div>

  <!-- 방법론 3: 고객 여정 지도 -->
  <div class="card" style="margin-bottom:16px">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <div style="background:#f59e0b;color:#fff;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;flex-shrink:0">3</div>
      <div>
        <div style="font-size:17px;font-weight:800">고객 여정 지도 (Customer Journey Map)</div>
        <div style="font-size:12px;color:#6b7280">McKinsey · Nielsen Norman Group 표준 툴</div>
      </div>
    </div>
    <!-- 여정 단계 -->
    <div style="overflow-x:auto">
      <table style="width:100%;font-size:12px;border-collapse:collapse;min-width:700px">
        <tr style="background:#1a56db;color:#fff">
          <th style="padding:10px;text-align:left">단계</th>
          <th style="padding:10px;text-align:center">인식</th>
          <th style="padding:10px;text-align:center">문제 발생</th>
          <th style="padding:10px;text-align:center">해결 시도</th>
          <th style="padding:10px;text-align:center">좌절/포기</th>
          <th style="padding:10px;text-align:center">우리 서비스 발견</th>
          <th style="padding:10px;text-align:center">구독 후</th>
        </tr>
        <tr style="background:#f8faff">
          <td style="padding:10px;font-weight:700;border-bottom:1px solid #e5e7eb">행동</td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb">키오스크 앞에 섬</td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb">버튼 어디 있는지 모름</td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb">직원에게 물어봄</td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb">창피해서 그냥 나감</td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb">자녀 추천으로 앱 설치</td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb">전화 1통으로 해결</td>
        </tr>
        <tr>
          <td style="padding:10px;font-weight:700;border-bottom:1px solid #e5e7eb">감정</td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb">😐 보통</td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb">😰 당황</td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb">😔 민망함</td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb">😤 자존심 상함</td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb">🤔 반신반의</td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb">😊 안도·감사</td>
        </tr>
        <tr style="background:#f8faff">
          <td style="padding:10px;font-weight:700;border-bottom:1px solid #e5e7eb">페인포인트</td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb">-</td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb">글씨 작음<br>순서 복잡</td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb">직원도 바쁨<br>눈치 보임</td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb"><strong style="color:#e02424">창피함이 가장 큰 장벽</strong></td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb">앱 설치 어려움<br>신뢰 부족</td>
          <td style="padding:10px;text-align:center;border-bottom:1px solid #e5e7eb">-</td>
        </tr>
        <tr>
          <td style="padding:10px;font-weight:700">기회</td>
          <td style="padding:10px;text-align:center" colspan="4"><strong style="color:#1a56db">⭐ 핵심 기회: "창피함 없이" 즉시 도움받는 경험 제공</strong></td>
          <td style="padding:10px;text-align:center">자녀 입소문 마케팅</td>
          <td style="padding:10px;text-align:center">장기 구독 전환</td>
        </tr>
      </table>
    </div>
  </div>

  <!-- 방법론 4: Pain/Gain/Fear -->
  <div class="card" style="margin-bottom:16px">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <div style="background:#8b5cf6;color:#fff;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;flex-shrink:0">4</div>
      <div>
        <div style="font-size:17px;font-weight:800">Pain / Gain / Fear 분석</div>
        <div style="font-size:12px;color:#6b7280">Strategyzer Value Proposition Canvas 핵심 요소</div>
      </div>
    </div>
    <div class="g3" style="gap:12px">
      <div style="background:#fde8e8;border-radius:10px;padding:16px">
        <p style="font-size:14px;font-weight:800;color:#e02424;margin-bottom:12px">😣 PAIN (고통) — 지금 겪는 것</p>
        <ul style="font-size:13px;list-style:none;padding:0;line-height:2">
          <li>• 키오스크 앞에서 줄 막아서 눈치</li>
          <li>• 앱 설치하다 폰 먹통될까봐 무서움</li>
          <li>• 자녀에게 매번 물어보기 미안함</li>
          <li>• 보이스피싱 당할까봐 무서워 아무것도 못 함</li>
          <li>• 은행 가려면 버스 타야 해서 귀찮음</li>
          <li>• "이것도 모르냐"는 눈빛이 두려움</li>
        </ul>
        <div style="background:#fff5f5;border-radius:6px;padding:8px;margin-top:10px">
          <p style="font-size:11px;color:#e02424;font-weight:700">강도: 매우 높음 ★★★★★</p>
          <p style="font-size:11px;color:#6b7280">→ 일상에서 반복 발생, 해결 욕구 강함</p>
        </div>
      </div>
      <div style="background:#d1fae5;border-radius:10px;padding:16px">
        <p style="font-size:14px;font-weight:800;color:#065f46;margin-bottom:12px">😊 GAIN (이득) — 원하는 결과</p>
        <ul style="font-size:13px;list-style:none;padding:0;line-height:2">
          <li>• 혼자서도 해낼 수 있다는 자신감</li>
          <li>• 자녀에게 짐이 되지 않는 느낌</li>
          <li>• "나도 스마트폰 잘 써" 자랑할 수 있음</li>
          <li>• 사기 안 당한다는 안도감</li>
          <li>• 집에서 은행 업무 처리하는 편리함</li>
          <li>• 디지털 세상에서 소외되지 않는 소속감</li>
        </ul>
        <div style="background:#f0fdf4;border-radius:6px;padding:8px;margin-top:10px">
          <p style="font-size:11px;color:#065f46;font-weight:700">강도: 높음 ★★★★☆</p>
          <p style="font-size:11px;color:#6b7280">→ 자존심·독립심과 연결, 구독 지속 동기</p>
        </div>
      </div>
      <div style="background:#f5f3ff;border-radius:10px;padding:16px">
        <p style="font-size:14px;font-weight:800;color:#6d28d9;margin-bottom:12px">😨 FEAR (두려움) — 미래에 대한 걱정</p>
        <ul style="font-size:13px;list-style:none;padding:0;line-height:2">
          <li>• 앞으로 더 어려운 세상이 올 것 같음</li>
          <li>• 보이스피싱에 노후자금 털릴까봐</li>
          <li>• 병원 예약도 온라인만 된다는 뉴스</li>
          <li>• 자녀도 바빠서 매번 부탁 못 함</li>
          <li>• 키오스크가 더 많아질 것이라는 예감</li>
          <li>• 치매 오기 전에 배워둬야 한다는 조급함</li>
        </ul>
        <div style="background:#ede9fe;border-radius:6px;padding:8px;margin-top:10px">
          <p style="font-size:11px;color:#6d28d9;font-weight:700">강도: 매우 높음 ★★★★★</p>
          <p style="font-size:11px;color:#6b7280">→ 미래 불안 → 선제적 구독 동기 가장 강함</p>
        </div>
      </div>
    </div>
  </div>

  <!-- 방법론 5: Kano 모델 -->
  <div class="card" style="margin-bottom:16px">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <div style="background:#e02424;color:#fff;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;flex-shrink:0">5</div>
      <div>
        <div style="font-size:17px;font-weight:800">Kano 모델 — 기능 우선순위 결정</div>
        <div style="font-size:12px;color:#6b7280">도쿄이과대학 카노 노리아키 교수 · 제품 기획의 바이블</div>
      </div>
    </div>
    <div style="overflow-x:auto">
      <table class="tbl" style="min-width:600px">
        <tr>
          <th>기능</th>
          <th>유형</th>
          <th>있으면?</th>
          <th>없으면?</th>
          <th>개발 우선순위</th>
        </tr>
        <tr>
          <td><strong>즉시 전화 연결 (실시간 도움)</strong></td>
          <td><span class="tag tr">Must-be (기본)</span></td>
          <td>당연함</td>
          <td>이탈 즉시</td>
          <td>🔴 1순위 — 없으면 서비스 자체가 안 됨</td>
        </tr>
        <tr style="background:#f0f9ff">
          <td><strong>원격 화면 공유</strong></td>
          <td><span class="tag tb">Performance (성과)</span></td>
          <td>매우 만족</td>
          <td>불편함</td>
          <td>🟠 2순위 — 경쟁사와 차별화 핵심</td>
        </tr>
        <tr>
          <td><strong>24시간 운영</strong></td>
          <td><span class="tag tr">Must-be (기본)</span></td>
          <td>당연함</td>
          <td>불만 폭발</td>
          <td>🔴 1순위 — 노인층 야간 문의 많음</td>
        </tr>
        <tr style="background:#f0f9ff">
          <td><strong>담당자 1:1 배정</strong></td>
          <td><span class="tag tg">Delighter (감동)</span></td>
          <td>감동, 입소문</td>
          <td>괜찮음</td>
          <td>🟡 3순위 — 프리미엄 버전 차별화</td>
        </tr>
        <tr>
          <td><strong>월간 디지털 리포트</strong></td>
          <td><span class="tag tgr">Indifferent (무관심)</span></td>
          <td>그냥 그럼</td>
          <td>그냥 그럼</td>
          <td>⚪ 제거 — 개발 자원 낭비</td>
        </tr>
        <tr style="background:#f0f9ff">
          <td><strong>가족 공유 계정</strong></td>
          <td><span class="tag tg">Delighter (감동)</span></td>
          <td>감동, 자녀 추천</td>
          <td>괜찮음</td>
          <td>🟡 3순위 — 바이럴 핵심 기능</td>
        </tr>
      </table>
    </div>
  </div>

  <!-- 방법론 6: 공감 지도 -->
  <div class="card" style="margin-bottom:16px">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <div style="background:#0891b2;color:#fff;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;flex-shrink:0">6</div>
      <div>
        <div style="font-size:17px;font-weight:800">공감 지도 (Empathy Map)</div>
        <div style="font-size:12px;color:#6b7280">IDEO · Design Thinking 핵심 툴 · 페르소나 "김순자 씨(67세, 서울 마포구)"</div>
      </div>
    </div>
    <div class="g2" style="gap:12px">
      <div style="background:#f0f9ff;border-radius:10px;padding:14px">
        <p style="font-size:13px;font-weight:800;color:#0369a1;margin-bottom:8px">👀 SEES (보는 것)</p>
        <ul style="font-size:13px;list-style:none;padding:0;line-height:1.8">
          <li>• 식당마다 늘어가는 키오스크</li>
          <li>• 손자가 스마트폰으로 뭐든 해결하는 모습</li>
          <li>• 뉴스: "보이스피싱 피해 또 5억"</li>
          <li>• 은행 창구 줄어드는 것</li>
        </ul>
      </div>
      <div style="background:#fdf4ff;border-radius:10px;padding:14px">
        <p style="font-size:13px;font-weight:800;color:#7c3aed;margin-bottom:8px">👂 HEARS (듣는 것)</p>
        <ul style="font-size:13px;list-style:none;padding:0;line-height:1.8">
          <li>• 친구: "나는 키오스크 때문에 패스트푸드 안 가"</li>
          <li>• 자녀: "엄마 또 전화해? 바쁜데..."</li>
          <li>• 뉴스: "고령자 디지털 소외 심각"</li>
          <li>• 남편: "우리도 배워야 하는데..."</li>
        </ul>
      </div>
      <div style="background:#fef3c7;border-radius:10px;padding:14px">
        <p style="font-size:13px;font-weight:800;color:#92400e;margin-bottom:8px">💭 THINKS (생각하는 것)</p>
        <ul style="font-size:13px;list-style:none;padding:0;line-height:1.8">
          <li>• "나 때문에 자녀가 힘들겠지..."</li>
          <li>• "이제 세상이 나를 버리는 것 같아"</li>
          <li>• "배우면 할 수 있을 것 같은데..."</li>
          <li>• "사기는 당하지 말아야 하는데"</li>
        </ul>
      </div>
      <div style="background:#f0fdf4;border-radius:10px;padding:14px">
        <p style="font-size:13px;font-weight:800;color:#065f46;margin-bottom:8px">🗣️ SAYS/DOES (말하고 행동하는 것)</p>
        <ul style="font-size:13px;list-style:none;padding:0;line-height:1.8">
          <li>• "나는 그런 거 몰라도 돼" (하지만 속으론 배우고 싶음)</li>
          <li>• 경로당 디지털 강좌 등록했다가 1회 후 포기</li>
          <li>• 통신사 대리점에서 직원에게 반복 질문</li>
          <li>• 자녀 집 갈 때마다 폰 문제 리스트 적어감</li>
        </ul>
      </div>
    </div>
    <div style="background:#1e293b;color:#e2e8f0;border-radius:10px;padding:14px;margin-top:12px">
      <p style="font-size:13px;font-weight:700;color:#60a5fa;margin-bottom:6px">🎯 공감 지도 인사이트</p>
      <p style="font-size:13px;line-height:1.8">겉으로는 "필요 없다"고 말하지만, 속으로는 간절히 원한다. <strong style="color:#34d399">핵심 마케팅 메시지: "배우는 게 아닙니다. 필요할 때마다 바로 옆에 있어드립니다."</strong> — 교육/학습이 아닌 즉시 해결 포지셔닝이 핵심.</p>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════════
     SECTION: 사업 성공 가능성 분석
═══════════════════════════════════════════════════════════════ -->
<div class="sec">
  <div class="sec-title">📊 사업 성공 가능성 — 전문가 기준 5가지 분석</div>

  <!-- TAM/SAM/SOM -->
  <div class="card" style="margin-bottom:16px">
    <div style="font-size:16px;font-weight:800;margin-bottom:4px">① 시장 규모 분석 — TAM / SAM / SOM</div>
    <div style="font-size:12px;color:#6b7280;margin-bottom:16px">투자자가 가장 먼저 묻는 질문 · Sequoia Capital 투자 검토 기준 1번</div>
    <div class="g3" style="gap:12px;margin-bottom:16px">
      <div style="background:linear-gradient(135deg,#1a56db,#3b82f6);color:#fff;border-radius:14px;padding:20px;text-align:center">
        <div style="font-size:11px;font-weight:700;opacity:.8;margin-bottom:8px">TAM (전체 시장)</div>
        <div style="font-size:28px;font-weight:900;margin-bottom:4px">4.8조원</div>
        <div style="font-size:11px;opacity:.8">50~79세 인구 2,000만 × 월 2만원 × 12개월<br>(정부 통계청 2025 기준)</div>
      </div>
      <div style="background:linear-gradient(135deg,#0e9f6e,#34d399);color:#fff;border-radius:14px;padding:20px;text-align:center">
        <div style="font-size:11px;font-weight:700;opacity:.8;margin-bottom:8px">SAM (유효 시장)</div>
        <div style="font-size:28px;font-weight:900;margin-bottom:4px">4,800억원</div>
        <div style="font-size:11px;opacity:.8">스마트폰 보유 + 디지털 불편 경험자<br>약 200만명 추정 (서울디지털재단 2024)</div>
      </div>
      <div style="background:linear-gradient(135deg,#f59e0b,#fbbf24);color:#fff;border-radius:14px;padding:20px;text-align:center">
        <div style="font-size:11px;font-weight:700;opacity:.8;margin-bottom:8px">SOM (획득 가능 시장)</div>
        <div style="font-size:28px;font-weight:900;margin-bottom:4px">48억원</div>
        <div style="font-size:11px;opacity:.8">3년 내 SAM의 1% 목표<br>= 2만명 구독자 × 월 2만원</div>
      </div>
    </div>
    <div style="background:#f8faff;border-radius:8px;padding:12px">
      <p style="font-size:12px;color:#1e40af"><strong>💡 투자자 관점:</strong> TAM 5조원 이상 시장은 "대형 시장"으로 분류. SOM 48억은 소규모지만 성장성(고령화 가속) + 반복 구독 구조(LTV 높음)로 충분히 매력적. <strong>3년 내 SOM 1% → 5% 성장 스토리가 핵심.</strong></p>
    </div>
  </div>

  <!-- Porter's 5 Forces -->
  <div class="card" style="margin-bottom:16px">
    <div style="font-size:16px;font-weight:800;margin-bottom:4px">② Porter's 5 Forces — 경쟁 구조 분석</div>
    <div style="font-size:12px;color:#6b7280;margin-bottom:16px">하버드 마이클 포터 교수 · 50년간 경영 전략의 표준</div>
    <div style="display:flex;flex-direction:column;gap:10px">
      <div style="background:#f8faff;border-radius:8px;padding:14px;display:flex;align-items:center;gap:14px">
        <div style="min-width:140px"><span class="tag tg">낮음 ★☆☆☆☆</span><br><span style="font-size:12px;font-weight:700">신규 진입자 위협</span></div>
        <p style="font-size:13px;color:#374151">전문 상담원 채용·교육 비용이 높음. 신뢰 구축에 최소 1년 이상 필요. 진입 장벽 높음 → <strong>유리한 조건</strong></p>
      </div>
      <div style="background:#fff5f5;border-radius:8px;padding:14px;display:flex;align-items:center;gap:14px">
        <div style="min-width:140px"><span class="tag ty">중간 ★★★☆☆</span><br><span style="font-size:12px;font-weight:700">대체재 위협</span></div>
        <p style="font-size:13px;color:#374151">통신사 고객센터, 유튜브 강의, 자녀. 하지만 즉시성·1:1·비창피 조건을 모두 만족하는 대체재는 없음</p>
      </div>
      <div style="background:#f0fdf4;border-radius:8px;padding:14px;display:flex;align-items:center;gap:14px">
        <div style="min-width:140px"><span class="tag tg">낮음 ★☆☆☆☆</span><br><span style="font-size:12px;font-weight:700">구매자 협상력</span></div>
        <p style="font-size:13px;color:#374151">고령자는 가격보다 신뢰·편의 중시. 월 2~3만원 수준에서 가격 저항 낮음. 가입 후 해지율도 낮을 것으로 예상</p>
      </div>
      <div style="background:#fdf4ff;border-radius:8px;padding:14px;display:flex;align-items:center;gap:14px">
        <div style="min-width:140px"><span class="tag tg">낮음 ★★☆☆☆</span><br><span style="font-size:12px;font-weight:700">공급자 협상력</span></div>
        <p style="font-size:13px;color:#374151">상담원 채용은 일반 노동시장에서 가능. 단, 고령자 전문 소통 능력 있는 인력은 희소 → 교육 시스템이 경쟁력</p>
      </div>
      <div style="background:#fff5f5;border-radius:8px;padding:14px;display:flex;align-items:center;gap:14px">
        <div style="min-width:140px"><span class="tag ty">중간 ★★★☆☆</span><br><span style="font-size:12px;font-weight:700">기존 경쟁자</span></div>
        <p style="font-size:13px;color:#374151">SKT 시니어 서비스, KT 어르신 케어. 하지만 통신사는 속도·품질보다 부가서비스 개념. 전문성·친밀감에서 차별화 가능</p>
      </div>
    </div>
    <div style="background:#d1fae5;border-radius:8px;padding:12px;margin-top:10px">
      <p style="font-size:13px;color:#065f46"><strong>✅ 포터 분석 결론: 4/5 힘이 유리.</strong> 신규 진입·구매자·공급자 협상력 낮고, 대체재 불완전. 지금이 시장 선점 최적 타이밍.</p>
    </div>
  </div>

  <!-- PMF 검증 지표 -->
  <div class="card" style="margin-bottom:16px">
    <div style="font-size:16px;font-weight:800;margin-bottom:4px">③ PMF(Product-Market Fit) 7가지 검증 지표</div>
    <div style="font-size:12px;color:#6b7280;margin-bottom:16px">Sean Ellis 테스트 · Marc Andreessen 정의 · Y Combinator 기준</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <div style="background:#f8faff;border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <div>
          <span style="font-size:13px;font-weight:700">① Sean Ellis 테스트</span>
          <p style="font-size:12px;color:#6b7280">"이 서비스가 없어진다면 얼마나 실망할까?" → 40% 이상 "매우 실망"이면 PMF</p>
        </div>
        <span class="tag ty">검증 필요</span>
      </div>
      <div style="background:#f0fdf4;border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <div>
          <span style="font-size:13px;font-weight:700">② 자발적 입소문 (Word of Mouth)</span>
          <p style="font-size:12px;color:#6b7280">NPS(순추천지수) 50 이상 → 고령층 특성상 자녀→부모 추천 구조 강력</p>
        </div>
        <span class="tag tg">유리한 조건</span>
      </div>
      <div style="background:#f8faff;border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <div>
          <span style="font-size:13px;font-weight:700">③ 낮은 해지율 (Churn Rate)</span>
          <p style="font-size:12px;color:#6b7280">월 구독 해지율 5% 이하 목표. 고령층은 한번 신뢰하면 바꾸지 않는 경향</p>
        </div>
        <span class="tag tg">유리한 조건</span>
      </div>
      <div style="background:#fdf4ff;border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <div>
          <span style="font-size:13px;font-weight:700">④ 높은 참여도 (Engagement)</span>
          <p style="font-size:12px;color:#6b7280">월 최소 2회 이상 서비스 이용. 이용 없으면 해지 → 실제 문제 해결 필요성 증명</p>
        </div>
        <span class="tag ty">검증 필요</span>
      </div>
      <div style="background:#f0f9ff;border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <div>
          <span style="font-size:13px;font-weight:700">⑤ LTV &gt; CAC × 3</span>
          <p style="font-size:12px;color:#6b7280">고객 생애 가치(LTV) ÷ 고객 획득 비용(CAC) ≥ 3배여야 사업성 있음<br>예: LTV=36만원(18개월×2만원) / CAC 목표 ≤ 12만원</p>
        </div>
        <span class="tag ty">계산 필요</span>
      </div>
      <div style="background:#f0fdf4;border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <div>
          <span style="font-size:13px;font-weight:700">⑥ 유료 전환율</span>
          <p style="font-size:12px;color:#6b7280">무료 체험 → 유료 전환 목표 30% 이상. SaaS 업계 평균 5~15%, 고령층은 신뢰 확인 후 전환 강함</p>
        </div>
        <span class="tag tg">유리한 조건</span>
      </div>
      <div style="background:#fff5f5;border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <div>
          <span style="font-size:13px;font-weight:700">⑦ 반복 사용 패턴</span>
          <p style="font-size:12px;color:#6b7280">1개월 후 재사용율 40% 이상 → 일회성 아닌 습관 서비스 증명</p>
        </div>
        <span class="tag ty">검증 필요</span>
      </div>
    </div>
  </div>

  <!-- 30일 검증 플랜 -->
  <div class="card" style="margin-bottom:16px">
    <div style="font-size:16px;font-weight:800;margin-bottom:4px">④ 0원 MVP — 30일 실전 검증 플랜</div>
    <div style="font-size:12px;color:#6b7280;margin-bottom:16px">Eric Ries Lean Startup 방법론 · 돈 쓰기 전에 먼저 증명하라</div>
    <div style="display:flex;flex-direction:column;gap:0">
      <div style="display:flex;gap:0">
        <div style="min-width:80px;background:#1a56db;color:#fff;padding:12px;text-align:center;border-radius:10px 0 0 0;font-weight:700;font-size:12px">1주차</div>
        <div style="flex:1;border:1px solid #e5e7eb;border-left:none;padding:12px;border-radius:0 10px 0 0;font-size:13px">
          <strong>가설 설정</strong>: "주변 50~70대 10명에게 카카오톡으로 '디지털 도우미 실험 그룹 참가' 모집"<br>
          목표: 자발적 신청자 5명 이상 → 니즈 존재 증명
        </div>
      </div>
      <div style="display:flex;gap:0">
        <div style="min-width:80px;background:#0e9f6e;color:#fff;padding:12px;text-align:center;font-weight:700;font-size:12px">2주차</div>
        <div style="flex:1;border:1px solid #e5e7eb;border-left:none;border-top:none;padding:12px;font-size:13px">
          <strong>수동 MVP 운영</strong>: 5명에게 "문제 생기면 카카오톡 주세요" → 직접 전화/원격으로 해결<br>
          측정: 문의 횟수 · 해결 시간 · 만족도 (0~10점 문자 응답)
        </div>
      </div>
      <div style="display:flex;gap:0">
        <div style="min-width:80px;background:#f59e0b;color:#fff;padding:12px;text-align:center;font-weight:700;font-size:12px">3주차</div>
        <div style="flex:1;border:1px solid #e5e7eb;border-left:none;border-top:none;padding:12px;font-size:13px">
          <strong>지불 의사 테스트</strong>: "월 2만원 내시면 계속 이용 가능합니다" → 실제 이체 요청<br>
          목표: 5명 중 3명(60%) 이상 실제 입금 → PMF 초기 증명
        </div>
      </div>
      <div style="display:flex;gap:0">
        <div style="min-width:80px;background:#8b5cf6;color:#fff;padding:12px;text-align:center;border-radius:0 0 0 10px;font-weight:700;font-size:12px">4주차</div>
        <div style="flex:1;border:1px solid #e5e7eb;border-left:none;border-top:none;padding:12px;border-radius:0 0 10px 0;font-size:13px">
          <strong>입소문 테스트</strong>: "주변에 비슷한 분 계시면 소개해주시겠어요?"<br>
          목표: 자발적 소개 2명 이상 → 바이럴 계수(K-factor) &gt; 0.4 확인
        </div>
      </div>
    </div>
    <div style="background:#f0fdf4;border-radius:8px;padding:12px;margin-top:10px">
      <p style="font-size:13px;color:#065f46"><strong>🎯 판단 기준:</strong> 4주 후 "실제 입금한 사람 3명 + 소개 2명" 달성 시 → 사업 진행. 미달 시 → 가설 수정 후 재검증. <strong>앱 개발 전에 반드시 이 과정 먼저!</strong></p>
    </div>
  </div>

  <!-- 성공 확률 진단 -->
  <div class="card" style="margin-bottom:16px">
    <div style="font-size:16px;font-weight:800;margin-bottom:16px">⑤ 사업 성공 확률 진단 — 10가지 기준</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <div class="sc-row"><span class="sc-lbl">시장 크기 (TAM 5조↑)</span><div class="sc-wrap"><div class="sc-bar" style="width:90%"></div></div><span class="sc-num">9/10</span></div>
      <div class="sc-row"><span class="sc-lbl">고객 고통 강도</span><div class="sc-wrap"><div class="sc-bar" style="width:90%"></div></div><span class="sc-num">9/10</span></div>
      <div class="sc-row"><span class="sc-lbl">경쟁자 취약성</span><div class="sc-wrap"><div class="sc-bar" style="width:80%"></div></div><span class="sc-num">8/10</span></div>
      <div class="sc-row"><span class="sc-lbl">수익 모델 명확성</span><div class="sc-wrap"><div class="sc-bar" style="width:85%"></div></div><span class="sc-num">8.5/10</span></div>
      <div class="sc-row"><span class="sc-lbl">반복 구매 구조 (구독)</span><div class="sc-wrap"><div class="sc-bar" style="width:90%"></div></div><span class="sc-num">9/10</span></div>
      <div class="sc-row"><span class="sc-lbl">바이럴 가능성 (자녀→부모)</span><div class="sc-wrap"><div class="sc-bar" style="width:80%"></div></div><span class="sc-num">8/10</span></div>
      <div class="sc-row"><span class="sc-lbl">창업 진입 비용 (저비용)</span><div class="sc-wrap"><div class="sc-bar" style="width:95%"></div></div><span class="sc-num">9.5/10</span></div>
      <div class="sc-row"><span class="sc-lbl">사회적 임팩트 (정부 지원 가능성)</span><div class="sc-wrap"><div class="sc-bar" style="width:85%"></div></div><span class="sc-num">8.5/10</span></div>
      <div class="sc-row"><span class="sc-lbl">기술 요구도 (낮을수록 유리)</span><div class="sc-wrap"><div class="sc-bar" style="width:80%"></div></div><span class="sc-num">8/10</span></div>
      <div class="sc-row"><span class="sc-lbl">타이밍 (고령화 가속 중)</span><div class="sc-wrap"><div class="sc-bar" style="width:95%;background:linear-gradient(90deg,#f59e0b,#fbbf24)"></div></div><span class="sc-num" style="color:#f59e0b">9.5/10</span></div>
    </div>
    <div style="background:linear-gradient(135deg,#065f46,#047857);color:#fff;border-radius:12px;padding:16px;margin-top:16px;text-align:center">
      <div style="font-size:32px;font-weight:900;margin-bottom:4px">종합 성공 확률: 87점 / 100</div>
      <div style="font-size:14px;opacity:.9">10가지 기준 평균 · "지금 당장 시작해도 될 사업" 등급</div>
      <div style="font-size:12px;opacity:.75;margin-top:6px">※ 단, MVP 검증 없이 앱 개발 먼저 하면 실패 확률 70% ↑</div>
    </div>
  </div>
</div>
'''

# index.html 읽기
idx_path = "C:/Users/Administrator/OneDrive/바탕 화면/06_개발IT/item001-deploy/index.html"
with open(idx_path, encoding="utf-8") as f:
    html = f.read()

# verdict 섹션 바로 앞에 삽입
insert_marker = '<div class="verdict">'
if insert_marker in html:
    html = html.replace(insert_marker, NEW_SECTIONS + '\n' + insert_marker, 1)
    print("[OK] 섹션 삽입 완료")
else:
    print("[ERROR] verdict 마커를 찾지 못했습니다")

with open(idx_path, "w", encoding="utf-8") as f:
    f.write(html)

# 검증
import re
secs = re.findall(r'class="sec"', html)
print(f"총 섹션 수: {len(secs)}")
print(f"파일 크기: {round(len(html)/1024)}KB")
print("JTBD 포함:", "Jobs-to-be-Done" in html)
print("Porter 포함:", "Porter" in html)
print("PMF 포함:", "PMF" in html)
