"""
중장년 디지털 불편 고객 목소리 크롤러 v3
- ThreadPoolExecutor 병렬 요청으로 속도 대폭 향상
- 네이버 뉴스 검색 + 직접 언론사 사이트 병행
- 실행 예상 시간: 3~5분
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re
import urllib.parse
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept-Language": "ko-KR,ko;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

# ── 직접 검색할 언론사 사이트 목록 ────────────────────────────
# 각 사이트별 검색 URL 패턴
DIRECT_SITES = [
    # 노인/고령자 전문 매체
    ("https://www.100ssd.co.kr/news/articleList.html?sc_word={q}&view_type=sm", "노인신문"),
    # 뉴시스 검색
    ("https://www.newsis.com/search/?q={q}", "뉴시스"),
    # 오마이뉴스
    ("https://www.ohmynews.com/NWS_Web/Search/SearchList.aspx?q={q}", "오마이뉴스"),
    # 연합뉴스 검색
    ("https://www.yna.co.kr/search/index?query={q}", "연합뉴스"),
    # 한겨레
    ("https://www.hani.co.kr/arti/SEARCH/?query={q}", "한겨레"),
]

# ── 검색 키워드 (카테고리별) ───────────────────────────────────
SEARCH_QUERIES = {
    "키오스크": [
        "키오스크 어렵다 노인",
        "키오스크 어르신 불편",
        "무인단말기 고령자",
        "키오스크 디지털 소외",
    ],
    "배달앱": [
        "배달의민족 주문 어렵다 노인",
        "배민 앱 어르신 불편",
        "쿠팡이츠 사용 어렵다 고령",
        "배달앱 주문 못하겠다 어머니",
    ],
    "쇼핑앱": [
        "쿠팡 앱 어렵다 노인",
        "인터넷쇼핑 어르신 불편",
        "온라인 쇼핑 못하겠다 어머니",
        "스마트폰 쇼핑 어려움 중장년",
    ],
    "교통앱": [
        "카카오택시 어렵다 노인",
        "대중교통 앱 어르신 불편",
        "지하철 앱 고령자 어려움",
        "카카오맵 티맵 어르신",
    ],
    "병원예약": [
        "병원예약 앱 어렵다 노인",
        "진료예약 어르신 불편",
        "공공앱 어렵다 어르신",
        "스마트폰 예약 어려움 고령자",
    ],
    "카카오톡": [
        "카카오톡 어렵다 어르신",
        "영상통화 못하겠다 어머니",
        "유튜브 사용법 어르신",
        "SNS 어려움 중장년 노인",
    ],
    "정부복지": [
        "정부24 어렵다 노인",
        "복지로 신청 어렵다 어르신",
        "국민연금 앱 어르신 불편",
        "건강보험 앱 고령자 어려움",
        "민원 온라인 어렵다 어르신",
    ],
    "공인인증서": [
        "공인인증서 갱신 어렵다 노인",
        "공동인증서 어르신 불편",
        "인증서 설치 못하겠다 어머니",
        "공인인증서 오류 어르신",
    ],
    "QR코드": [
        "QR코드 어렵다 노인",
        "QR 찍는 방법 어르신",
        "QR코드 못하겠다 어머니",
        "QR코드 당황 어르신",
    ],
    "기기관리": [
        "스마트폰 저장공간 어렵다 노인",
        "폰 느려졌다 어르신",
        "스마트폰 업데이트 어머니 모른다",
        "사진 못 찍겠다 저장 가득 노인",
        "와이파이 연결 어렵다 어르신",
    ],
    "여행교통예약": [
        "KTX 예매 어렵다 노인",
        "기차표 예매 어르신 불편",
        "항공권 예약 어렵다 고령",
        "고속버스 앱 어르신",
    ],
    "전자계약": [
        "전자서명 어렵다 노인",
        "전자계약 어르신 불편",
        "온라인 계약 못하겠다 어머니",
        "부동산 전자계약 어르신",
    ],
    "스마트폰앱": [
        "스마트폰 어렵다 노인",
        "앱 사용 어려움 고령자",
        "디지털 소외 어르신",
        "스마트폰 포기 중장년",
    ],
    "금융은행": [
        "모바일뱅킹 어렵다 노인",
        "은행앱 고령자 불편",
        "비대면금융 소외 어르신",
        "ATM 어렵다 노인",
    ],
    "보이스피싱": [
        "보이스피싱 어르신 피해",
        "스미싱 노인 사기",
        "전화사기 고령자",
        "보이스피싱 60대 70대",
    ],
    "자녀피로": [
        "부모님 스마트폰 질문 힘들다",
        "부모 디지털 교육 부담",
        "명절 스마트폰 가르치기",
    ],
    "심리적충격": [
        "디지털 격차 노인 우울",
        "디지털 소외 심리 어르신",
        "기술 소외 중장년 사례",
    ],
}

# ── 관련 키워드 필터 ──────────────────────────────────────────
RELEVANT = [
    "키오스크", "무인", "앱", "스마트폰", "핸드폰", "인터넷", "뱅킹",
    "어렵", "모르", "못하", "힘들", "불편", "답답", "창피", "두렵",
    "사기", "피싱", "보이스피싱", "스미싱", "디지털", "배우",
    "가르쳐", "포기", "소외", "은행", "ATM", "카카오", "유튜브",
    "설치", "사용법", "이해", "따라가", "격차",
    "배달의민족", "배민", "쿠팡이츠", "쿠팡", "배달앱",
    "카카오택시", "카카오맵", "티맵", "택시앱",
    "병원예약", "진료예약", "예약앱",
    "카카오톡", "영상통화", "SNS",
    "정부24", "복지로", "국민연금", "건강보험", "민원",
    "공인인증서", "공동인증서", "인증서",
    "QR코드", "QR", "큐알",
    "저장공간", "업데이트", "와이파이", "배터리",
    "KTX", "기차표", "항공권", "고속버스",
    "전자서명", "전자계약",
]

TARGET_SUBJECTS = [
    "어르신", "노인", "할머니", "할아버지", "60대", "70대", "80대",
    "중장년", "고령", "시니어", "어머니", "아버지", "부모님", "씨"
]

def is_relevant(text):
    return any(kw in text for kw in RELEVANT)

def has_subject(text):
    return any(kw in text for kw in TARGET_SUBJECTS)

# ── 네이버 뉴스 검색 → URL 목록 수집 ─────────────────────────
def get_urls_from_naver(query, max_pages=3):
    urls = []
    for page in range(1, max_pages + 1):
        encoded = urllib.parse.quote(query)
        start = (page - 1) * 10 + 1
        search_url = f"https://search.naver.com/search.naver?where=news&query={encoded}&start={start}&sort=1"
        try:
            resp = requests.get(search_url, headers=HEADERS, timeout=8)
            resp.encoding = "utf-8"
            soup = BeautifulSoup(resp.text, "lxml")
            for a in soup.find_all("a", href=True):
                href = a.get("href", "")
                text = a.get_text(strip=True)
                # 네이버 뉴스 내부 링크
                if "n.news.naver.com/mnews/article" in href:
                    urls.append(href)
                # 외부 뉴스 링크 (제목에 관련 키워드 포함)
                elif (href.startswith("http") and "naver" not in href
                      and len(text) > 10
                      and any(k in text for k in ["어르신","노인","고령","디지털","키오스크","불편","어렵","피싱","중장년"])):
                    urls.append(href)
        except:
            pass
        time.sleep(0.5)
    return list(set(urls))  # 중복 제거

# ── 기사 한 개에서 인용구/사례 추출 ──────────────────────────
def extract_voices_from_url(url, category, press=""):
    voices = []
    try:
        resp = requests.get(url, headers=HEADERS, timeout=8)
        resp.encoding = "utf-8"
        soup = BeautifulSoup(resp.text, "lxml")

        # 언론사명 추출
        if not press:
            og = soup.find("meta", property="og:site_name")
            press = og.get("content", "뉴스") if og else "뉴스"

        # 발행일 추출
        date = ""
        for sel in ["meta[property='article:published_time']", "meta[name='pubdate']", "time[datetime]"]:
            el = soup.select_one(sel)
            if el:
                date = (el.get("content","") or el.get("datetime",""))[:10]
                break

        # 본문 텍스트 추출
        body = ""
        for sel in ["#newsct_article","#articleBodyContents",".article_body",
                    "#article-view-content-div",".news_end","article",".article",
                    "#artice_body",".article_txt",".entry-content"]:
            el = soup.select_one(sel)
            if el and len(el.get_text(strip=True)) > 200:
                body = el.get_text(" ", strip=True)
                break
        if not body:
            body = " ".join(p.get_text(strip=True) for p in soup.find_all("p") if len(p.get_text(strip=True))>20)

        if len(body) < 150:
            return voices

        # ── 인용구 패턴 매칭 ──────────────────────────────────
        quote_patterns = [
            # 홍길동 씨(65)는 "..."
            r'([가-힣]{2,4})\s*씨\s*\((\d{2})\)[는은이가]?\s*["\u201c\u2018\u300c]([^"\u201d\u2019\u300d]{15,200})["\u201d\u2019\u300d]',
            # 60대 여성 A씨는 "..."
            r'(\d{2}대\s*[가-힣]{1,5}(?:씨|분)?)[는은이가]\s*["\u201c\u2018]([^"\u201d\u2019]{15,200})["\u201d\u2019]',
            # 어르신/노인 등 + 인용구
            r'((?:어르신|노인|할머니|할아버지|주부|자영업자)[가-힣\s]{0,5}(?:씨|분)?)[는은이가]?\s*["\u201c\u2018]([^"\u201d\u2019]{15,200})["\u201d\u2019]',
            # 숫자세 + 인용구
            r'(\d{2}세\s*[가-힣]{0,5})[는은이가]\s*["\u201c\u2018]([^"\u201d\u2019]{15,200})["\u201d\u2019]',
        ]
        for pat in quote_patterns:
            for m in re.finditer(pat, body):
                g = m.groups()
                if len(g) == 3:
                    spk = f"{g[0].strip()}({g[1]}세)"
                    txt = g[2].strip()
                elif len(g) == 2:
                    spk = g[0].strip()
                    txt = g[1].strip()
                else:
                    continue
                if is_relevant(txt) and 15 <= len(txt) <= 250:
                    voices.append({"cat": category, "speaker": spk, "text": txt,
                                   "source": press, "date": date, "url": url})

        # ── 문장 단위 사례 추출 ───────────────────────────────
        for sent in re.split(r'(?<=[.!?])\s+', body):
            sent = sent.strip()
            if 30 <= len(sent) <= 200 and is_relevant(sent) and has_subject(sent):
                voices.append({"cat": category, "speaker": "기사 사례",
                               "text": sent, "source": press, "date": date, "url": url})
    except:
        pass
    return voices

# ── 병렬로 여러 URL 동시 크롤링 ──────────────────────────────
def crawl_urls_parallel(url_list, category, max_workers=8):
    results = []
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(extract_voices_from_url, url, category): url
                   for url in url_list}
        for future in as_completed(futures):
            try:
                voices = future.result(timeout=12)
                results.extend(voices)
            except:
                pass
    return results

# ── 메인 실행 ──────────────────────────────────────────────────
def main():
    all_voices = []
    seen = set()

    print("=" * 55)
    print("  중장년 디지털 불편 목소리 크롤러 v3 (병렬)")
    print("=" * 55)

    for category, queries in SEARCH_QUERIES.items():
        print(f"\n[{category}]")
        all_urls = []

        # 1단계: URL 수집 (네이버 검색)
        for q in queries:
            urls = get_urls_from_naver(q, max_pages=3)
            all_urls.extend(urls)
            print(f"  '{q}' -> {len(urls)}개 URL")

        # 중복 제거
        all_urls = list(set(all_urls))
        print(f"  총 고유 URL: {len(all_urls)}개 -> 병렬 크롤링 시작")

        # 2단계: 병렬로 기사 크롤링
        voices = crawl_urls_parallel(all_urls[:40], category, max_workers=10)

        # 중복 제거 후 추가
        added = 0
        for v in voices:
            key = v["text"][:60]
            if key not in seen:
                seen.add(key)
                all_voices.append(v)
                added += 1

        print(f"  -> {added}개 수집 / 전체 누계: {len(all_voices)}개")

    # ── JSON 저장 ──────────────────────────────────────────────
    out = {
        "collected_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "total": len(all_voices),
        "voices": all_voices,
    }
    path = "C:/Users/Administrator/OneDrive/바탕 화면/06_개발IT/item001-deploy/voices_raw.json"
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print(f"\n{'='*55}")
    print(f"  완료! 총 {len(all_voices)}개 저장 -> voices_raw.json")
    print(f"{'='*55}")

if __name__ == "__main__":
    main()
