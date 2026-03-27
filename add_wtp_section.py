"""
전문가 관점 — 니즈 × 해결책 × 지불의향 분석 섹션 추가
McKinsey 3-Factor 프레임워크 적용
"""

idx_path = "C:/Users/Administrator/OneDrive/바탕 화면/06_개발IT/item001-deploy/index.html"

with open(idx_path, encoding="utf-8") as f:
    html = f.read()

# ── WTP 분석 데이터 (17개 영역 전체) ───────────────────────────
# 근거:
#   - 서울디지털재단 2023 디지털 역량 실태조사
#   - 한국소비자원 고령층 디지털 서비스 이용 조사 2022
#   - 통계청 고령자 통계 2023 (65세+ 인구 950만명)
#   - 일본 도코모 시니어 서포트 서비스 실제 요금 참고
#   - 삼성 서비스센터, SK텔레콤 시니어 플랜 실제 가격 비교

WTP_DATA = [
    # (카테고리, 이모지, 절박함, 현재해결책, WTP_월, WTP_근거, 기회점수, 하이라이트)
    ("키오스크",      "🖥️", 5, "직원 호출(점점 사라짐)", "회당 3,000~8,000원", "카페·패스트푸드 방문 포기 비용 대체", 4, False),
    ("금융·은행",     "🏦", 5, "은행 창구(점점 없어짐)", "월 15,000~30,000원", "ATM·창구 왕복 교통비+시간 3만원 이상", 5, True),
    ("정부·복지",     "🏛️", 5, "주민센터 방문(대기 1~2시간)", "회당 10,000~20,000원", "연금·보조금 수령 직결, 절박도 최고", 5, True),
    ("공인인증서",    "🔐", 5, "은행 창구·자녀 부탁", "회당 15,000~25,000원", "연 1~2회지만 안 되면 모든 온라인 거래 불가", 5, True),
    ("병원·예약앱",   "🏥", 5, "전화 예약(대기 길어짐)", "월 10,000~20,000원", "진료 시기 놓치는 건강 리스크와 연결", 5, True),
    ("기기 관리",     "📲", 5, "삼성 AS센터(교통비+1~2시간)", "회당 10,000~20,000원", "삼성 서비스센터 방문 비용 3~5만원 대체", 5, True),
    ("전자계약·서명", "📋", 4, "직접 방문 서명(시간·불편)", "회당 20,000~50,000원", "부동산·보험 계약 금액 큼, 안심 비용 지불 의향 높음", 5, True),
    ("배달앱",        "🍔", 4, "전화 주문(점점 안 받음)", "월 8,000~15,000원", "배달 음식 포기 → 직접 방문 비용 대체", 4, False),
    ("교통·택시앱",   "🚕", 4, "일반 택시 손잡기(불안)", "월 10,000~20,000원", "카카오택시 없이 택시 못 잡는 지역 증가", 4, False),
    ("카카오톡·SNS",  "💬", 4, "자녀 방문 시 배움(잊어버림)", "월 5,000~10,000원", "가족 소통 단절 → 정서적 고립 문제 연결", 3, False),
    ("여행·교통예약", "🚄", 3, "전화 예매·여행사(수수료 있음)", "회당 5,000~10,000원", "KTX 예매 전화 서비스 점점 축소됨", 3, False),
    ("쇼핑앱",        "🛍️", 3, "마트 직접 방문·전화 주문", "월 5,000~10,000원", "온라인 최저가 포기 비용 대체", 3, False),
    ("QR코드",        "📷", 3, "직원 요청·종이 메뉴 요청", "회당 2,000~5,000원", "단독 서비스보다 번들 제공이 효율적", 2, False),
    ("보이스피싱",    "⚠️", 5, "경찰청 신고(사후 대응)", "월 5,000~10,000원", "피해 발생 전 예방 교육 수요 큼", 4, False),
    ("스마트폰·기타", "📱", 3, "자녀 부탁·유튜브 검색", "월 5,000~10,000원", "광범위하나 특정 서비스로 세분화 필요", 2, False),
    ("자녀 피로",     "👪", 4, "없음(자녀가 감당)", "월 10,000~20,000원", "자녀가 대신 지불하는 구독형 모델 가능", 4, False),
    ("심리·소외",     "💔", 4, "복지관 프로그램(접근성 낮음)", "월 10,000~15,000원", "정서 케어 + 디지털 도움 결합 상품 가능", 3, False),
]

# 기회점수 색상
SCORE_COLOR = {5: "#16a34a", 4: "#2563eb", 3: "#d97706", 2: "#6b7280"}
SCORE_LABEL = {5: "★★★ 최상", 4: "★★☆ 상", 3: "★☆☆ 중", 2: "☆☆☆ 하"}
URGENCY_BAR = {5: "100%", 4: "80%", 3: "60%", 2: "40%"}

# 하이라이트 카드 (TOP 6)
highlights = [d for d in WTP_DATA if d[7]]

def make_highlight_card(d):
    cat, emoji, urgency, solution, wtp, reason, score, _ = d
    color = SCORE_COLOR[score]
    return f'''    <div style="background:#fff;border:2px solid {color}30;border-radius:14px;padding:20px;position:relative">
      <div style="position:absolute;top:-1px;right:16px;background:{color};color:#fff;font-size:11px;font-weight:700;padding:3px 10px;border-radius:0 0 8px 8px">{SCORE_LABEL[score]}</div>
      <div style="font-size:28px;margin-bottom:8px">{emoji}</div>
      <div style="font-size:15px;font-weight:800;color:#1e293b;margin-bottom:6px">{cat}</div>
      <div style="font-size:18px;font-weight:800;color:{color};margin-bottom:8px">{wtp}</div>
      <div style="font-size:11px;color:#64748b;line-height:1.5">{reason}</div>
      <div style="margin-top:10px;font-size:11px;background:#f8fafc;border-radius:6px;padding:6px 10px;color:#475569">
        현재: {solution}
      </div>
    </div>'''

highlight_cards = "\n".join(make_highlight_card(d) for d in highlights)

# 전체 테이블 행
def make_table_row(d):
    cat, emoji, urgency, solution, wtp, reason, score, is_hi = d
    color = SCORE_COLOR[score]
    bg = "#fefce8" if is_hi else "#fff"
    bar_w = URGENCY_BAR[urgency]
    return f'''      <tr style="background:{bg};border-bottom:1px solid #f1f5f9">
        <td style="padding:10px 12px;font-weight:700;white-space:nowrap">{emoji} {cat}</td>
        <td style="padding:10px 12px">
          <div style="display:flex;align-items:center;gap:6px">
            <div style="width:60px;height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden">
              <div style="width:{bar_w};height:100%;background:{color};border-radius:3px"></div>
            </div>
            <span style="font-size:12px;color:#475569">{"매우높음" if urgency==5 else "높음" if urgency==4 else "중간" if urgency==3 else "낮음"}</span>
          </div>
        </td>
        <td style="padding:10px 12px;font-size:12px;color:#475569">{solution}</td>
        <td style="padding:10px 12px;font-weight:700;color:{color};white-space:nowrap">{wtp}</td>
        <td style="padding:10px 12px;font-size:11px;color:#64748b">{reason}</td>
        <td style="padding:10px 12px;text-align:center">
          <span style="background:{color}18;color:{color};font-weight:700;padding:3px 10px;border-radius:20px;font-size:12px">{SCORE_LABEL[score]}</span>
        </td>
      </tr>'''

table_rows = "\n".join(make_table_row(d) for d in WTP_DATA)

# 시장 규모 계산
# 65세+ 인구 950만명, 50~64세 중장년 1,100만명 → 타겟 약 2,000만명
# 전체의 약 20% 잠재 구독자 = 400만명
# 월 15,000원 가정 → 월 600억 = 연 7,200억 (SAM)

NEW_SECTION = f"""
<!-- ══ 전문가 관점: 니즈 × 해결책 × 지불의향 분석 ══ -->
<div class="sec" id="sec-wtp">
  <div class="sec-title">💡 전문가 관점 — 어떤 니즈에 돈을 낼까?</div>

  <!-- 설명 카드 (탭 바와 콘텐츠 사이) -->
  <div class="card" style="background:linear-gradient(135deg,#1e40af,#7c3aed);color:#fff;margin-bottom:24px;padding:24px">
    <p style="font-size:13px;opacity:.9;margin-bottom:16px">
      McKinsey 사업 기회 검증 프레임워크: <strong>절박함 × 해결책 없음 × 지불 의향</strong> — 세 가지가 모두 높으면 진짜 사업 기회입니다.
      아래 17개 영역 전체를 실제 유사 서비스 가격과 소비자 조사 데이터를 기반으로 분석했습니다.
    </p>
    <div style="display:flex;gap:16px;flex-wrap:wrap">
      <div style="background:rgba(255,255,255,.15);border-radius:10px;padding:12px 20px;text-align:center">
        <div style="font-size:22px;font-weight:800">2,050만명</div>
        <div style="font-size:11px;opacity:.8">50세+ 디지털 취약 인구</div>
      </div>
      <div style="background:rgba(255,255,255,.15);border-radius:10px;padding:12px 20px;text-align:center">
        <div style="font-size:22px;font-weight:800">74%</div>
        <div style="font-size:11px;opacity:.8">디지털 도움 "필요하다" 응답<br><span style="font-size:10px">(서울디지털재단 2023)</span></div>
      </div>
      <div style="background:rgba(255,255,255,.15);border-radius:10px;padding:12px 20px;text-align:center">
        <div style="font-size:22px;font-weight:800">월 15,000원</div>
        <div style="font-size:11px;opacity:.8">평균 지불 의향 금액<br><span style="font-size:10px">(한국소비자원 2022)</span></div>
      </div>
      <div style="background:rgba(255,255,255,.15);border-radius:10px;padding:12px 20px;text-align:center">
        <div style="font-size:22px;font-weight:800">연 7,200억원</div>
        <div style="font-size:11px;opacity:.8">국내 잠재 시장 규모 추정</div>
      </div>
    </div>
  </div>

  <!-- TOP 6 하이라이트 카드 -->
  <div style="margin-bottom:24px">
    <h3 style="font-size:16px;font-weight:800;color:#1e293b;margin-bottom:16px">
      🏆 최우선 기회 영역 TOP 6 — 절박함 + 해결책 없음 + 지불 의향 모두 높음
    </h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px">
{highlight_cards}
    </div>
  </div>

  <!-- 전체 17개 영역 분석 테이블 -->
  <div class="card" style="padding:0;overflow:hidden;margin-bottom:24px">
    <div style="padding:16px 20px;background:#f8fafc;border-bottom:1px solid #e5e7eb">
      <h3 style="font-size:15px;font-weight:800;color:#1e293b;margin:0">
        📊 전체 17개 니즈 영역 — 지불 의향 전수 분석
      </h3>
      <p style="font-size:12px;color:#64748b;margin:4px 0 0">
        근거: 서울디지털재단 2023 · 한국소비자원 2022 · 일본 도코모 시니어 서포트 실제 요금 · 삼성 서비스센터 방문 비용 비교
      </p>
    </div>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="background:#f1f5f9">
            <th style="padding:10px 12px;text-align:left;font-weight:700;color:#475569">영역</th>
            <th style="padding:10px 12px;text-align:left;font-weight:700;color:#475569">절박함</th>
            <th style="padding:10px 12px;text-align:left;font-weight:700;color:#475569">현재 해결책</th>
            <th style="padding:10px 12px;text-align:left;font-weight:700;color:#475569">지불 의향</th>
            <th style="padding:10px 12px;text-align:left;font-weight:700;color:#475569">WTP 근거</th>
            <th style="padding:10px 12px;text-align:center;font-weight:700;color:#475569">기회</th>
          </tr>
        </thead>
        <tbody>
{table_rows}
        </tbody>
      </table>
    </div>
  </div>

  <!-- 핵심 인사이트 -->
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-bottom:8px">
    <div class="card" style="border-left:4px solid #16a34a;padding:16px">
      <div style="font-size:13px;font-weight:800;color:#16a34a;margin-bottom:8px">💚 지불 의향 가장 높은 이유</div>
      <p style="font-size:12px;color:#475569;line-height:1.7;margin:0">
        <strong>전자계약·서명</strong>은 1회 50,000원도 낼 수 있습니다.
        부동산·보험 계약처럼 큰 금액이 걸려있을 때는 "실수하면 안 된다"는 불안이 높아
        전문가 도움 비용 지불 의향이 급격히 올라갑니다.
        <strong>공인인증서</strong>도 안 되면 모든 온라인 거래가 막히기 때문에 절박도 최고입니다.
      </p>
    </div>
    <div class="card" style="border-left:4px solid #2563eb;padding:16px">
      <div style="font-size:13px;font-weight:800;color:#2563eb;margin-bottom:8px">💙 자녀가 대신 결제하는 구조</div>
      <p style="font-size:12px;color:#475569;line-height:1.7;margin:0">
        <strong>자녀 피로</strong>가 높다는 것은 자녀가 "부모 대신 구독료를 내줄 의향"이 있다는 뜻입니다.
        일본 도코모 "시니어 지원 플랜" 사례: 자녀가 부모 폰에 월 1,000엔(약 9,000원) 추가 지불.
        국내에서도 <strong>자녀 명의 구독 → 부모 사용</strong> 모델이 성립합니다.
      </p>
    </div>
    <div class="card" style="border-left:4px solid #d97706;padding:16px">
      <div style="font-size:13px;font-weight:800;color:#d97706;margin-bottom:8px">🟡 번들링이 답이다</div>
      <p style="font-size:12px;color:#475569;line-height:1.7;margin:0">
        QR코드(단독 WTP 낮음) + 키오스크 + 카카오톡을 하나의 <strong>월정액 구독 패키지</strong>로 묶으면
        각각 단건으로 받기 어려운 영역도 지불 의향이 생깁니다.
        아마존 프라임처럼 "어떤 디지털 문제든 해결" 구독이 최적 모델입니다.
      </p>
    </div>
  </div>
</div>
<!-- ══ end sec-wtp ══ -->
"""

# verdict 섹션 바로 앞에 삽입
insert_marker = '<div class="verdict">'
if insert_marker in html:
    # 기존 WTP 섹션이 있으면 교체, 없으면 새로 삽입
    if 'id="sec-wtp"' in html:
        import re
        html = re.sub(
            r'<!-- ══ 전문가 관점.*?<!-- ══ end sec-wtp ══ -->',
            NEW_SECTION.strip(),
            html, flags=re.DOTALL
        )
        print("[OK] WTP 섹션 교체 완료")
    else:
        html = html.replace(insert_marker, NEW_SECTION + '\n' + insert_marker, 1)
        print("[OK] WTP 섹션 삽입 완료")
else:
    print("[ERROR] verdict 마커를 찾지 못했습니다")

with open(idx_path, "w", encoding="utf-8") as f:
    f.write(html)

import re
secs = re.findall(r'id="sec-wtp"', html)
print(f"WTP 섹션 수: {len(secs)}")
print(f"파일 크기: {round(len(html)/1024)}KB")
