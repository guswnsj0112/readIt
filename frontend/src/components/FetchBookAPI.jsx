import React, { useState } from "react";


export default function FetchBookAPI({ imgChangeFn, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false); // 검색했는지 여부 확인

  const handleSearch = async (e) => {
    e.preventDefault();
	 e.stopPropagation();
    if (!searchTerm.trim()) {
      setError("검색어를 입력해주세요.");
      return;
    }
    setLoading(true);
    setError(null);
    setBooks([]);
    setSearched(true);

    try {
      const response = await fetch(
        `https://readit-backend-u789.onrender.com/api/search-books?query=${encodeURIComponent(
          searchTerm
        )}&display=8` // 이미지를 8개까지 가져오도록 수정
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "서버 응답 오류가 발생했습니다.");
      }

      const data = await response.json();
      setBooks(data.items || []);
    } catch (err) {
      setError(err.message);
      console.error("도서 검색 중 오류 발생:", err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSelect = (imgSrc) => {
    imgChangeFn(imgSrc); // 선택한 이미지 URL을 부모 컴포넌트로 전달
    onClose(); // 모달 닫기
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-stone-400 h-full pt-10">
          <svg className="animate-spin h-12 w-12 text-amber-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="font-bold text-lg text-stone-600">책을 찾고 있어요...</p>
          <p className="text-stone-500">서버 응답이 늦어질 수 있습니다.</p>
        </div>
      );
    }
    if (error) {
       return (
         <div className="flex flex-col items-center justify-center text-center text-red-400 h-full pt-10">
           <svg className="w-16 h-16 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
           </svg>
           <p className="font-bold text-lg text-red-600">오류 발생</p>
           <p className="text-red-500">{error}</p>
         </div>
       );
    }
    if (books.length > 0) {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {books.map((book, index) => (
            <div key={book.link || index} className="cursor-pointer group" onClick={() => handleSelect(book.image)}>
              <div className="overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300 bg-stone-100">
                <img src={book.image} alt={book.title.replace(/<[^>]*>/g, "")} className="w-full h-auto object-cover aspect-[2/3] transform group-hover:scale-105 transition-transform duration-300" />
              </div>
              <p className="text-center text-sm font-semibold mt-2 text-stone-800 truncate" dangerouslySetInnerHTML={{ __html: book.title }}></p>
            </div>
          ))}
        </div>
      );
    }
    if (searched) { // 검색은 했지만 결과가 없는 경우
       return (
          <div className="flex flex-col items-center justify-center text-center text-stone-400 h-full pt-10">
             <svg className="w-16 h-16 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
            <p className="font-bold text-lg text-stone-600">검색 결과가 없습니다</p>
            <p className="text-stone-500">다른 검색어로 다시 시도해보세요.</p>
          </div>
       );
    }
    // 초기 상태 (아직 검색 안 함)
    return (
      <div className="flex flex-col items-center justify-center text-center text-stone-400 h-full pt-10">
        <svg className="w-16 h-16 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p className="font-bold text-lg text-stone-600">책 표지 이미지 검색</p>
        <p className="text-stone-500">위 검색창에 책 제목을 입력해주세요.</p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
		  onKeyDown={(e) => {
			if (e.key === "Enter") {
			  	e.preventDefault();        // 브라우저의 기본 submit 동작 차단
			  	e.stopPropagation();       // 상위로 이벤트 전파 차단(모달에 걸려있다면 방지)
			  	handleSearch(e);           // 바로 검색 실행
			}
		  }}
          placeholder="책 제목을 입력하여 표지를 검색하세요..."
          className="w-full p-4 pl-12 text-md bg-[#fdf6ec] border-2 border-amber-300/50 rounded-full focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all duration-300 text-stone-800 placeholder:text-stone-500 shadow-inner"
        />
        <svg className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
       <button
		  type="button"
		  onClick={(e) => {
			e.stopPropagation();
			handleSearch(e); 
		  }}
			className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-500 text-white px-5 py-2 rounded-full hover:bg-amber-600 transition-colors font-semibold shadow-md hover:shadow-lg">
          검색
        </button>
      </form>

      <div className="min-h-[300px]">
        {renderContent()}
      </div>
    </div>
  );
};