"""
커뮤니티 댓글 크롤러 v2
수정사항:
- 클리앙: a.subject_fixed 셀렉터 수정
- DC인사이드: a.tit_txt / p.link_dsc_txt 셀렉터 수정
- 82cook: SSL verify=False 추가
- 보배드림: 셀렉터 검증 후 수정
- 네이버 블로그: view_wrap 셀렉터 수정
"""

import requests
from bs4 import BeautifulSoup
import json, time, re, urllib.parse, urllib3
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

# SSL 경고 무시 (82cook 등 인증서 오류 사이트)
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept-Language": "ko-KR,ko;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

KEYWORDS = [
    # 키오스크
    "키오스크 어렵다",
    "키오스크 못하겠다",
    "키오스크 당황",
    "엄마 키오스크",
    # 배달앱
    "배민 주문 어렵다 부모님",
    "배달의민족 어머니 못하신다",
    "쿠팡이츠 어르신",
    "배달앱 어렵다 노인",
    # 쇼핑앱
    "쿠팡 어렵다 부모님",
    "인터넷쇼핑 어머니 못하신다",
    "온라인쇼핑 어르신 불편",
    # 교통앱
    "카카오택시 어렵다 부모님",
    "카카오택시 어르신",
    "택시앱 어려워 노인",
    # 병원예약
    "병원예약 앱 어렵다 부모님",
    "진료예약 어머니 못하신다",
    # 카카오톡/SNS
    "카카오톡 어렵다 부모님",
    "영상통화 어머니 못하신다",
    "유튜브 어떻게 부모님",
    # 정부·복지 서비스
    "정부24 어렵다 부모님",
    "복지 신청 어머니 못하신다",
    "국민연금 앱 어르신",
    # 공인인증서
    "공인인증서 갱신 어렵다 부모님",
    "인증서 오류 어머니",
    # QR코드
    "QR코드 어렵다 부모님",
    "큐알 찍기 어머니 모른다",
    # 기기 관리
    "스마트폰 저장공간 어머니",
    "폰 느려 부모님",
    "와이파이 연결 어렵다 어머니",
    # 여행·교통 예약
    "KTX 예매 어렵다 부모님",
    "기차표 예매 어머니 못하신다",
    # 전자계약
    "전자서명 어렵다 부모님",
    "전자계약 어머니 못하신다",
    # 금융/스마트폰 일반
    "스마트폰 어렵다 부모님",
    "부모님 앱 못하신다",
    "아버지 스마트폰",
    "은행앱 어렵다",
    "모바일뱅킹 어렵다",
    "부모님 폰 가르쳐드리기",
    "보이스피싱 어머니",
    "어르신 디지털",
    "부모님 스마트폰 질문",
    "디지털 소외 어르신",
]

RELEVANT = [
    "키오스크", "무인", "앱", "스마트폰", "핸드폰",
    "어렵", "모르", "못하", "힘들", "불편", "답답", "창피",
    "사기", "피싱", "디지털", "가르쳐", "포기",
    "은행", "ATM", "카카오", "유튜브", "설치",
    "배달의민족", "배민", "쿠팡이츠", "쿠팡", "배달앱",
    "카카오택시", "카카오맵", "티맵",
    "병원예약", "진료예약",
    "카카오톡", "영상통화",
    "정부24", "복지로", "국민연금", "건강보험",
    "공인인증서", "공동인증서", "인증서",
    "QR코드", "QR", "큐알",
    "저장공간", "업데이트", "와이파이",
    "KTX", "기차표", "항공권",
    "전자서명", "전자계약",
    "부모님", "어머니", "아버지", "어르신", "노인", "할머니", "할아버지",
]

def is_relevant(text):
    return any(kw in text for kw in RELEVANT)

def req(url, verify=False):
    """기본 GET 요청 헬퍼 (Windows SSL 인증서 오류 우회: verify=False)"""
    return requests.get(url, headers=HEADERS, timeout=10, verify=verify)


# ══════════════════════════════════════════════════════════════
# 1. 클리앙
# ══════════════════════════════════════════════════════════════
def crawl_clien(keyword):
    results = []
    try:
        encoded = urllib.parse.quote(keyword)
        url = f"https://www.clien.net/service/search?q={encoded}&sort=recency&p=0&boardCd=&isBoard=false"
        r = req(url)
        r.encoding = "utf-8"
        s = BeautifulSoup(r.text, "lxml")

        for item in s.select("div.list_item")[:12]:
            # 제목 + 링크: a.subject_fixed
            a = item.select_one("a.subject_fixed")
            if not a:
                continue
            title = a.get_text(strip=True)
            href  = a.get("href","")
            if href and not href.startswith("http"):
                href = "https://www.clien.net" + href
            # 미리보기 텍스트
            preview = item.select_one("div.preview span")
            prev_txt = preview.get_text(strip=True) if preview else ""
            # 날짜
            date_el = item.select_one("span.time")
            date = date_el.get_text(strip=True)[:10] if date_el else ""

            combined = title + " " + prev_txt
            if not is_relevant(combined):
                continue

            # 게시글 본문·댓글 접속
            try:
                pr = req(href)
                pr.encoding = "utf-8"
                ps = BeautifulSoup(pr.text, "lxml")
                # 본문
                body_el = ps.select_one("div.post_article") or ps.select_one("div.article_view")
                body = body_el.get_text(" ",strip=True)[:300] if body_el else prev_txt
                if is_relevant(body) and len(body) > 20:
                    results.append({
                        "site":"클리앙","type":"게시글",
                        "text":body[:250],"post_title":title,"url":href,"date":date
                    })
                # 댓글
                for cmt in ps.select("div.comment_view")[:8]:
                    txt = cmt.get_text(" ",strip=True)
                    txt = re.sub(r'\s+',' ',txt).strip()
                    if is_relevant(txt) and 15 <= len(txt) <= 280:
                        results.append({
                            "site":"클리앙","type":"댓글",
                            "text":txt[:250],"post_title":title,"url":href,"date":date
                        })
            except:
                if is_relevant(prev_txt) and len(prev_txt) > 15:
                    results.append({
                        "site":"클리앙","type":"게시글",
                        "text":prev_txt[:250],"post_title":title,"url":href,"date":date
                    })
            time.sleep(0.4)
    except Exception as e:
        print(f"  [클리앙 오류] {e}")
    return results


# ══════════════════════════════════════════════════════════════
# 2. DC인사이드
# ══════════════════════════════════════════════════════════════
def crawl_dcinside(keyword):
    results = []
    try:
        encoded = urllib.parse.quote(keyword)
        url = f"https://search.dcinside.com/post/q/{encoded}"
        r = req(url)
        r.encoding = "utf-8"
        s = BeautifulSoup(r.text, "lxml")

        for li in s.select("ul.sch_result_list li")[:12]:
            a    = li.select_one("a.tit_txt")
            desc = li.select_one("p.link_dsc_txt")
            date_el = li.select_one("span.date_time")
            if not a:
                continue
            title = a.get_text(strip=True)
            href  = a.get("href","")
            desc_txt = desc.get_text(strip=True) if desc else ""
            date = date_el.get_text(strip=True) if date_el else ""

            combined = title + " " + desc_txt
            if not is_relevant(combined):
                continue

            if desc_txt and len(desc_txt) > 15:
                results.append({
                    "site":"DC인사이드","type":"게시글",
                    "text":desc_txt[:250],"post_title":title,"url":href,"date":date
                })
            elif is_relevant(title):
                results.append({
                    "site":"DC인사이드","type":"게시글",
                    "text":title,"post_title":title,"url":href,"date":date
                })
    except Exception as e:
        print(f"  [DC인사이드 오류] {e}")
    return results


# ══════════════════════════════════════════════════════════════
# 3. 네이버 블로그
# ══════════════════════════════════════════════════════════════
def crawl_naver_blog(keyword):
    results = []
    try:
        encoded = urllib.parse.quote(keyword)
        url = f"https://search.naver.com/search.naver?where=blog&query={encoded}"
        r = req(url)
        r.encoding = "utf-8"
        s = BeautifulSoup(r.text, "lxml")

        # 실제 블로그 결과 구조: div.total_wrap 또는 div.view_wrap
        for item in (s.select("div.total_wrap") or s.select("div.view_wrap") or s.select("li.bx"))[:10]:
            title_el = (item.select_one("a.title_link") or item.select_one("a.api_txt_lines")
                        or item.select_one("a.link_tit"))
            desc_el  = (item.select_one("div.dsc_wrap") or item.select_one("div.api_txt_lines")
                        or item.select_one("a.desc"))
            date_el  = item.select_one("span.sub_time") or item.select_one("span.date")

            if not title_el:
                continue
            title = title_el.get_text(strip=True)
            href  = title_el.get("href","")
            desc  = desc_el.get_text(strip=True) if desc_el else ""
            date  = date_el.get_text(strip=True)[-10:] if date_el else ""

            if not is_relevant(desc + title):
                continue
            txt = desc if desc else title
            if len(txt) > 15:
                results.append({
                    "site":"네이버 블로그","type":"블로그",
                    "text":txt[:250],"post_title":title,"url":href,"date":date
                })
    except Exception as e:
        print(f"  [네이버블로그 오류] {e}")
    return results


# ══════════════════════════════════════════════════════════════
# 4. 82cook (SSL verify=False)
# ══════════════════════════════════════════════════════════════
def crawl_82cook(keyword):
    results = []
    try:
        encoded = urllib.parse.quote(keyword)
        url = f"https://www.82cook.com/entiz/search.php?searchword={encoded}"
        r = requests.get(url, headers=HEADERS, timeout=10, verify=False)
        r.encoding = "utf-8"
        s = BeautifulSoup(r.text, "lxml")

        # 실제 구조 탐색
        for a in s.select("a[href*='/entiz/read.php']")[:15]:
            title = a.get_text(strip=True)
            href  = a.get("href","")
            if href and not href.startswith("http"):
                href = "https://www.82cook.com" + href
            if not is_relevant(title) or len(title) < 5:
                continue

            # 본문 접속
            try:
                pr = requests.get(href, headers=HEADERS, timeout=10, verify=False)
                pr.encoding = "utf-8"
                ps = BeautifulSoup(pr.text, "lxml")
                # 본문
                body_el = ps.select_one("div.write_div") or ps.select_one("div#writeContents") or ps.select_one("div.read_body")
                body = body_el.get_text(" ",strip=True)[:300] if body_el else ""
                if is_relevant(body) and len(body) > 20:
                    results.append({
                        "site":"82cook","type":"게시글",
                        "text":body[:250],"post_title":title,"url":href,"date":""
                    })
                # 댓글
                for cmt in ps.select("div.comment_cont, div.reComment, li.replyList")[:8]:
                    txt = re.sub(r'\s+',' ', cmt.get_text(" ",strip=True)).strip()
                    if is_relevant(txt) and 15 <= len(txt) <= 280:
                        results.append({
                            "site":"82cook","type":"댓글",
                            "text":txt[:250],"post_title":title,"url":href,"date":""
                        })
            except:
                results.append({
                    "site":"82cook","type":"게시글",
                    "text":title,"post_title":title,"url":href,"date":""
                })
            time.sleep(0.4)
    except Exception as e:
        print(f"  [82cook 오류] {e}")
    return results


# ══════════════════════════════════════════════════════════════
# 5. 보배드림
# ══════════════════════════════════════════════════════════════
def crawl_bobae(keyword):
    results = []
    try:
        encoded = urllib.parse.quote(keyword)
        url = f"https://www.bobaedream.co.kr/search?searchCode=community&keyword={encoded}&startDate=&endDate="
        r = req(url)
        r.encoding = "utf-8"
        s = BeautifulSoup(r.text, "lxml")

        for a in s.select("a.bTitle, td.tit a, .tit_area a")[:12]:
            title = a.get_text(strip=True)
            href  = a.get("href","")
            if href and not href.startswith("http"):
                href = "https://www.bobaedream.co.kr" + href
            if not is_relevant(title) or len(title) < 8:
                continue
            results.append({
                "site":"보배드림","type":"게시글",
                "text":title,"post_title":title,"url":href,"date":""
            })
    except Exception as e:
        print(f"  [보배드림 오류] {e}")
    return results


# ── 메인 실행 ──────────────────────────────────────────────────
def main():
    all_results = []
    seen = set()

    print("=" * 55)
    print("  커뮤니티 댓글 크롤러 v2")
    print("=" * 55)

    crawlers = [
        ("클리앙",      crawl_clien),
        ("DC인사이드",  crawl_dcinside),
        ("네이버블로그", crawl_naver_blog),
        ("82cook",     crawl_82cook),
        ("보배드림",    crawl_bobae),
    ]

    for site_name, fn in crawlers:
        print(f"\n[{site_name}] 크롤링...")
        cnt = 0
        with ThreadPoolExecutor(max_workers=5) as ex:
            futures = {ex.submit(fn, kw): kw for kw in KEYWORDS}
            for future in as_completed(futures):
                try:
                    for item in future.result(timeout=20):
                        key = item["text"][:60]
                        if key not in seen:
                            seen.add(key)
                            all_results.append(item)
                            cnt += 1
                except:
                    pass
        print(f"  -> {cnt}개 / 전체: {len(all_results)}개")

    out = {
        "collected_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "total": len(all_results),
        "comments": all_results,
    }
    with open("C:/Users/Administrator/OneDrive/바탕 화면/06_개발IT/item001-deploy/community_raw.json",
              "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*55}")
    print(f"  완료! 총 {len(all_results)}개 저장")
    print(f"{'='*55}")

if __name__ == "__main__":
    main()
