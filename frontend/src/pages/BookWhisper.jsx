import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "../components/BookWhisper.css";
import Nav from "../components/Nav";

export default function BookWhisper() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedBooks = localStorage.getItem("books");

    if (storedBooks) {
      const booksArray = JSON.parse(storedBooks);
      const foundBook = booksArray.find((item) => item.id === id);

      // 이미지가 없으면 기본 이미지로 대체
      if (foundBook) {
        if (!foundBook.img_src) {
          foundBook.img_src = "/images/noBookImg.png";
        }
        setBook(foundBook);
      }
    }
  }, [id]);
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("삭제하면 복구 할 수 없습니다");
    if (!confirmDelete) return;
    const storedBooks = localStorage.getItem("books");

    const booksArray = JSON.parse(storedBooks);

    // 해당 책을 삭제한 새로운 배열 만들기
    const updatedBooks = booksArray.filter((item) => item.id !== id);

    localStorage.setItem("books", JSON.stringify(updatedBooks));

    setBook(null);
    navigate("/bookcase");
  };
  return (
    <div className="BookWhisper">
      <Nav />
      {book ? (
        <div className="bookDetail">
          <div className="top">
            <h1>{book.title}</h1>
            <p>- {book.author}</p>
          </div>
          <img
            src={book.img_src}
            alt={book.title}
            onError={(e) => (e.currentTarget.src = "/images/noBookImg.png")}
          />
          <div className="BookWhisper-bottom">
            <div className="review">
              <div>독서 후기</div>
              <p>{book.review}</p>
            </div>
            <div className="comment">
              <div>책에 대한 한줄 코멘트</div>
              <p>{book.comment}</p>
            </div>
            <div className="icon-buttons">
              <Link to={`/editbookwhisper/${id}`}>
                <button>✎</button>
              </Link>
              <button onClick={() => handleDelete(id)}>🗑️</button>
            </div>
            <p className="writeDay">작성일: {book.writeDay}</p>
          </div>
        </div>
      ) : (
        <p>책을 찾을 수 없습니다.</p>
      )}
    </div>
  );
}
