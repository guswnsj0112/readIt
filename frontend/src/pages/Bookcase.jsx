import { useState, useEffect, useRef } from "react";
import { fetchLocalStorageBooks } from "../util/localStorage";
import { Link } from "react-router-dom";

import "../components/Bookcase.css";

import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";

// 한 번에 보여줄 책의 수
const ITEMS_PER_LOAD = 12;

export default function Bookcase() {
  const [books, setBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(null);

  useEffect(() => {
    let initialBooks = JSON.parse(localStorage.getItem("books")) || fetchLocalStorageBooks();
    setBooks(initialBooks);
    setSearchResult(initialBooks);
  }, []);

  useEffect(() => {
    setDisplayedBooks(searchResult.slice(0, ITEMS_PER_LOAD));
    setHasMore(searchResult.length > ITEMS_PER_LOAD);
  }, [searchResult]);

  const loadMoreBooks = () => {
    if (!hasMore) return;
    const currentLength = displayedBooks.length;
    const nextBooks = searchResult.slice(currentLength, currentLength + ITEMS_PER_LOAD);
    setDisplayedBooks((prev) => [...prev, ...nextBooks]);
    setHasMore(currentLength + ITEMS_PER_LOAD < searchResult.length);
  };
  
  const searchFunction = (arr, searchTerm) => {
    if (searchTerm === "") {
        setSearchResult(books);
    } else {
        // SearchBar에서 이미 필터링된 배열(arr)을 받으므로, books를 기준으로 다시 필터링할 필요가 없습니다.
        // SearchBar에서 빈 배열을 보내주므로 그 결과를 그대로 사용합니다.
        const filtered = books.filter(book => {
            const title = book.title ? book.title.toLowerCase() : '';
            const author = book.author ? book.author.toLowerCase() : '';
            const comment = book.comment ? book.comment.toLowerCase() : '';
            const query = searchTerm.toLowerCase();
            return title.includes(query) || author.includes(query) || comment.includes(query);
        });
        setSearchResult(filtered);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) loadMoreBooks();
      },
      { threshold: 1.0 }
    );
    const currentLoadingRef = loadingRef.current;
    if (currentLoadingRef) observer.observe(currentLoadingRef);
    return () => {
      if (currentLoadingRef) observer.unobserve(currentLoadingRef);
    };
  }, [hasMore, displayedBooks]);

  return (
    <div>
      <Nav />
      <main className="max-w-9/10 lg:max-w-[75.00rem] md:max-w-[48.125rem] m-auto px-2 md:px-5 lg:px-6">
        <h1 className="sr-only">읽잇 ReadIt - 내 책장</h1>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <SearchBar booksData={books} searchHandle={searchFunction} />
          <Link to="/createbookwhisper" className="self-end md:self-auto w-auto flex-shrink-0">
            <button className="bg-red-400 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-500 transition-colors duration-300 shadow-md">
              기록하기
            </button>
          </Link>
        </div>

        {displayedBooks.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center my-8">
              {displayedBooks.map((book) => (
                <BookCard key={book.id} book_data={book} />
              ))}
            </div>
            {hasMore && (
              <div ref={loadingRef} className="text-center text-gray-500 py-10">...더 많은 책을 불러오는 중...</div>
            )}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center text-center my-10 px-4">
            <img src="/images/noBook.png" alt="책이 없습니다." className="max-w-md w-full h-auto object-cover"/>
            <p className="mt-6 text-xl text-gray-600">아직 기록된 책이 없네요!</p>
            <p className="text-gray-500">'기록하기' 버튼을 눌러 첫 책을 추가해보세요.</p>
          </div>
        )}
      </main>
    </div>
  );
}
