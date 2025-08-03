import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ booksData, searchHandle }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("title"); // 기본값 'title'
	
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 검색어가 비어있을 경우, 전체 목록을 보여주도록 처리
    if (!searchQuery) {
      searchHandle([], "");
      return;
    }
    // 1글자 검색 시 오류 
	if (searchQuery.length <= 1){
		alert('2글자 이상 검색하세요');
		return;
	}
    // filter를 사용해 booksData를 필터링
    const newBook = booksData.filter((book) => {
      const bookValue = book[filter] ? String(book[filter]).toLowerCase() : "";
      const queryValue = String(searchQuery).toLowerCase();
      return bookValue.includes(queryValue);
    });

    searchHandle(newBook, searchQuery); // 필터링된 배열과 검색어를 부모에게 전달
    setSearchQuery(""); // 검색 후 input 비우기
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    // 실시간 검색을 원한다면, 여기에 handleSubmit 로직을 넣거나
    // debounce 같은 기술을 적용할 수 있습니다.
  };


  return (
    <form className="SearchBar" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="search"></label>
      <div className="filter-container">
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="title">책 제목</option>
          <option value="author">저자</option>
          <option value="comment">코멘트</option>
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder={`검색어를 입력하세요 (${filter})`}
          id="search"
          name="search"
          className="search-input"
        />
      </div>
    </form>
  );
}
