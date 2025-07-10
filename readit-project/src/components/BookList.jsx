import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=6`
      );
      const data = await res.json();
      setBooks(data.items || []);
    };

    fetchBooks();
  }, []);

  return (
    <div className="book_list">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookList;