/**
 * @description 푸터 — 회사 정보, 링크, 카카오톡 채널 QR
 */
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 브랜드 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏠</span>
              <span className="text-xl font-bold text-white">디지털 집사</span>
            </div>
            <p className="text-sm leading-relaxed">
              AI+사람이 함께하는<br />
              어르신 맞춤 디지털 도우미
            </p>
          </div>

          {/* 서비스 링크 */}
          <div>
            <h4 className="text-white font-semibold mb-4">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">요금제 안내</a></li>
              <li><a href="#" className="hover:text-white transition-colors">서비스 소개</a></li>
              <li><a href="#" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
              <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
              <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="text-white font-semibold mb-4">문의</h4>
            <ul className="space-y-2 text-sm">
              <li>💬 카카오톡: 디지털집사</li>
              <li>📞 전화: 080-XXX-XXXX (수신자부담)</li>
              <li>📧 이메일: help@digitalbutler.kr</li>
            </ul>
          </div>
        </div>

        {/* 하단 카피라이트 */}
        <div className="border-t border-gray-800 pt-8 text-center text-xs">
          <p>© 2026 디지털 집사. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
