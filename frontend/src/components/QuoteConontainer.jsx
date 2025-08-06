import { useState, useEffect } from "react";
import "./QuoteConontainer.css";

// 랜덤 인용구 뽑기
function randomQuote(arr) {
  const randomIdx = Math.floor(Math.random() * arr.length);
  const picked = arr[randomIdx];
  return picked;
}

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
    <div className="QuoteConontainer">
      <blockquote>
        <p>{quote.comment}</p>
        <cite>
          – {quote.title} / {quote.writeDay}
        </cite>
      </blockquote>
    </div>
  );
}
