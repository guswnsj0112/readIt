import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ booksData }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("title"); // 기본값 'title'
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery, filter);
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearch = (query, filter) => {
    booksData.map((b) => {
      if (b[filter] === query) {
        console.log("찾는게 이게 맞으신가요?", b[filter]);
      }
    });
    setSearchQuery(""); // 검색 후 input 비우기
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
          <option value="keyword">키워드</option>
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
