import React, { useState } from "react";
import "./FetchBookAPI.css";

export default function FetchBookAPI() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBooks([]); // 이전 검색 결과 초기화

    try {
      // 백엔드 서버의 주소와 포트에 맞게 변경해주세요.
      // 개발 중이라면 'http://localhost:5000'
      const response = await fetch(
        `https://readit-backend-u789.onrender.com/api/search-books?query=${encodeURIComponent(
          searchTerm
        )}&display=4`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong!");
      }

      const data = await response.json();
      setBooks(data.items || []); // Naver API 응답 구조에 맞게 items 배열 사용
    } catch (err) {
      setError(err.message);
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="FetchBookAPI">
      <h1>Naver Book Image Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for books..."
        />
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div>
        <h2>Search Results:</h2>
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book.link}>
                <h3>{book.title.replace(/<[^>]*>/g, "")}</h3>{" "}
                {/* HTML 태그 제거 */}
                <p>Author: {book.author.replace(/<[^>]*>/g, "")}</p>
                <p>Publisher: {book.publisher}</p>
                {book.image && (
                  <img
                    src={book.image}
                    alt={book.title}
                    style={{ maxWidth: "100px" }}
                  />
                )}
                <p>
                  <a href={book.link} target="_blank" rel="noopener noreferrer">
                    View Details
                  </a>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && !error && <p>No books found. Try searching!</p>
        )}
      </div>
    </div>
  );
}
