import React from "react";
import { Link } from "react-router-dom";

import "./BookCard.css";


export default function BookCard({ book_data }) {
  const { id, title, author, img_src, writeDay, comment} = book_data;
  const thumbnail = img_src || '/images/rogo_with_text.png';
  return (
    <div className="BookCard">
		<Link to={`/bookwhisper/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
			<img src={thumbnail} alt={`${title} 표지`} className="thumbnail" />
			<div className="title-author">
				<h4 className="title">{title}</h4>
				<p className="author">- {author}</p>
			</div>
			<p className="comment">{comment}</p>
			<p className="writeDay">작성일: {writeDay}</p>
		</Link>
    </div>
  );
}

