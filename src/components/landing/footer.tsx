/**
 * @description 푸터 — 브랜드 + 서비스 링크 + 연락처 + 최종 CTA
 * 다크 테마, 모바일에서 깔끔한 세로 레이아웃
 */
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* 최종 CTA 배너 */}
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 text-center">
          <h2 className="text-xl md:text-3xl font-extrabold text-white mb-3">
            부모님의 디지털 자립,<br className="md:hidden" />
            <span className="text-primary-400"> 오늘 시작하세요</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-6">
            7일 무료 체험 · 카드 등록 없음 · 1분이면 시작
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
            <Link href="/login" className="flex-1">
              <button className="w-full bg-[#FEE500] hover:bg-[#FDD835] text-[#191919] font-bold py-3.5 px-6 rounded-xl text-base transition-all active:scale-[0.98]">
                💬 카톡으로 시작하기
              </button>
            </Link>
            <Link href="/signup" className="flex-1">
              <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 px-6 rounded-xl text-base transition-all border border-white/20 active:scale-[0.98]">
                🎁 부모님께 선물하기
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 메인 푸터 */}
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* 브랜드 */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🏠</span>
              <span className="text-lg font-bold text-white">디지털 집사</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              AI + 사람이 함께하는<br />
              어르신 맞춤 디지털 도우미
            </p>
          </div>

          {/* 서비스 */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#service" className="hover:text-white transition-colors">서비스 소개</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">요금제 안내</a></li>
              <li><a href="#review" className="hover:text-white transition-colors">이용 후기</a></li>
              <li><a href="#" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">고객지원</h4>
            <ul className="space-y-2 text-sm">
              <li>💬 카카오톡: 디지털집사</li>
              <li>📞 080-XXX-XXXX</li>
              <li className="text-xs text-gray-500">(수신자부담, 평일 9~18시)</li>
              <li>📧 help@digitalbutler.kr</li>
            </ul>
          </div>

          {/* 법적 */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">약관</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
              <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-white transition-colors">환불 정책</a></li>
            </ul>
          </div>
        </div>

        {/* 카피라이트 */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>&copy; 2026 디지털 집사. All rights reserved.</p>
          <div className="flex gap-4">
            <span>사업자등록번호: XXX-XX-XXXXX</span>
            <span>대표: OOO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
