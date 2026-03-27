"""
index.html 섹션 재배치
- 분석/통계/방법론 → 위 (먼저 보이게)
- 고객 목소리(뉴스+커뮤니티) → 아래 (나중에 보이게)
"""
import re, sys
sys.stdout.reconfigure(encoding='utf-8')

idx_path = "index.html"
with open(idx_path, encoding='utf-8') as f:
    html = f.read()

# sec 블록 시작 위치 수집
starts = [m.start() for m in re.finditer(r'<div class="sec"', html)]
print(f"총 sec 블록: {len(starts)}개")

# hero: 첫 sec 이전
hero = html[:starts[0]]

# verdict 위치
verdict_pos = html.find('<div class="verdict">')

# 각 블록 추출
blocks = []
for i, s in enumerate(starts):
    end = starts[i+1] if i+1 < len(starts) else verdict_pos
    block_html = html[s:end]
    title_m = re.search(r'sec-title">(.{1,80})', block_html)
    title = title_m.group(1)[:60] if title_m else "?"
    blocks.append({'html': block_html, 'title': title, 'idx': i})
    print(f"  블록{i+1}: {title[:50]}")

# verdict 이후
tail = html[verdict_pos:]

# 중복 제거
seen = set()
unique = []
for b in blocks:
    key = b['title'][:25]
    if key not in seen:
        seen.add(key)
        unique.append(b)
    else:
        print(f"  [중복 제거] {b['title'][:40]}")

print(f"\n중복 제거 후: {len(unique)}개")

# 블록 찾기 함수
def find_block(keyword):
    for b in unique:
        if keyword in b['title']:
            return b
    return None

# 원하는 순서: 분석이 위, 고객목소리가 아래
order_keywords = [
    # 분석 섹션 (위로)
    "비즈니스 모델",
    "공식 통계",
    "수치로 보는",
    "6가지 관점",
    "점수표",
    "전문가 관점",
    "니즈를 발견",
    "니즈 발견",
    "성공 가능성",
    "수익 시뮬",
    "개발자 언어",
    # 고객 목소리 (아래로)
    "실제 고객 목소리",
    "실제 고객",
]

ordered = []
used = set()
for kw in order_keywords:
    b = find_block(kw)
    if b and b['idx'] not in used:
        ordered.append(b)
        used.add(b['idx'])
        print(f"  순서: {b['title'][:50]}")

# 빠진 블록 추가 (고객 목소리 바로 앞에)
voice_block = None
rest = []
for b in unique:
    if b['idx'] not in used:
        if '고객' in b['title'] or '목소리' in b['title'] or 'main-tab' in b['html'][:500]:
            voice_block = b
        else:
            rest.append(b)
        used.add(b['idx'])
        print(f"  [나머지] {b['title'][:50]}")

# 고객 목소리가 ordered에 없으면 맨 뒤에 추가
# rest는 고객 목소리 앞에 삽입
final_ordered = []
for b in ordered:
    if '고객' in b['title'] or '목소리' in b['title']:
        # 고객 목소리 앞에 나머지 삽입
        final_ordered.extend(rest)
        final_ordered.append(b)
    else:
        final_ordered.append(b)

# 혹시 rest가 아직 안 들어갔으면
if not any('고객' in b['title'] or '목소리' in b['title'] for b in ordered):
    final_ordered.extend(rest)
    if voice_block:
        final_ordered.append(voice_block)

# 새 HTML 조립
new_body = hero
for b in final_ordered:
    new_body += b['html']
new_body += tail

with open(idx_path, 'w', encoding='utf-8') as f:
    f.write(new_body)

print(f"\n저장 완료! 크기: {round(len(new_body)/1024)}KB")
print(f"\n최종 순서:")
for i, b in enumerate(final_ordered):
    tag = "📊 분석" if '고객' not in b['title'] and '목소리' not in b['title'] else "💬 목소리"
    print(f"  {i+1}. [{tag}] {b['title'][:50]}")
