import React, { useState } from "react";

export default function SearchBar({ booksData, searchHandle }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("title"); // 기본 필터: 'title'
  const [error, setError] = useState(""); // 에러 메시지 상태
  
  // 필터 값을 한글로 변환하기 위한 객체
  const filterDisplayNames = {
    title: "책 제목",
    author: "저자",
    comment: "코멘트",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // 이전 에러 메시지 초기화

    // 검색어가 비어있을 경우, 전체 목록을 보여주도록 처리
    if (!searchQuery.trim()) {
      searchHandle([], "");
      return;
    }

    // 검색어가 2글자 미만일 경우, 에러 메시지 설정
    if (searchQuery.trim().length < 2) {
      setError("2글자 이상 검색해 주세요.");
      return;
    }

    // booksData에서 선택된 필터 기준으로 검색
    const newBook = booksData.filter((book) => {
      const bookValue = book[filter] ? String(book[filter]).toLowerCase() : "";
      const queryValue = searchQuery.trim().toLowerCase();
      return bookValue.includes(queryValue);
    });

    searchHandle(newBook, searchQuery.trim()); // 필터링된 결과와 검색어를 부모 컴포넌트로 전달
    setSearchQuery(""); // 검색 후 입력창 비우기
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    if (error) {
      setError(""); // 입력 시 에러 메시지 제거
    }
  };

  return (
    // --- SearchBar 컨테이너 ---
    <div className="w-full max-w-2xl mx-auto my-10 px-4">
      <form onSubmit={handleSubmit} noValidate>
        {/* --- 검색 바 전체를 감싸는 컨테이너 --- */}
        {/* h-16: 높이 지정, shadow-lg: 더 진한 그림자, rounded-full: 완전한 둥근 모서리 */}
        <div className="relative flex items-center w-full h-16 bg-white shadow-lg rounded-full transition-all duration-300 focus-within:ring-2 focus-within:ring-yellow-500 focus-within:ring-offset-2">
          {/* --- 검색 필터 (Select) --- */}
          <div className="pl-5">
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              // bg-transparent: 배경 투명, border-none: 테두리 없음, font-semibold: 글자 굵게
              // appearance-none: 기본 화살표 제거 (브라우저 호환성을 위해 필요할 수 있음)
              className="bg-transparent border-none text-gray-500 font-semibold cursor-pointer focus:outline-none focus:ring-0"
            >
              <option value="title">책 제목</option>
              <option value="author">저자</option>
              <option value="comment">코멘트</option>
            </select>
          </div>

          {/* --- 구분선 --- */}
          <span className="h-6 w-px bg-gray-200 mx-3"></span>

          {/* --- 검색어 입력창 (Input) --- */}
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleChange}
            placeholder={`${filterDisplayNames[filter]}으로 검색...`}
            className="w-full h-full text-base bg-transparent text-gray-800 border-none rounded-full placeholder:text-gray-400 focus:outline-none focus:ring-0"
          />

          {/* --- 검색 버튼 --- */}
          {/* absolute right-1.5: 오른쪽에 고정, bg-yellow-500: 배경색, hover:bg-yellow-600: 호버 효과 */}
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-1.5 flex items-center justify-center w-12 h-12 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>
      {/* --- 에러 메시지 표시 --- */}
      {error && <p className="text-center text-red-500 text-sm mt-3">{error}</p>}
    </div>
  );
}
