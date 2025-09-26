import Nav from "../components/Nav.jsx";
import main_image from "../images/main_image.png";
import BookCard from "../components/BookCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuoteConontainer from "../components/QuoteConontainer";
export default function Home() {
  const [books, setBooks] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem("books");
    if (stored) {
      const parsedBooks = JSON.parse(stored);
      setBooks(parsedBooks);
    }
  }, []);

  return (
    <div className="Home">
      <Nav />
      <h1 className="sr-only">읽잇- 독서록 웹사이트</h1>
      <main className="lg:max-w-[75.00rem] md:max-w-[48.125rem] my-0 m-auto py-0 px-6 flex flex-col items-center text-main-fon">
        <div className="mr-auto mt-3 lg:mt-5">
          <h2 className="text-[25px] mb-1 lg:text-[2.50rem] leading-none font-bold m-auto">책과 감성의 순간.</h2>
          <h3 className="text-[20px] lg:text-[2.50rem] leading-none font-bold text-gray-1 m-0">나만의 독서 여정, 소중히 남기기.</h3>
        </div>
        <img src={main_image} alt="메인 이미지" className="w-[250px] lg:w-[43.75rem] mt-5  lg:h-[37.50rem]" />
        <QuoteConontainer parsedBooks={books} />
        <div className="grid grid-cols-[repeat(2,_1fr)] md:grid-cols-[repeat(3,_1fr)] gap-8 my-10 mx-0 py-0 md:px-5">
          <section className="bg-white lg:rounded-2xl p-5 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4 bg-white">✍️</div>
            <h4 className="font-bold text-xl mb-2 text-main-font bg-white">감성 기록.</h4>
            <p className="text-[13px] md:text-base leading-normal text-[#7e6d61] bg-white">책을 읽으며 느낀 점을 섬세하게 남길 수 있어요.</p>
          </section>
          <section className="bg-white lg:rounded-2xl p-5 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4 bg-white">📷</div>
            <h4 className="font-bold text-xl mb-2 text-main-font bg-white">이미지와 함께.</h4>
            <p className="text-[13px] md:text-base leading-normal text-[#7e6d61] bg-white">책 이미지와 함께 감상평을 기록해보세요.</p>
          </section>
        <section className="col-span-2 justify-self-center md:col-span-1 md:justify-self-auto bg-white lg:rounded-2xl p-5 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-4 bg-white">📚</div>
            <h4 className="font-bold text-xl mb-2 text-main-font bg-white">나만의 서재.</h4>
            <p className="text-[13px] md:text-base leading-normal text-[#7e6d61] bg-white">읽은 책을 한눈에, 나만의 컬렉션으로 <br />저장.</p>
          </section>
        </div>
        <h3 className="text-[20px] lg:text-[2.50rem] leading-none font-bold text-gray-1 m-0">최근 읽은 책들</h3>
        <p>감성 한줄평으로 보는 나의 서재</p>
        {books ? (
          <div className="flex gap-5">
            {books.length > 3 ? (
              <>
                <BookCard book_data={books[0]} />
                <BookCard book_data={books[1]} />
                <BookCard book_data={books[2]} />
              </>
            ) : (
              books.map((book) => <BookCard book_data={book} key={book.id} />)
				)}
          </div>
        ) : (
           <div className="flex-grow flex flex-col justify-center items-center py-10 px-6 text-center">
      <div className="text-4xl mb-6 text-gray-1">📖</div>
      <p className="text-xl font-medium mb-6 text-main-font">
          나만의 책장에는 아직 어떤 이야기도 담겨있지 않아요.
      </p>
    </div>
        )}
        <div className="mt-24 w-4/5">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-[22px]  mb-1 lg:text-[2.50rem] leading-none font-bold m-auto">지금, 감동을 기록하세요.</h2>
            <p className="mt-0 mb-5 lg:text-[1.38rem] leading-7 font-medium text-gray-1">책의 여운, 감성 그대로 남기기.</p>
            <Link to="/createbookwhisper" className="bg-[#fcefe9] text-[#5a4231] text-[14px] md:text-base py-3 px-6 rounded-3xl hover:bg-[#f5e1d5]">
              👉 책과 나의 순간, 기록하기
            </Link>
          </div>
        </div>
      </main>
      <footer>
        <p className="text-center text-xs md:text-[0.81rem] text-[#999] mt-16 mx-0 mb-8">© 2025 ReadIt. 책과 감성의 순간을 함께합니다.</p>
      </footer>
    </div>
  );
}
