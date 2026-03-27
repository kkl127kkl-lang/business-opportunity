"""
index.html을 2탭 구조로 변환
탭1 (왼쪽): 뉴스 기사 목소리 (기존 469개)
탭2 (오른쪽): 커뮤니티 댓글 (community_raw.json에서 로드)
"""

import json, re

# ── index.html 읽기 ────────────────────────────────────────────
idx_path = "C:/Users/Administrator/OneDrive/바탕 화면/06_개발IT/item001-deploy/index.html"
with open(idx_path, encoding="utf-8") as f:
    html = f.read()

# ── community_raw.json 로드 ────────────────────────────────────
try:
    with open("C:/Users/Administrator/OneDrive/바탕 화면/06_개발IT/item001-deploy/community_raw.json",
              encoding="utf-8") as f:
        cdata = json.load(f)
    comments = cdata["comments"]
    ctotal   = cdata["total"]
except:
    comments = []
    ctotal   = 0

print(f"커뮤니티 댓글: {ctotal}개 로드")

# ── HTML 이스케이프 ────────────────────────────────────────────
def esc(s):
    return str(s).replace("&","&amp;").replace("<","&lt;").replace(">","&gt;").replace('"',"&quot;")

# ── 사이트별 배지 색상 ─────────────────────────────────────────
SITE_COLORS = {
    "클리앙":     "#2563eb",
    "DC인사이드": "#dc2626",
    "네이버 블로그": "#03c75a",
    "82cook":    "#e11d48",
    "보배드림":   "#f59e0b",
}
TYPE_ICON = {"댓글": "💬", "게시글": "📝", "블로그": "✍️"}

def make_community_card(c, idx):
    site  = esc(c.get("site",""))
    ctype = c.get("type","게시글")
    txt   = esc(c.get("text",""))[:280]
    title = esc(c.get("post_title",""))[:60]
    url   = c.get("url","")
    date  = esc(c.get("date",""))
    color = SITE_COLORS.get(c.get("site",""), "#6b7280")
    icon  = TYPE_ICON.get(ctype, "📌")

    return f'''    <div class="voice-card cmmt-card">
      <div class="voice-meta">
        <span class="voice-who">{icon} {site} · {ctype}</span>
        <a class="voice-src" href="{esc(url)}" target="_blank" rel="noopener"
           style="background:{color}15;color:{color};padding:2px 8px;border-radius:6px;font-size:11px">
          🔗 원문 보기 {f"· {date}" if date else ""}
        </a>
      </div>
      <p style="font-size:11px;color:#94a3b8;margin-bottom:6px">게시글: {title}</p>
      <p class="voice-text">"{txt}"</p>
      <div style="margin-top:8px">
        <span class="tag" style="background:{color}18;color:{color};border:1px solid {color}30">{site}</span>
        <span class="tag tgr">{ctype}</span>
      </div>
    </div>'''

# 커뮤니티 카드 전체 생성
community_cards_html = "\n".join(make_community_card(c, i) for i, c in enumerate(comments))

# 사이트별 집계
site_counts = {}
for c in comments:
    s = c.get("site","기타")
    site_counts[s] = site_counts.get(s, 0) + 1

# 커뮤니티 필터 버튼
comm_filter_btns = f'    <button class="tab-btn on" onclick="filterComm(\'all\',this)">전체 ({ctotal})</button>\n'
for site, cnt in site_counts.items():
    comm_filter_btns += f'    <button class="tab-btn" onclick="filterComm(\'{site}\',this)">{site} ({cnt})</button>\n'

# ── CSS 추가 (메인탭용) ────────────────────────────────────────
extra_css = """
/* ── 메인 탭 (뉴스/커뮤니티 전환) ── */
.main-tab-wrap{display:flex;gap:0;margin-bottom:0;border-bottom:2px solid #e5e7eb}
.main-tab-btn{padding:12px 28px;border:none;background:none;font-size:15px;font-weight:700;
  color:#6b7280;cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-2px;transition:.2s}
.main-tab-btn.on{color:#1a56db;border-bottom-color:#1a56db}
.main-tab-btn:hover{color:#1a56db}
.main-panel{display:none}.main-panel.on{display:block}
/* 커뮤니티 카드 출처 링크 강조 */
.cmmt-card .voice-src{border-radius:6px;padding:3px 10px !important}
"""

# ── SECTION 1 전체를 새 탭 구조로 교체 ────────────────────────
# 기존 섹션1 헤더 ~ voices 끝까지 찾아서 교체

old_section_start = '''<div class="sec">
  <div class="sec-title">💬 실제 고객 목소리 — 실제 인물·출처 기반 수집</div>'''

# voices 섹션 끝 마커 — 2탭 구조가 이미 있으면 커뮤니티 패널 끝까지 잡아서 중복 방지
if '</div><!-- end main-panel-community -->' in html:
    old_section_end_marker = '</div><!-- end main-panel-community -->'
else:
    old_section_end_marker = '</div><!-- end voices -->'

# 새로운 섹션 구조
new_section_header = f'''<div class="sec">
  <div class="sec-title">💬 실제 고객 목소리 — 실제 인물·출처 기반 수집</div>

  <!-- ── 메인 탭 전환 ── -->
  <div class="card" style="padding:0;overflow:hidden;margin-bottom:20px">
    <div style="padding:16px 24px;background:#f8faff;border-bottom:1px solid #e5e7eb">
      <p style="font-size:13px;color:#475569;margin:0">
        📰 <strong>뉴스 기사</strong>는 언론 인터뷰·공식 자료 기반 &nbsp;|&nbsp;
        💬 <strong>커뮤니티 댓글</strong>은 실제 이용자가 직접 작성한 글·댓글
      </p>
    </div>
    <div style="padding:0 24px">
      <div class="main-tab-wrap">
        <button class="main-tab-btn on" onclick="switchMain('news',this)">
          📰 뉴스 기사 목소리 (747개)
        </button>
        <button class="main-tab-btn" onclick="switchMain('community',this)">
          💬 커뮤니티 댓글 ({ctotal}개)
        </button>
      </div>
    </div>
  </div>

  <!-- ── 탭1: 뉴스 기사 ── -->
  <div id="main-panel-news" class="main-panel on">
    <div class="card" style="background:#f0f9ff;border:1px solid #bae6fd;margin-bottom:16px;padding:16px">
      <p style="font-size:13px;color:#0369a1"><strong>📌 수집 방법:</strong>
        농민신문·경향신문·한국경제·오마이뉴스·YTN 등 언론 인터뷰, 국가인권위원회 자료,
        분당서울대병원 연구, 서울디지털재단 조사 등 공식 출처 기반.
        Python 크롤러로 네이버 뉴스 검색 → 실제 기사 본문 파싱하여 수집.</p>
    </div>
    <!-- 카테고리 탭 -->
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">'''

# 기존 카테고리 필터 버튼 유지 (voices div 바로 앞까지)
# 기존 HTML에서 voices 카테고리 버튼 찾기
cat_btns_match = re.search(
    r'<!-- 카테고리 탭 -->\s*<div[^>]*>(.*?)</div>\s*<!-- 목소리 목록 -->',
    html, re.DOTALL
)
existing_cat_btns = cat_btns_match.group(1).strip() if cat_btns_match else ""

# voices 내용 (기존 카드들)
voices_start = html.find('<div id="voices">')
voices_end   = html.find('</div><!-- end voices -->') + len('</div><!-- end voices -->')
existing_voices_inner = html[voices_start:voices_end]

new_voices_block = f'''
    </div>
    <!-- 목소리 목록 -->
    {existing_voices_inner}
  </div><!-- end main-panel-news -->

  <!-- ── 탭2: 커뮤니티 댓글 ── -->
  <div id="main-panel-community" class="main-panel">
    <div class="card" style="background:#fdf4ff;border:1px solid #e9d5ff;margin-bottom:16px;padding:16px">
      <p style="font-size:13px;color:#7c3aed">
        <strong>📌 수집 출처:</strong>
        클리앙 · DC인사이드 · 네이버 블로그 · 82cook · 보배드림 —
        실제 이용자가 직접 작성한 게시글·댓글입니다.
        각 카드의 <strong>🔗 원문 보기</strong>를 클릭하면 실제 게시물로 이동합니다.
      </p>
    </div>
    <!-- 사이트별 필터 -->
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">
{comm_filter_btns}    </div>
    <!-- 커뮤니티 카드 목록 -->
    <div id="community-cards">
{community_cards_html}
    </div>
  </div><!-- end main-panel-community -->'''

# ── HTML 교체 실행 ────────────────────────────────────────────
# 1) style 태그 닫기 전에 CSS 추가
html = html.replace("</style>", extra_css + "</style>", 1)

# 2) 섹션1 전체 교체
# 기존: 섹션 시작 ~ voices 끝
# rfind: 마지막 마커 위치를 사용해 중복 섹션을 한번에 제거
section_start_idx = html.find(old_section_start)
section_end_idx   = html.rfind(old_section_end_marker) + len(old_section_end_marker)

new_section_full = (new_section_header
                    + "\n      " + existing_cat_btns
                    + new_voices_block)

html = html[:section_start_idx] + new_section_full + html[section_end_idx:]

# ── JavaScript 추가 (메인탭 전환 + 커뮤니티 필터) ─────────────
extra_js = """
// ── 메인 탭 전환 (뉴스 ↔ 커뮤니티) ──────────────────────────
function switchMain(panel, btn) {
  document.querySelectorAll('.main-panel').forEach(function(el) {
    el.classList.remove('on');
  });
  document.querySelectorAll('.main-tab-btn').forEach(function(b) {
    b.classList.remove('on');
  });
  document.getElementById('main-panel-' + panel).classList.add('on');
  btn.classList.add('on');
}

// ── 커뮤니티 사이트별 필터 ────────────────────────────────────
function filterComm(site, btn) {
  document.querySelectorAll('.cmmt-card').forEach(function(c) {
    var cardSite = c.querySelector('.voice-who') ?
      c.querySelector('.voice-who').textContent.split('·')[0].trim().replace(/^[^ ]+ /, '') : '';
    c.style.display = (site === 'all' || cardSite === site) ? 'block' : 'none';
  });
  document.querySelectorAll('[onclick^="filterComm"]').forEach(function(b) {
    b.classList.remove('on');
  });
  btn.classList.add('on');
}
"""

# </body> 직전에 script 삽입
html = html.replace("</body>", f"<script>{extra_js}</script>\n</body>", 1)

# ── 저장 ──────────────────────────────────────────────────────
with open(idx_path, "w", encoding="utf-8") as f:
    f.write(html)

# 검증
with open(idx_path, encoding="utf-8") as f:
    result = f.read()

news_cards   = len(re.findall(r'class="voice-card"', result))
comm_cards   = len(re.findall(r'class="voice-card cmmt-card"', result))
main_tabs    = len(re.findall(r'main-tab-btn', result))

print(f"저장 완료!")
print(f"  뉴스 카드:     {news_cards}개")
print(f"  커뮤니티 카드: {comm_cards}개")
print(f"  메인탭 버튼:   {main_tabs}개")
