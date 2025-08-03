import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';

import "../components/BookWhisper.css";
import "../components/EditBookWhisper.css";

import Nav from "../components/Nav";
import fetchToday from "../util/fetchToday";

export default function EditBookWhisper() {
	const { id } = useParams();
	const [book, setBook] = useState(null);
	const [bookImg, setBookImg] = useState('');
	const [bookReview, setBookReview] = useState('');
	const [bookComment, setBookComment] = useState('');
	const [bookToday, setBookToday] = useState(fetchToday());
	const navigate = useNavigate(); // 수정 후 다시 원래 페이지로
	
	useEffect(() => {
		const storedBooks = localStorage.getItem('books');

		if (storedBooks) {
			const booksArray = JSON.parse(storedBooks);
			const foundBook = booksArray.find(item => item.id === id);

			// 이미지가 없으면 기본 이미지로 대체
			if (foundBook) {
				setBook(foundBook);
				setBookImg(foundBook.img_src);
				setBookReview(foundBook.review);
				setBookComment(foundBook.comment);
			}
		}
	}, [id]);
	
	const handleReviewChange = (e) => {
		setBookReview(e.target.value);
	}
	
	const handleCommentChange = (e) => {
		setBookComment(e.target.value);
	}
	
	const EditBook= () => {
		const confirmDelete = window.confirm("작성일은 오늘로 변경됩니다. 수정하시겠습니까?");
  	  	if (!confirmDelete) return;
		const storedBooks = localStorage.getItem('books');
		const booksArray = JSON.parse(storedBooks);
		const foundBook = booksArray.find(item => item.id === id);
		const BookIdx = booksArray.findIndex(item => item.id === id);
		console.log(book);
		const updateBook = {
				id: id, 
				title: book.title,
				author: book.author,
				img_src: bookImg,
				review: bookReview,
				comment: bookComment,
				writeDay: bookToday,
			};
		const newBooksArray = [...booksArray];
		newBooksArray[BookIdx] = updateBook;
		localStorage.setItem("books", JSON.stringify(newBooksArray));
		navigate(-1);
		console.log(book);
	}
	return (
		<div className="EditBookWhisper">
			<Nav />
			{book ? (
				<div className="bookDetail">
					<div className="top">
						<h1>{book.title}</h1>
						<p>- {book.author}</p>
					</div>
					<img 
						src={bookImg ? bookImg :  "/images/noBookImg.png"} 
						alt={bookImg ? book.title : "책 사진이 없어요"} 
						onError={(e) => e.currentTarget.src = "/images/noBookImg.png"}
						/>
					<div className="BookWhisper-bottom">
						<div className="review">
							<label htmlFor="reviewInput">독서 후기</label>
							<textarea row={5} value={bookReview} id="reviewInput" name="reviewInput" onChange={handleReviewChange}/>
						</div>
						<div className="comment">
							<label htmlFor="commentInput">책에 대한 한줄 코멘트</label>
							<input type="text" value={bookComment} id="commentInput" name="commentInput" onChange={handleCommentChange}/>
						</div>
						<div className="icon-buttons">
							<button onClick={EditBook}>✅</button>
							<button onClick={() => navigate(-1)}>취소하기</button>
						</div>
						<p className="writeDay">수정일: {fetchToday()}</p>
					</div>
				</div>
			) : (
				<p>책을 찾을 수 없습니다.</p>
			)}
		</div>
	);
}