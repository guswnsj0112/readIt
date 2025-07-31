// localStorage.js

export function fetchLocalStorageBooks() {
  const data = localStorage.getItem("books");
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed.filter(book =>
        book.id && book.author && book.writeDay && book.paragraph
      );
    }
    return [];
  } catch (e) {
    console.error("localStorage 파싱 에러:", e);
    return [];
  }
}


//  add dummies arry in localStorage
const dummies = [
  {
    id: 1,
	title: "엄청 엄청 긴 텍스트 테스 중입니다 엄청 엄청 긴 텍스트 테스 중입니다엄청 엄청 긴 텍스트 테스 중입니다엄청 엄청 긴 텍스트 테스 중입니다엄청 엄청 긴 텍스트 테스 중입니다",
    author: "저자123123121",
    writeDay: "2025-07-31", 
    paragraph: "엄청 엄청 긴 텍스트 테스 중입니다 엄청 엄청 긴 텍스트 테스 중입니다엄청 엄청 긴 텍스트 테스 중입니다엄청 엄청 긴 텍스트 테스 중입니다엄청 엄청 긴 텍스트 테스 중입니다",
    img_src: "/images/rogo_with_text.png",
  },
  {
    id: 2,
    author: "tester",
	title: "book_name",
    writeDay: "2025-07-31",
    paragraph: "테스트 중입니다",
  },
  {
    id: 3,
    author: "tester",
	title: "book_name",
    writeDay: "2025-07-31",
    paragraph: "테스트 중입니다",
    img_src: "/images/rogo_with_text.png",
  },
  {
    id: 4,
    author: "tester",
	title: "book_name",
    writeDay: "2025-07-31",
    paragraph: "테스트 중입니다",
    img_src: "/images/rogo_with_text.png",
  },
  {
    id: 5,
    author: "tester",
	title: "book_name",
    writeDay: "2025-07-31",
    paragraph: "테스트 중입니다",
    img_src: "/images/rogo_with_text.png",
  },
  {
    id: 6,
    author: "tester",
	title: "book_name",
    writeDay: "2025-07-31",
    paragraph: "테스트 중입니다",
    img_src: "/images/rogo_with_text.png",
  },
  {
    id: 7,
    author: "tester",
	title: "book_name",
    writeDay: "2025-07-31",
    paragraph: "테스트 중입니다",
    img_src: "/images/rogo_with_text.png",
  },
  {
    id: 8,
    author: "tester",
	title: "book_name",
    writeDay: "2025-07-31",
    paragraph: "테스트 중입니다",
    img_src: "/images/rogo_with_text.png",
  },
  {
    id: 9,
    author: "tester",
	title: "book_name",
    writeDay: "2025-07-31",
    paragraph: "테스트 중입니다",
    img_src: "/images/rogo_with_text.png",
  },{
    id: 10,
    author: "tester",
	title: "book_name",
    writeDay: "2025-07-31",
    paragraph: "테스트 중입니다",
    img_src: "/images/rogo_with_text.png",
  },
];

export function addDummies() { // 이름은 그대로 addDummies로 유지한다 가정
  let existingBooks = fetchLocalStorageBooks();
  const combinedBooksMap = new Map();
  existingBooks.forEach(book => combinedBooksMap.set(book.id, book));
  dummies.forEach(book => combinedBooksMap.set(book.id, book)); // 더미가 기존 데이터 덮어쓰거나 추가
  const updatedBooks = Array.from(combinedBooksMap.values());
  localStorage.setItem("books", JSON.stringify(updatedBooks));
  console.log("Dummy data added/merged into existing localStorage 'books' data.");
}