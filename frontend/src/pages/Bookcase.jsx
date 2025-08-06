import { useState, useEffect } from "react";
import { fetchLocalStorageBooks } from "../util/localStorage";
import { addDummies } from "../util/localStorage";
import "../components/Bookcase.css";

import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";

export default function Bookcase() {
  const [books, setBooks] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [bookHere, setBookHere] = useState(true);
  useEffect(() => {
    let initialBooks = "";
    if (!localStorage.getItem("books")) {
      console.log("없음");
      initialBooks = fetchLocalStorageBooks();
      addDummies();
    } else {
      console.log("있다");
      initialBooks = JSON.parse(localStorage.getItem("books"));
    }
    setBooks(initialBooks);
    setSearchResult(initialBooks); // 초기에는 전체 책을 보여주도록 설정
  }, []);

  const searchFunction = (arr, searchTerm) => {
    // 검색어가 비어있을 때
    if (searchTerm === "") {
      setSearchResult(books); // 전체 책 목록으로 되돌림
    } else {
      setSearchResult(arr);
    }
  };

  return (
    <div className="Bookcase">
      <Nav />
      <h1 className="sr-only">읽잇 ReadIt - 내 책장</h1>
      <SearchBar booksData={books} searchHandle={searchFunction} />
      {searchResult.length > 0 ? (
        <div className="BookGrid">
          {searchResult.map((book) => (
            <BookCard key={book.id} book_data={book} />
          ))}
        </div>
      ) : (
        <div className="noBook">
          <img src="/images/noBook.png" />
        </div>
      )}
    </div>
  );
}
