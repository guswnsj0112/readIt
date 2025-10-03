import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";


import Nav from "../components/Nav";

export default function BookWhisper() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // 삭제 확인 UI를 위한 상태
  const navigate = useNavigate();

  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      const booksArray = JSON.parse(storedBooks);
      const foundBook = booksArray.find((item) => item.id === id);

      if (foundBook) {
        // 이미지가 없으면 기본 이미지로 대체
        if (!foundBook.img_src) {
          foundBook.img_src = "/images/noBookImg.png";
        }
        setBook(foundBook);
      }
    }
  }, [id]);

  const handleDelete = () => {
    const storedBooks = localStorage.getItem("books");
    if (!storedBooks) return;

    const booksArray = JSON.parse(storedBooks);
    const updatedBooks = booksArray.filter((item) => item.id !== id);
    localStorage.setItem("books", JSON.stringify(updatedBooks));

    setBook(null); // 상태 초기화
    navigate("/bookcase"); // 페이지 이동
  };

  if (!book) {
    return (
      <>
        <Nav />
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-gray-500">책을 찾을 수 없습니다.</p>
        </div>
      </>
    );
  }

  return (
    // --- BookWhisper 스타일 ---
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <Nav />
      {/* --- bookDetail 스타일 --- */}
      <div className="text-center">
        {/* --- top 스타일 --- */}
        <div className="my-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-main-font mb-2">{book.title}</h1>
          <p className="text-base text-gray-2">- {book.author}</p>
        </div>

        {/* --- img 스타일 --- */}
        {/* 반응형 너비 및 높이 적용 */}
        <img
          src={book.img_src}
          alt={book.title}
          onError={(e) => (e.currentTarget.src = "/images/noBookImg.png")}
          className="w-full max-w-lg lg:max-w-xl h-auto object-cover my-6 mx-auto rounded-lg shadow-lg"
        />

        {/* --- BookWhisper-bottom 스타일 --- */}
        {/* space-y-8: 자식 요소들 사이에 수직 간격(32px)을 줌 */}
        <div className="max-w-lg lg:max-w-xl mx-auto text-left space-y-8">
          {/* --- review 스타일 --- */}
          <div className="review">
            <div className="font-semibold text-lg text-main-font">독서 후기</div>
            <p className="mt-2 text-gray-500 leading-relaxed">{book.review}</p>
          </div>

          {/* --- comment 스타일 --- */}
          <div className="comment">
            <div className="font-semibold text-lg text-main-font">책에 대한 한줄 코멘트</div>
            <p className="mt-2 text-gray-500 italic">"{book.comment}"</p>
          </div>

          {/* --- icon-buttons 스타일 --- */}
          <div className="text-right space-x-2">
            <Link to={`/editbookwhisper/${id}`}>
              <button className="px-4 py-2 bg-[#f3f0e8] rounded-lg text-lg transition hover:bg-[#e1d7c3]">✎</button>
            </Link>
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="px-4 py-2 bg-[#f3f0e8] rounded-lg text-lg transition hover:bg-[#e1d7c3]"
            >
              🗑️
            </button>
          </div>

          {/* --- writeDay 스타일 --- */}
          <p className="text-center text-sm text-gray-400 pt-8">작성일: {book.writeDay}</p>
        </div>
      </div>

      {/* --- 삭제 확인 모달 UI --- */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <p className="text-lg font-semibold mb-4">삭제하면 복구할 수 없습니다. <br /> 정말 삭제하시겠습니까?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                삭제
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}