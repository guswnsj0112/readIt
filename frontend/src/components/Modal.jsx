import {useState, useEffect} from "react";
import FetchBookAPI from "./FetchBookAPI";
export default function Modal({ isOpen, onClose, imgChangeFn }) {
  const [showModal, setShowModal] = useState(false);

  // 애니메이션 효과를 위해 isOpen 상태가 변경될 때 showModal 상태를 조절
  useEffect(() => {
    if (isOpen) {
      // requestAnimationFrame을 사용하여 렌더링 후 애니메이션이 시작되도록 함
      requestAnimationFrame(() => setShowModal(true));
    } else {
      setShowModal(false);
    }
  }, [isOpen]);
  
  // isOpen이 false이면 아무것도 렌더링하지 않음 (애니메이션 종료 후 사라짐)
  if (!isOpen) return null;

  return (
    // --- 모달 오버레이 ---
    // fixed inset-0: 전체 화면을 덮음, bg-opacity-75: 반투명 배경
    // z-50: 다른 요소들 위에 표시, transition-opacity: 투명도 애니메이션
    <div 
      onClick={onClose} 
      className={`fixed inset-0 bg-black flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out ${showModal ? 'bg-opacity-75' : 'bg-opacity-0'}`}
    >
      {/* --- 모달 컨텐츠 --- */}
      {/* scale, opacity 애니메이션 적용 */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className={`bg-white rounded-xl shadow-2xl flex flex-col w-11/12 md:w-2/3 lg:max-w-3xl max-h-[90vh] transition-all duration-300 ease-in-out ${showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* --- 모달 헤더 --- */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">책 표지 검색</h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-800 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* --- 모달 바디 --- */}
        {/* overflow-y-auto: 내용이 길어지면 스크롤 생성 */}
        <div className="p-6 overflow-y-auto">
          <FetchBookAPI imgChangeFn={imgChangeFn} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}