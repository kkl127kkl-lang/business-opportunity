"""
비즈니스 모델 섹션 추가
건당 결제 / 월정액 / 충전형 / 상담전화 / 영상서비스 등
"""
import re, sys
sys.stdout.reconfigure(encoding='utf-8')

idx_path = "C:/Users/Administrator/OneDrive/바탕 화면/06_개발IT/item001-deploy/index.html"
with open(idx_path, encoding='utf-8') as f:
    html = f.read()

BM_SECTION = """
<!-- ══ 비즈니스 모델 섹션 ══ -->
<div class="sec" id="sec-bm">
  <div class="sec-title">💼 비즈니스 모델 — 어떻게 돈을 벌 수 있나?</div>

  <!-- 설명 (탭바와 콘텐츠 사이) -->
  <div class="card" style="background:#0f172a;color:#fff;margin-bottom:24px;padding:24px">
    <p style="font-size:13px;color:#94a3b8;margin-bottom:16px">
      디지털 도움 서비스는 <strong style="color:#fff">단일 모델이 아닌 5가지 수익 구조를 동시에 운영</strong>할 수 있습니다.
      고객 유형(긴급 vs 정기)에 따라 최적 모델이 다르며, 처음엔 건당으로 시작해 월정액으로 전환하는 흐름이 글로벌 표준입니다.
    </p>
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <div style="background:#1e293b;border-radius:10px;padding:12px 16px;text-align:center;min-width:120px">
        <div style="font-size:20px;font-weight:800;color:#60a5fa">5가지</div>
        <div style="font-size:11px;color:#94a3b8">수익 모델</div>
      </div>
      <div style="background:#1e293b;border-radius:10px;padding:12px 16px;text-align:center;min-width:120px">
        <div style="font-size:20px;font-weight:800;color:#34d399">LTV 극대화</div>
        <div style="font-size:11px;color:#94a3b8">구독 전환 구조</div>
      </div>
      <div style="background:#1e293b;border-radius:10px;padding:12px 16px;text-align:center;min-width:120px">
        <div style="font-size:20px;font-weight:800;color:#f472b6">B2C+B2B2C</div>
        <div style="font-size:11px;color:#94a3b8">이중 수익 구조</div>
      </div>
    </div>
  </div>

  <!-- 5가지 BM 카드 -->
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;margin-bottom:28px">

    <!-- BM 1: 건당 결제 -->
    <div class="card" style="border-top:4px solid #2563eb;padding:20px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
        <div style="background:#2563eb18;border-radius:10px;padding:8px;font-size:22px">🔧</div>
        <div>
          <div style="font-size:15px;font-weight:800;color:#1e293b">건당 결제 (Pay-per-use)</div>
          <div style="font-size:12px;color:#2563eb;font-weight:600">10,000 ~ 30,000원 / 건</div>
        </div>
      </div>
      <p style="font-size:12px;color:#475569;line-height:1.7;margin-bottom:12px">
        문제가 생겼을 때만 결제. 공인인증서 갱신, 전자계약 서명, 비밀번호 초기화 등
        <strong>1회성 긴급 문제</strong>에 최적. 가입 없이 바로 결제 → 진입 장벽 최저.
      </p>
      <div style="background:#f8fafc;border-radius:8px;padding:10px 12px">
        <div style="font-size:11px;color:#64748b;margin-bottom:4px">📌 적합한 상황</div>
        <div style="font-size:12px;color:#1e293b">인증서 오류, 계정 잠금, 폰 느려짐, 전자계약 서명</div>
      </div>
      <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">
        <span style="background:#dbeafe;color:#1e40af;font-size:11px;padding:2px 8px;border-radius:10px">긴급 수요</span>
        <span style="background:#dbeafe;color:#1e40af;font-size:11px;padding:2px 8px;border-radius:10px">가입 불필요</span>
        <span style="background:#dbeafe;color:#1e40af;font-size:11px;padding:2px 8px;border-radius:10px">WTP 가장 높음</span>
      </div>
    </div>

    <!-- BM 2: 충전형 (선불) -->
    <div class="card" style="border-top:4px solid #7c3aed;padding:20px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
        <div style="background:#7c3aed18;border-radius:10px;padding:8px;font-size:22px">🎟️</div>
        <div>
          <div style="font-size:15px;font-weight:800;color:#1e293b">충전형 (선불 크레딧)</div>
          <div style="font-size:12px;color:#7c3aed;font-weight:600">50,000원 충전 → 5회 사용</div>
        </div>
      </div>
      <p style="font-size:12px;color:#475569;line-height:1.7;margin-bottom:12px">
        미리 충전해두면 회당 단가 할인. <strong>자녀가 부모 대신 충전</strong>해주는 구조.
        "우리 엄마 폰에 10만원 충전해드렸어요" → 선물용 구매 유도 가능.
        잔액 소멸 전 리마인드로 재충전 유도.
      </p>
      <div style="background:#f8fafc;border-radius:8px;padding:10px 12px">
        <div style="font-size:11px;color:#64748b;margin-bottom:4px">📌 자녀 구매 시나리오</div>
        <div style="font-size:12px;color:#1e293b">명절·생일 선물용 / 이사·계약 시즌 일시 대량 구매</div>
      </div>
      <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">
        <span style="background:#ede9fe;color:#5b21b6;font-size:11px;padding:2px 8px;border-radius:10px">자녀 결제</span>
        <span style="background:#ede9fe;color:#5b21b6;font-size:11px;padding:2px 8px;border-radius:10px">선물 가능</span>
        <span style="background:#ede9fe;color:#5b21b6;font-size:11px;padding:2px 8px;border-radius:10px">재충전 유도</span>
      </div>
    </div>

    <!-- BM 3: 월정액 구독 -->
    <div class="card" style="border-top:4px solid #16a34a;padding:20px;position:relative">
      <div style="position:absolute;top:-1px;right:16px;background:#16a34a;color:#fff;font-size:10px;font-weight:700;padding:3px 10px;border-radius:0 0 8px 8px">추천 핵심 모델</div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
        <div style="background:#16a34a18;border-radius:10px;padding:8px;font-size:22px">📅</div>
        <div>
          <div style="font-size:15px;font-weight:800;color:#1e293b">월정액 구독 (Subscription)</div>
          <div style="font-size:12px;color:#16a34a;font-weight:600">월 15,000 ~ 29,000원</div>
        </div>
      </div>
      <p style="font-size:12px;color:#475569;line-height:1.7;margin-bottom:12px">
        무제한 채팅 상담 + 월 2~4회 원격 도움 포함.
        <strong>LTV(고객 생애 가치) 극대화</strong> 핵심 모델.
        건당 결제 고객이 2~3회 이용 후 "그냥 구독할게요"로 자연 전환.
        국내 토스·카카오뱅크 구독 모델 벤치마킹.
      </p>
      <div style="background:#f0fdf4;border-radius:8px;padding:10px 12px;border:1px solid #bbf7d0">
        <div style="font-size:11px;color:#15803d;margin-bottom:4px">💰 수익 시뮬레이션</div>
        <div style="font-size:12px;color:#1e293b">구독자 10,000명 × 월 19,000원 = <strong>월 1.9억원</strong></div>
      </div>
      <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">
        <span style="background:#dcfce7;color:#15803d;font-size:11px;padding:2px 8px;border-radius:10px">안정적 MRR</span>
        <span style="background:#dcfce7;color:#15803d;font-size:11px;padding:2px 8px;border-radius:10px">LTV 높음</span>
        <span style="background:#dcfce7;color:#15803d;font-size:11px;padding:2px 8px;border-radius:10px">자동 갱신</span>
      </div>
    </div>

    <!-- BM 4: 상시 전화/채팅 상담 -->
    <div class="card" style="border-top:4px solid #ea580c;padding:20px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
        <div style="background:#ea580c18;border-radius:10px;padding:8px;font-size:22px">📞</div>
        <div>
          <div style="font-size:15px;font-weight:800;color:#1e293b">상시 전화·채팅 상담</div>
          <div style="font-size:12px;color:#ea580c;font-weight:600">월정액 포함 or 분당 200원</div>
        </div>
      </div>
      <p style="font-size:12px;color:#475569;line-height:1.7;margin-bottom:12px">
        "지금 당장 물어볼 사람이 없다"는 니즈.
        <strong>평일 09~21시 실시간 응답</strong>. 화상/전화/카카오 채팅 채널 전부 수용.
        고령층은 텍스트보다 <strong>목소리가 익숙</strong>해서 전화 채널 필수.
        일본 NTT 도코모 "시니어 서포트" 연간 420만 건 처리 사례.
      </p>
      <div style="background:#fff7ed;border-radius:8px;padding:10px 12px;border:1px solid #fed7aa">
        <div style="font-size:11px;color:#c2410c;margin-bottom:4px">📌 해외 벤치마킹</div>
        <div style="font-size:12px;color:#1e293b">일본 도코모 "안심 서포트" 월 308엔(약 2,800원) 추가 → 150만 가입자</div>
      </div>
      <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">
        <span style="background:#ffedd5;color:#9a3412;font-size:11px;padding:2px 8px;border-radius:10px">즉시 해결</span>
        <span style="background:#ffedd5;color:#9a3412;font-size:11px;padding:2px 8px;border-radius:10px">신뢰 형성</span>
        <span style="background:#ffedd5;color:#9a3412;font-size:11px;padding:2px 8px;border-radius:10px">전화 채널</span>
      </div>
    </div>

    <!-- BM 5: 영상 서비스 (콘텐츠) -->
    <div class="card" style="border-top:4px solid #0891b2;padding:20px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
        <div style="background:#0891b218;border-radius:10px;padding:8px;font-size:22px">🎬</div>
        <div>
          <div style="font-size:15px;font-weight:800;color:#1e293b">단계별 영상 가이드 (콘텐츠)</div>
          <div style="font-size:12px;color:#0891b2;font-weight:600">무료 기본 / 프리미엄 월 9,900원</div>
        </div>
      </div>
      <p style="font-size:12px;color:#475569;line-height:1.7;margin-bottom:12px">
        "키오스크 주문하는 법", "배민 주문하는 법" 등
        <strong>초고령층 눈높이 영상</strong> (폰트 크게, 천천히, 손 클로즈업).
        유튜브 무료 공개 → 브랜드 인지도 확보 → 심화 강의/구독 전환.
        미국 AARP "Tech Help" 유튜브 118만 구독자 → 유료 회원 전환율 12%.
      </p>
      <div style="background:#ecfeff;border-radius:8px;padding:10px 12px;border:1px solid #a5f3fc">
        <div style="font-size:11px;color:#0e7490;margin-bottom:4px">📌 콘텐츠 예시</div>
        <div style="font-size:12px;color:#1e293b">카카오택시 부르기 / 공인인증서 갱신 / 병원 예약앱 / QR코드 사용법</div>
      </div>
      <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">
        <span style="background:#cffafe;color:#155e75;font-size:11px;padding:2px 8px;border-radius:10px">광고 수익</span>
        <span style="background:#cffafe;color:#155e75;font-size:11px;padding:2px 8px;border-radius:10px">브랜드 인지</span>
        <span style="background:#cffafe;color:#155e75;font-size:11px;padding:2px 8px;border-radius:10px">유료 전환</span>
      </div>
    </div>

    <!-- BM 6: B2B (기업·기관 납품) -->
    <div class="card" style="border-top:4px solid #db2777;padding:20px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
        <div style="background:#db277718;border-radius:10px;padding:8px;font-size:22px">🏢</div>
        <div>
          <div style="font-size:15px;font-weight:800;color:#1e293b">B2B 기업·기관 납품</div>
          <div style="font-size:12px;color:#db2777;font-weight:600">월 100만~500만원 / 기관</div>
        </div>
      </div>
      <p style="font-size:12px;color:#475569;line-height:1.7;margin-bottom:12px">
        통신사(SKT·KT·LGU+)의 시니어 플랜에 화이트라벨 납품,
        보험사(삼성·한화생명)의 고령 고객 디지털 지원 아웃소싱,
        지자체 디지털 취약계층 지원 사업 수탁.
        <strong>B2C보다 단가 10~50배, 계약 안정성 높음</strong>.
      </p>
      <div style="background:#fdf2f8;border-radius:8px;padding:10px 12px;border:1px solid #fbcfe8">
        <div style="font-size:11px;color:#9d174d;margin-bottom:4px">📌 납품 대상</div>
        <div style="font-size:12px;color:#1e293b">SKT T시니어 / 삼성 서비스센터 / 지자체 어르신 IT교실 / 은행 창구 대체</div>
      </div>
      <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">
        <span style="background:#fce7f3;color:#9d174d;font-size:11px;padding:2px 8px;border-radius:10px">고단가</span>
        <span style="background:#fce7f3;color:#9d174d;font-size:11px;padding:2px 8px;border-radius:10px">계약 안정</span>
        <span style="background:#fce7f3;color:#9d174d;font-size:11px;padding:2px 8px;border-radius:10px">신뢰도↑</span>
      </div>
    </div>

  </div>

  <!-- 수익 모델 성장 전략 -->
  <div class="card" style="background:#f8fafc;padding:20px;margin-bottom:16px">
    <h3 style="font-size:15px;font-weight:800;color:#1e293b;margin-bottom:16px">🚀 단계별 수익 모델 전환 전략</h3>
    <div style="display:flex;gap:0;overflow-x:auto">
      <div style="min-width:180px;background:#dbeafe;border-radius:12px 0 0 12px;padding:16px;text-align:center">
        <div style="font-size:11px;font-weight:700;color:#1e40af;margin-bottom:6px">Phase 1 · 0~6개월</div>
        <div style="font-size:14px;font-weight:800;color:#1e293b;margin-bottom:8px">🔧 건당 결제</div>
        <div style="font-size:11px;color:#475569;line-height:1.5">가입 없이 바로 결제<br>신뢰 쌓기<br>건당 15,000원</div>
      </div>
      <div style="width:30px;background:linear-gradient(90deg,#dbeafe,#ede9fe);display:flex;align-items:center;justify-content:center;font-size:18px">→</div>
      <div style="min-width:180px;background:#ede9fe;padding:16px;text-align:center">
        <div style="font-size:11px;font-weight:700;color:#5b21b6;margin-bottom:6px">Phase 2 · 6~12개월</div>
        <div style="font-size:14px;font-weight:800;color:#1e293b;margin-bottom:8px">🎟️ 충전형 + 📅 구독</div>
        <div style="font-size:11px;color:#475569;line-height:1.5">건당→구독 전환<br>자녀 충전 선물 론칭<br>월 19,000원</div>
      </div>
      <div style="width:30px;background:linear-gradient(90deg,#ede9fe,#dcfce7);display:flex;align-items:center;justify-content:center;font-size:18px">→</div>
      <div style="min-width:180px;background:#dcfce7;padding:16px;text-align:center">
        <div style="font-size:11px;font-weight:700;color:#15803d;margin-bottom:6px">Phase 3 · 12~24개월</div>
        <div style="font-size:14px;font-weight:800;color:#1e293b;margin-bottom:8px">📞 상담 + 🎬 영상</div>
        <div style="font-size:11px;color:#475569;line-height:1.5">전화 상담 채널 추가<br>유튜브 브랜딩<br>구독자 1만명 목표</div>
      </div>
      <div style="width:30px;background:linear-gradient(90deg,#dcfce7,#fce7f3);display:flex;align-items:center;justify-content:center;font-size:18px">→</div>
      <div style="min-width:180px;background:#fce7f3;border-radius:0 12px 12px 0;padding:16px;text-align:center">
        <div style="font-size:11px;font-weight:700;color:#9d174d;margin-bottom:6px">Phase 4 · 24개월+</div>
        <div style="font-size:14px;font-weight:800;color:#1e293b;margin-bottom:8px">🏢 B2B 납품</div>
        <div style="font-size:11px;color:#475569;line-height:1.5">통신사·보험사 계약<br>지자체 수탁<br>월 매출 10억 목표</div>
      </div>
    </div>
  </div>

  <!-- 경쟁 우위 -->
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px">
    <div class="card" style="border-left:4px solid #2563eb;padding:14px">
      <div style="font-size:13px;font-weight:800;color:#2563eb;margin-bottom:6px">🔵 건당 vs 구독 어느 게 더 좋나?</div>
      <p style="font-size:12px;color:#475569;line-height:1.6;margin:0">
        처음엔 건당이 진입 장벽이 낮습니다. 하지만 장기 수익은 구독에서 납니다.
        "2번 이상 쓴 고객"은 구독으로 전환 권유 → 월 19,000원이 건당 15,000원×2회보다 싸다고 느끼게 설계.
      </p>
    </div>
    <div class="card" style="border-left:4px solid #16a34a;padding:14px">
      <div style="font-size:13px;font-weight:800;color:#16a34a;margin-bottom:6px">🟢 왜 전화 채널이 필수인가?</div>
      <p style="font-size:12px;color:#475569;line-height:1.6;margin:0">
        65세+ 어르신의 60%는 앱보다 전화가 편합니다. 카카오톡 채팅도 어려운 분들이
        전화 한 통으로 해결됩니다. 앱 없이도 서비스 이용 가능한 전화 채널은 차별화 무기.
      </p>
    </div>
    <div class="card" style="border-left:4px solid #ea580c;padding:14px">
      <div style="font-size:13px;font-weight:800;color:#ea580c;margin-bottom:6px">🟠 영상 콘텐츠가 마케팅 비용을 0원으로</div>
      <p style="font-size:12px;color:#475569;line-height:1.6;margin:0">
        "배민 주문하는 법 - 어르신용" 영상 하나가 10만뷰 → 구독 문의 유입.
        유튜브·네이버 블로그 콘텐츠로 CAC(고객 획득 비용) 거의 0원 달성 가능.
        AARP(미국 시니어 협회) 유튜브 118만 구독자 사례.
      </p>
    </div>
  </div>
</div>
<!-- ══ end sec-bm ══ -->
"""

# 6가지 관점 섹션 바로 앞에 삽입 (분석 섹션들 중 첫 번째 앞)
insert_marker = '<div class="sec">'  # 첫 번째 sec 바로 앞

if 'id="sec-bm"' in html:
    # 이미 있으면 교체
    import re
    html = re.sub(
        r'<!-- ══ 비즈니스 모델 섹션 ══ -->.*?<!-- ══ end sec-bm ══ -->',
        BM_SECTION.strip(),
        html, flags=re.DOTALL
    )
    print("[OK] BM 섹션 교체 완료")
else:
    # 첫 번째 sec 바로 앞에 삽입
    pos = html.find(insert_marker)
    html = html[:pos] + BM_SECTION + '\n' + html[pos:]
    print("[OK] BM 섹션 삽입 완료")

with open(idx_path, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"파일 크기: {round(len(html)/1024)}KB")
