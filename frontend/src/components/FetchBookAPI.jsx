import React, { useState } from "react";
import "./FetchBookAPI.css";

export default function FetchBookAPI({ imgChangeFn, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      // 검색어가 비어있는 경우 검색하지 않음
      setError("검색어를 입력해주세요.");
      return;
    }
    setLoading(true);
    setError(null);
    setBooks([]);

    try {
      const response = await fetch(
        `https://readit-backend-u789.onrender.com/api/search-books?query=${encodeURIComponent(
          searchTerm
        )}&display=4`
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

  const renderContent = () => {
    if (loading) {
      return <p>서버 응답이 늦어지고 있습니다. 잠시만 기다려주세요...</p>;
    }
    if (error) {
      return <p style={{ color: "red" }}>오류: {error}</p>;
    }
    if (books.length === 0 && searchTerm.trim() !== "") {
      return (
        <p>엔터를 눌러도 사진이 안 떴다면 제목을 다시 한번 확인해주세요.</p>
      );
    }
    if (books.length === 0 && searchTerm.trim() === "") {
      return <p>검색어를 입력하고 이미지를 찾아보세요.</p>;
    }

    const handleClick = (img) => {
      imgChangeFn(img);
      onClose();
    };
    return (
      <ul>
        {books.map((book, index) => (
          <li key={book.link || index}>
            <h3>{book.title.replace(/<[^>]*>/g, "")}</h3>
            <p>Author: {book.author.replace(/<[^>]*>/g, "")}</p>
            <p>Publisher: {book.publisher}</p>
            {book.image && (
              <img
                src={book.image}
                alt={book.title}
                style={{ maxWidth: "100px" }}
              />
            )}
            <button
              onClick={() => handleClick(book.image)}
              className="Applybutton"
            >
              적용하기
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="FetchBookAPI">
      <h1>Naver Book Image Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="책 제목을 입력하세요."
        />
      </form>

      <div>
        <h2 style={{ marginTop: "15px" }}>검색 결과:</h2>
        {renderContent()}
      </div>
    </div>
  );
}
