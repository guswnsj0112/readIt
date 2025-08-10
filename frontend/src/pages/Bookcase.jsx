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
  const [books, setBooks] = useState(null);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(null); // 로딩 감지용 Ref

  useEffect(() => {
    let initialBooks = "";
    if (!localStorage.getItem("books")) {
      initialBooks = fetchLocalStorageBooks();
    } else {
      initialBooks = JSON.parse(localStorage.getItem("books"));
    }
    setBooks(initialBooks);
    setSearchResult(initialBooks);

    // 초기 렌더링 시, 처음 ITEMS_PER_LOAD 개수만큼만 보여줍니다.
    setDisplayedBooks(initialBooks.slice(0, ITEMS_PER_LOAD));
    // 더 보여줄 책이 있는지 확인
    setHasMore(initialBooks.length > ITEMS_PER_LOAD);
  }, []);

  useEffect(() => {
    // 검색 결과가 바뀔 때마다 다시 처음부터 보여줍니다.
    setDisplayedBooks(searchResult.slice(0, ITEMS_PER_LOAD));
    setHasMore(searchResult.length > ITEMS_PER_LOAD);
  }, [searchResult]);

  const loadMoreBooks = () => {
    // 더 이상 불러올 책이 없으면 함수 종료
    if (!hasMore) return;

    // 현재 보여지고 있는 책의 다음 인덱스
    const currentLength = displayedBooks.length;
    const nextBooks = searchResult.slice(
      currentLength,
      currentLength + ITEMS_PER_LOAD
    );

    // 새 책들을 기존 배열에 추가
    setDisplayedBooks((prevBooks) => [...prevBooks, ...nextBooks]);

    // 더 이상 보여줄 책이 없으면 hasMore 상태를 false로 변경
    setHasMore(currentLength + ITEMS_PER_LOAD < searchResult.length);
  };

  const searchFunction = (arr, searchTerm) => {
    if (searchTerm === "") {
      setSearchResult(books);
    } else {
      setSearchResult(arr);
    }
  };

  useEffect(() => {
    // Intersection Observer API를 이용해 로딩 엘리먼트가 보일 때 추가 로드
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreBooks();
        }
      },
      { threshold: 1.0 } // 100% 보일 때 작동
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    // 컴포넌트 언마운트 시 옵저버 해제
    return () => {
      if (loadingRef.current) {
        observer.disconnect();
      }
    };
  }, [hasMore, searchResult]);

  return (
    <div className="Bookcase">
      <Nav />
      <h1 className="sr-only">읽잇 ReadIt - 내 책장</h1>
      <div className="searchSection">
        <SearchBar booksData={books} searchHandle={searchFunction} />
        <Link to="/createbookwhisper " className="buttonSection">
          <button className="record">기록하기</button>
        </Link>
      </div>
      {displayedBooks.length > 0 ? (
        <>
          <div className="BookGrid">
            {displayedBooks.map((book) => (
              <BookCard key={book.id} book_data={book} />
            ))}
          </div>
          {hasMore && (
            <div ref={loadingRef} className="loading-indicator">
              ...더 많은 책을 불러오는 중...
            </div>
          )}
        </>
      ) : (
        <div className="noBook">
          <img src="/images/noBook.png" />
        </div>
      )}
    </div>
  );
}
