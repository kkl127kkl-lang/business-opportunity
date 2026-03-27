"""
voices_raw.json → index.html 교체 스크립트 v2
- 실제 HTML 구조에 맞게 카드 생성
- data-cat: kiosk/phone/bank/scam/child/psych (영문)
- 카드 구조: voice-meta, voice-src, voice-text, tag
"""

import json
import re

# ── 카테고리 매핑 (크롤러 한국어 → HTML 영문) ─────────────────
CAT_MAP = {
    "키오스크":     "kiosk",
    "배달앱":       "delivery",
    "쇼핑앱":       "shopping",
    "교통앱":       "transport",
    "병원예약":     "hospital",
    "카카오톡":     "kakao",
    "정부복지":     "govwelfare",
    "공인인증서":   "cert",
    "QR코드":       "qr",
    "기기관리":     "device",
    "여행교통예약": "travel",
    "전자계약":     "contract",
    "스마트폰앱":   "phone",
    "금융은행":     "bank",
    "보이스피싱":   "scam",
    "자녀피로":     "child",
    "심리적충격":   "psych",
}

CAT_LABEL = {
    "kiosk":      ("키오스크", "🖥️"),
    "delivery":   ("배달앱", "🍔"),
    "shopping":   ("쇼핑앱", "🛍️"),
    "transport":  ("교통·택시앱", "🚕"),
    "hospital":   ("병원·예약앱", "🏥"),
    "kakao":      ("카카오톡·SNS", "💬"),
    "govwelfare": ("정부·복지 서비스", "🏛️"),
    "cert":       ("공인인증서", "🔐"),
    "qr":         ("QR코드", "📷"),
    "device":     ("기기 관리", "📲"),
    "travel":     ("여행·교통 예약", "🚄"),
    "contract":   ("전자계약·서명", "📋"),
    "phone":      ("스마트폰·기타", "📱"),
    "bank":       ("금융·은행", "🏦"),
    "scam":       ("보이스피싱", "⚠️"),
    "child":      ("자녀 피로", "👪"),
    "psych":      ("심리·소외", "💔"),
}

# ── JSON 로드 ──────────────────────────────────────────────────
with open("C:/Users/Administrator/OneDrive/바탕 화면/06_개발IT/item001-deploy/voices_raw.json",
          encoding="utf-8") as f:
    data = json.load(f)

voices = data["voices"]
total  = data["total"]

print(f"총 {total}개 로드")

# ── HTML 이스케이프 ────────────────────────────────────────────
def esc(s):
    return (str(s).replace("&","&amp;").replace("<","&lt;")
                  .replace(">","&gt;").replace('"',"&quot;"))

# ── 출처 도메인 축약 ──────────────────────────────────────────
def short_src(url, press):
    try:
        from urllib.parse import urlparse
        domain = urlparse(url).netloc.replace("www.","")
        if press and press not in ("뉴스","기사"):
            return press
        return domain[:25] or press
    except:
        return press or "뉴스"

# ── 카드 한 개 HTML 생성 ──────────────────────────────────────
def make_card(v):
    cat_kr = v.get("cat","키오스크")
    cat_en = CAT_MAP.get(cat_kr, "kiosk")
    label, emoji = CAT_LABEL.get(cat_en, ("기타","📌"))

    spk  = esc(v.get("speaker","시민"))
    txt  = esc(v.get("text",""))[:300]
    url  = v.get("url","")
    src  = short_src(url, v.get("source",""))
    date = v.get("date","")[:7]
    src_label = esc(f"{src} {date}".strip())

    return f'''    <div class="voice-card" data-cat="{cat_en}">
      <div class="voice-meta"><span class="voice-who">{emoji} {spk}</span><a class="voice-src" href="{esc(url)}" target="_blank">{src_label}</a></div>
      <p class="voice-text">"{txt}"</p>
      <div style="margin-top:8px"><span class="tag tr">{label}</span></div>
    </div>'''

# ── 전체 카드 블록 생성 ────────────────────────────────────────
all_cards = "\n".join(make_card(v) for v in voices)

# ── 카테고리별 집계 ────────────────────────────────────────────
counts = {}
for v in voices:
    en = CAT_MAP.get(v.get("cat",""), "kiosk")
    counts[en] = counts.get(en, 0) + 1

# ── 필터 버튼 HTML 교체 ────────────────────────────────────────
filter_html = f'    <button class="tab-btn on" onclick="filterVoice(\'all\',this)">전체 ({total})</button>\n'
for en, (label, emoji) in CAT_LABEL.items():
    cnt = counts.get(en, 0)
    filter_html += f'    <button class="tab-btn" onclick="filterVoice(\'{en}\',this)">{emoji} {label} ({cnt})</button>\n'

# ── index.html 읽기 ────────────────────────────────────────────
idx_path = "C:/Users/Administrator/OneDrive/바탕 화면/06_개발IT/item001-deploy/index.html"
with open(idx_path, encoding="utf-8") as f:
    html = f.read()

# ── 1) 필터 버튼 교체 ──────────────────────────────────────────
# 패턴: <button class="tab-btn on" onclick="filterVoice('all',this)">...
# ~ 마지막 </div> (필터 버튼 컨테이너 닫힘)
html = re.sub(
    r'(<button class="tab-btn on" onclick="filterVoice\(\'all\',this\)">).*?(\s*</div>\s*<!-- \?\?\? \?\? -->)',
    rf'\n{filter_html}  \2',
    html, flags=re.DOTALL
)
# fallback: 더 단순한 패턴
if "전체 (" not in html:
    html = re.sub(
        r'(<button class="tab-btn on"[^>]*>.*?</button>\s*(?:<button[^>]*>.*?</button>\s*)*)</div>',
        rf'{filter_html}  </div>',
        html, count=1, flags=re.DOTALL
    )

# ── 2) 보이스 카드 교체: <div id="voices"> ~ </div><!-- end voices --> ──
html = re.sub(
    r'(<div id="voices">).*?(</div><!-- end voices -->)',
    rf'\1\n{all_cards}\n  \2',
    html, flags=re.DOTALL
)

# ── 3) 헤더 수집 개수 업데이트 ────────────────────────────────
html = re.sub(r'실제 고객 목소리 \d+개', f'실제 고객 목소리 {total}개', html)
html = re.sub(r'총 \d+개 수집', f'총 {total}개 수집', html)
# 섹션 제목에 개수 표시
html = re.sub(
    r'(실제 고객 목소리[^<]{0,20})<span[^>]*>\d+개',
    rf'\g<1><span style="background:#ef4444;color:#fff;padding:2px 8px;border-radius:12px;font-size:0.85em">{total}개',
    html
)

# ── 저장 ──────────────────────────────────────────────────────
with open(idx_path, "w", encoding="utf-8") as f:
    f.write(html)

# 결과 확인
with open(idx_path, encoding="utf-8") as f:
    result = f.read()
card_count = len(re.findall(r'class="voice-card"', result))
print(f"저장 완료! voice-card 개수: {card_count}개")
print("카테고리별:")
for en, cnt in counts.items():
    print(f"  {en}: {cnt}개")
