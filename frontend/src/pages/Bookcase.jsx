import { useState, useEffect } from "react";
import { fetchLocalStorageBooks } from "../util/localStorage";
import "../components/Bookcase.css";

import Nav from "../components/nav";
import SearchBar from "../components/SearchBar";

export default function Bookcase() {
  const [books, setBooks] = useState(fetchLocalStorageBooks);
  return (
    <div className="Bookcase">
      <Nav />
      <SearchBar booksData={books} />
      {books.length !== 0 ? <p>하하</p> : <p>읽은게 없네요...</p>}
    </div>
  );
}
