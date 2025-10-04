import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Nav from "../components/Nav";
import fetchToday from "../util/fetchToday";
import Modal from "../components/Modal";

export default function EditBookWhisper() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [book, setBook] = useState(null);
  const [bookImg, setBookImg] = useState("");
  const [bookReview, setBookReview] = useState("");
  const [bookComment, setBookComment] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmSave, setShowConfirmSave] = useState(false);

  const today = fetchToday();

  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      const booksArray = JSON.parse(storedBooks);
      const foundBook = booksArray.find((item) => item.id === id);
      if (foundBook) {
        setBook(foundBook);
        setBookImg(foundBook.img_src || "/images/noBookImg.png");
        setBookReview(foundBook.review);
        setBookComment(foundBook.comment);
      }
    }
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowConfirmSave(true);
  };
  
  const handleConfirmSave = () => {
    const storedBooks = localStorage.getItem("books");
    const booksArray = JSON.parse(storedBooks);
    const bookIdx = booksArray.findIndex((item) => item.id === id);

    const updatedBook = {
      ...book,
      img_src: bookImg,
      review: bookReview,
      comment: bookComment,
      writeDay: today,
    };
    
    const newBooksArray = [...booksArray];
    newBooksArray[bookIdx] = updatedBook;

    localStorage.setItem("books", JSON.stringify(newBooksArray));
    setShowConfirmSave(false);
    navigate(-1);
  };
  
  if (!book) {
    return (
      <>
        <Nav />
        <p className="text-center text-xl text-gray-500 mt-20">책을 찾을 수 없습니다.</p>
      </>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <Nav />
      <form onSubmit={handleFormSubmit}>
        <div className="text-center">
          {/* --- 책 제목과 저자 --- */}
          <div className="my-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-main-font mb-2">{book.title}</h1>
            <p className="text-base text-gray-2">- {book.author}</p>
          </div>

          {/* --- 이미지 변경 영역 --- */}
          <div 
            className="relative group w-full max-w-md mx-auto my-6 cursor-pointer" 
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={bookImg}
              alt={book.title}
              onError={(e) => (e.currentTarget.src = "/images/noBookImg.png")}
              className="w-full h-auto object-cover rounded-lg shadow-lg transition-all duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg">
              <div className="w-16 h-16 bg-white/80 rounded-full text-4xl text-yellow-600 font-bold flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100">
                +
              </div>
            </div>
          </div>
          
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} imgChangeFn={setBookImg} />

          {/* --- 수정 폼 영역 --- */}
          <div className="max-w-9/10 lg:max-w-[75.00rem] md:max-w-[48.125rem] mx-auto text-left space-y-6">
            <div>
              <label htmlFor="reviewInput" className="block font-semibold text-lg text-main-font mb-2">독서 후기</label>
              <textarea
                id="reviewInput"
                rows={10}
                value={bookReview}
                onChange={(e) => setBookReview(e.target.value)}
                required
                className="w-full p-3 bg-[#fdf6ec] rounded-lg border border-[#e0dcd2] text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition resize-y"
              />
            </div>
            <div>
              <label htmlFor="commentInput" className="block font-semibold text-lg text-main-font mb-2">책에 대한 한줄 코멘트</label>
              <input
                type="text"
                id="commentInput"
                value={bookComment}
                onChange={(e) => setBookComment(e.target.value)}
                required
                className="w-full p-3 bg-[#fdf6ec] rounded-lg border border-[#e0dcd2] text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition"
              />
            </div>
            
            {/* --- 완료/취소 버튼 --- */}
            <div className="text-right space-x-2 mt-6">
              <button type="submit" className="px-4 py-2 bg-[#f3f0e8] rounded-lg text-xl transition hover:bg-[#e1d7c3]">✅</button>
              <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-[#f3f0e8] rounded-lg text-base transition hover:bg-[#e1d7c3]">취소하기</button>
            </div>
            
            <p className="text-center text-sm text-gray-400 pt-8">수정일: {today}</p>
          </div>
        </div>
      </form>

      {/* --- 저장 확인 모달 UI --- */}
      {showConfirmSave && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <p className="text-lg font-semibold mb-4">작성일은 오늘로 변경됩니다.<br/>수정하시겠습니까?</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleConfirmSave} className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">수정</button>
              <button onClick={() => setShowConfirmSave(false)} className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}