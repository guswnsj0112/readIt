import React from "react";
import "./BookCard.css";

function BookCard({ book }) {
  const { title, authors, imageLinks, infoLink } = book.volumeInfo;
  const thumbnail =
    imageLinks?.thumbnail ||
    "https://via.placeholder.com/128x193?text=No+Image";

  return (
    <div className="book-card">
      <a href={infoLink} target="_blank" rel="noopener noreferrer">
        <img src={thumbnail} alt={`${title} 표지`} className="book-thumbnail" />
      </a>
      <div className="book-info">
        <h4>{title}</h4>
        <p>{authors?.join(", ")}</p>
        <p className="book-source">출처: Google Books</p>
      </div>
    </div>
  );
}

export default BookCard;
