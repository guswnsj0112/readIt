import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

export default function CreateBookWhisper() {
  const [bookData, setBookData] = useState(bookFormat);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmSave, setShowConfirmSave] = useState(false);
  const navigate = useNavigate();
  const today = fetchToday();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowConfirmSave(true);
  };

  const handleConfirmSave = () => {
    const storedBooks = localStorage.getItem("books");
    const booksArray = storedBooks ? JSON.parse(storedBooks) : [];

    const newBook = {
      ...bookData,
      id: uuidv4(),
      writeDay: today,
    };

    const newBooksArray = [newBook, ...booksArray];
    localStorage.setItem("books", JSON.stringify(newBooksArray));
    
    setShowConfirmSave(false);
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <Nav />
      <form onSubmit={handleFormSubmit}>
        <div className="max-w-lg lg:max-w-xl mx-auto text-left space-y-6">
          {/* --- 책 제목 / 저자 입력 --- */}
          <div>
            <label htmlFor="title" className="block font-semibold text-lg text-main-font mb-2">책 제목</label>
            <input
              type="text"
              id="title"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              placeholder="책 제목을 입력하세요"
              required
              className="w-full p-3 bg-[#fdf6ec] rounded-lg border border-[#e0dcd2] text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition"
            />
          </div>
          <div>
            <label htmlFor="author" className="block font-semibold text-lg text-main-font mb-2">저자</label>
            <input
              type="text"
              id="author"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              placeholder="저자를 입력하세요"
              required
              className="w-full p-3 bg-[#fdf6ec] rounded-lg border border-[#e0dcd2] text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition"
            />
          </div>

          {/* --- 이미지 추가 영역 --- */}
          <div className="group relative w-full h-auto mx-auto my-6 rounded-lg overflow-hidden shadow-lg bg-gray-100">
            <img
              src={bookData.img_src || "/images/noBookImg.png"}
              alt={bookData.title || "책 사진 없음"}
              onError={(e) => (e.currentTarget.src = "/images/noBookImg.png")}
              className="w-full h-auto max-h-[500px] object-cover transition-all duration-300 group-hover:filter group-hover:brightness-60"
            />
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/80 rounded-full text-4xl text-yellow-600 font-bold flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-yellow-600 hover:text-white hover:scale-105"
            >
              +
            </button>
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} imgChangeFn={(url) => setBookData(p => ({...p, img_src: url}))} />

          {/* --- 독서 후기 / 한줄 코멘트 입력 --- */}
          <div>
            <label htmlFor="review" className="block font-semibold text-lg text-main-font mb-2">독서 후기</label>
            <textarea
              id="review"
              name="review"
              rows={10}
              value={bookData.review}
              onChange={handleChange}
              required
              className="w-full p-3 bg-[#fdf6ec] rounded-lg border border-[#e0dcd2] text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition resize-y"
            />
          </div>
          <div>
            <label htmlFor="comment" className="block font-semibold text-lg text-main-font mb-2">책에 대한 한줄 코멘트</label>
            <input
              type="text"
              id="comment"
              name="comment"
              value={bookData.comment}
              onChange={handleChange}
              required
              className="w-full p-3 bg-[#fdf6ec] rounded-lg border border-[#e0dcd2] text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition"
            />
          </div>

          {/* --- 저장 / 취소 버튼 --- */}
          <div className="text-right space-x-2 mt-6">
            <button type="submit" className="px-4 py-2 bg-[#f3f0e8] rounded-lg text-xl transition hover:bg-[#e1d7c3]">✅</button>
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-[#f3f0e8] rounded-lg text-base transition hover:bg-[#e1d7c3]">취소하기</button>
          </div>

          <p className="text-center text-sm text-gray-400 pt-8">작성일: {today}</p>
        </div>
      </form>

      {/* --- 저장 확인 모달 UI --- */}
      {showConfirmSave && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <p className="text-lg font-semibold mb-4">저장하시겠습니까?</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleConfirmSave} className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">저장</button>
              <button onClick={() => setShowConfirmSave(false)} className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}