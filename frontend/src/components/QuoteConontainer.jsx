import { useState, useEffect } from "react";

// Tailwind CSS v4.1에서는 전역 CSS 파일 대신 유틸리티 클래스를 사용합니다.
// 원본 .QuoteConontainer.css 파일은 이제 필요 없습니다.

// 랜덤 인용구 뽑기
function randomQuote(arr) {
  const randomIdx = Math.floor(Math.random() * arr.length);
  const picked = arr[randomIdx];
  return picked;
}

// 원본 CSS의 blockquote:before 스타일을 Tailwind의 임의 값을 사용하여 재현할 수 없으므로,
// 스타일을 `<style>` 태그를 이용해 컴포넌트에 직접 주입합니다.
const quoteBeforeStyle = `
  .QuoteConontainer blockquote {
    position: relative;
  }
  .QuoteConontainer blockquote:before {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -24px; /* 48px/2 = 24px 만큼 위로 */
    background-color: #a3c7db;
    color: #ffffff;
    border: 2px solid #a3c7db;
    box-sizing: border-box;
    content: "”"; 
    line-height: 1;
    padding-top: 12px;
    text-align: center;
    width: 48px;
    height: 48px;
    font-size: 20px;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function QuoteConontainer({ parsedBooks }) {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    if (parsedBooks && parsedBooks.length > 0) {
      const picked = randomQuote(parsedBooks);
      setQuote({
        comment: picked.comment,
        title: picked.title,
        writeDay: picked.writeDay,
      });
    } else {
      setQuote({
        comment: "경쟁하지 말고 독점하라",
        title: "ZERO to ONE",
        writeDay: "책을 등록해보세요",
      });
    }
  }, [parsedBooks]);

  return (
    <div className="QuoteConontainer mx-auto my-[50px]">
      <style>{quoteBeforeStyle}</style>
      <blockquote
        className=" relative border border-[#a3c7db] bg-white p-[20px] "
      >
        <p className="text-[#d8b08c] text-[25px] md:text-[40px] text-center bg-white">
          {quote.comment}
        </p>
        <cite className="block pt-[10px] text-[0.8rem] text-right text-[#808080] bg-white">
          – {quote.title} / {quote.writeDay}
        </cite>
      </blockquote>
    </div>
  );
}