import React from "react";
import "./BookCard.css";

export default function BookCard({ book_data }) {
  const { title, author, img_src, writeDay, paragraph} = book_data;
  const thumbnail = img_src || '/images/rogo_with_text.png';

  return (
    <div className="BookCard">
        <img src={thumbnail} alt={`${title} 표지`} className="thumbnail" />
		<h4 className="title">{title}</h4>
		<p className="author">- {author}</p>
		<p className="paragraph">{paragraph}</p>
		<p className="writeDay">작성일: {writeDay}</p>
    </div>
  );
}

