import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "../components/BookWhisper.css";
import "../components/EditBookWhisper.css";
import "../components/CreateBookWhisper.css";
import Nav from "../components/Nav";
import fetchToday from "../util/fetchToday";
import Modal from "../components/Modal";

const bookFormat = {
  id: 0,
  title: "",
  author: "",
  img_src: "",
  review: "",
  comment: "",
  writeDay: "",
};
export default function EditBookWhisper() {
  const [book, setBook] = useState(bookFormat);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookImg, setBookImg] = useState("");
  const [bookReview, setBookReview] = useState("");
  const [bookComment, setBookComment] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // 제목 변경 함수
  const handleTitleChange = (e) => {
    setBookTitle(e.target.value);
  };

  // 저자 변경 함수
  const handleAuthorChange = (e) => {
    setBookAuthor(e.target.value);
  };

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
  const EditBook = () => {
    const confirmDelete = window.confirm("기록한거 저장하기");
    if (!confirmDelete) return;
    const storedBooks = localStorage.getItem("books");
    const booksArray = JSON.parse(storedBooks);
    const updateBook = {
      id: uuidv4(),
      title: bookTitle,
      author: bookAuthor,
      img_src: bookImg,
      review: bookReview,
      comment: bookComment,
      writeDay: today,
    };
    setBook(updateBook);
    const newBooksArray = [updateBook, ...booksArray];
    localStorage.setItem("books", JSON.stringify(newBooksArray));
    navigate(-1);
  };

  return (
    <div className="EditBookWhisper">
      <Nav />
      <div className="bookDetail">
        <div className="top">
          <label htmlFor="titleInput">책 제목</label>
          <input
            type="text"
            id="titleInput"
            name="titleInput"
            value={bookTitle}
            onChange={handleTitleChange}
            placeholder="책 제목을 입력하세요"
          />

          {/* 저자 입력창 */}
          <label htmlFor="authorInput">저자</label>
          <input
            type="text"
            id="authorInput"
            name="authorInput"
            value={bookAuthor}
            onChange={handleAuthorChange}
            placeholder="저자를 입력하세요"
          />
        </div>
        <div className="changeImg">
          <img
            src={bookImg ? bookImg : "/images/noBookImg.png"}
            alt={bookImg ? book.title : "책 사진이 없어요"}
            onError={(e) => (e.currentTarget.src = "/images/noBookImg.png")}
          />
          <button className="addBtn" onClick={() => setOpen(true)}>
            {" "}
            +{" "}
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
              row={5}
              value={bookReview}
              id="reviewInput"
              name="reviewInput"
              onChange={handleReviewChange}
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
            />
          </div>
          <div className="icon-buttons">
            <button onClick={EditBook}>✅</button>
            <button onClick={() => navigate(-1)}>취소하기</button>
          </div>
          <p className="writeDay">작성일: {today}</p>
        </div>
      </div>
    </div>
  );
}
