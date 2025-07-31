import { useState, useEffect } from "react";
import { fetchLocalStorageBooks } from "../util/localStorage";
import {addDummies} from "../util/localStorage";
import "../components/Bookcase.css";

import Nav from "../components/nav";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
export default function Bookcase() {
  useEffect(() => {
    addDummies(); // 더미 데이터를 로컬 스토리지에 추가/병합
    setBooks(fetchLocalStorageBooks());
  }, []);
  const [books, setBooks] = useState(fetchLocalStorageBooks);
  return (
    <div className="Bookcase">
	   <Nav />
	   <h1 className="sr-only">읽잇 ReadIt - 내 책장</h1>
      <SearchBar booksData={books} />
	  <div className="BookGrid">{books.map((book) => {
			  return (
				 <BookCard key={book.id} book_data={book} />
			  )})}
	  </div>
    </div>
  );
}
