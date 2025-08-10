import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "../components/BookWhisper.css";
import "../components/EditBookWhisper.css";

import Nav from "../components/Nav";
import fetchToday from "../util/fetchToday";
import Modal from "../components/Modal";

export default function EditBookWhisper() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [bookImg, setBookImg] = useState("");
  const [bookReview, setBookReview] = useState("");
  const [bookComment, setBookComment] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBooks = localStorage.getItem("books");

    if (storedBooks) {
      const booksArray = JSON.parse(storedBooks);
      const foundBook = booksArray.find((item) => item.id === id);

      if (foundBook) {
        setBook(foundBook);
        setBookImg(foundBook.img_src);
        setBookReview(foundBook.review);
        setBookComment(foundBook.comment);
      }
    }
  }, [id]);

  const today = fetchToday();

  const handleReviewChange = (e) => {
    setBookReview(e.target.value);
  };

  const handleCommentChange = (e) => {
    setBookComment(e.target.value);
  };

  const handleModal = (img) => {
    setBookImg(img);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    const confirmSave = window.confirm(
      "작성일은 오늘로 변경됩니다. 수정하시겠습니까?"
    );
    if (!confirmSave) return;

    const storedBooks = localStorage.getItem("books");
    const booksArray = JSON.parse(storedBooks);
    const bookIdx = booksArray.findIndex((item) => item.id === id);

    const updatedBook = {
      id: id,
      title: book.title,
      author: book.author,
      img_src: bookImg,
      review: bookReview,
      comment: bookComment,
      writeDay: today,
    };

    const newBooksArray = [...booksArray];
    newBooksArray[bookIdx] = updatedBook;

    localStorage.setItem("books", JSON.stringify(newBooksArray));
    navigate(-1);
  };

  return (
    <div className="EditBookWhisper">
      <Nav />
      {book ? (
        <form onSubmit={handleFormSubmit}>
          <div className="bookDetail">
            <div className="top">
              <h1>{book.title}</h1>
              <p>- {book.author}</p>
            </div>
            <div className="changeImg">
              <img
                src={bookImg ? bookImg : "/images/noBookImg.png"}
                alt={bookImg ? book.title : "책 사진이 없어요"}
                onError={(e) => (e.currentTarget.src = "/images/noBookImg.png")}
              />
              <button
                className="addBtn"
                type="button"
                onClick={() => setOpen(true)}
              >
                +
              </button>
            </div>
            <Modal
              isOpen={open}
              onClose={() => setOpen(false)}
              imgChangeFn={handleModal}
            ></Modal>
            <div className="BookWhisper-bottom">
              <div className="review">
                <label htmlFor="reviewInput">독서 후기</label>
                <textarea
                  rows={5}
                  value={bookReview}
                  id="reviewInput"
                  name="reviewInput"
                  onChange={handleReviewChange}
                  required // 독서 후기 필드에 required 추가
                />
              </div>
              <div className="comment">
                <label htmlFor="commentInput">책에 대한 한줄 코멘트</label>
                <input
                  type="text"
                  value={bookComment}
                  id="commentInput"
                  name="commentInput"
                  onChange={handleCommentChange}
                  required // 한줄 코멘트 필드에 required 추가
                />
              </div>
              <div className="icon-buttons">
                <button type="submit">✅</button> {/* type="submit"으로 변경 */}
                <button type="button" onClick={() => navigate(-1)}>
                  취소하기
                </button>
              </div>
              <p className="writeDay">수정일: {today}</p>
            </div>
          </div>
        </form>
      ) : (
        <p>책을 찾을 수 없습니다.</p>
      )}
    </div>
  );
}
