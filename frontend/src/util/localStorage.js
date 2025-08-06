// localStorage.js
import { v4 as uuidv4 } from "uuid";
export function fetchLocalStorageBooks() {
  const data = localStorage.getItem("books");
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (book) =>
          book.id && book.author && book.writeDay && book.review && book.comment
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
    id: uuidv4(),
    title:
      "엄청 엄청 긴 텍스트 테스 중입니다 엄청 엄청 긴 텍스트 테스 중입니다엄청 엄청 긴 텍스트 테스 중입니다엄청 엄청 긴 텍스트 테스 중입니다엄청 엄청 긴 텍스트 테스 중입니다",
    author: "저자123123121",
    img_src: "/images/rogo_with_text.png",
    review:
      "엄청 엄청 긴 텍스트 테스 중입니다 엄청 엄청 긴 텍스트 테스 중입니다엄청 엄청 긴 텍스트 테스 중입니다엄청 엄청 긴 텍스트 테스 중입니다엄청 엄청 긴 텍스트 테스 중입니다",
    comment: "음 책이 재밌네요",
    writeDay: "2025-07-31",
  },
  {
    id: uuidv4(),
    author: "tester",
    title: "book_name",
    comment: "음 책이 재밌네요",
    review: "테스트 중입니다",
    writeDay: "2025-07-31",
  },
  {
    id: uuidv4(),
    author: "tester",
    title: "book_name",
    review:
      "짧지만 깊게 남는 여운. 읽고 난 후 마음이 한결 따뜻해지는 책이었다. 일상에 지친 이들에게 조용한 위로가 된다. 한 번쯤 모든 이가 읽어보면 좋겠다는 생각이 절로 든다.",
    comment: "음 책이 재밌네요",
    img_src: "/images/rogo_with_text.png",
    writeDay: "2025-07-31",
  },
  {
    id: uuidv4(),
    author: "tester",
    title: "book_name",
    img_src: "/images/rogo_with_text.png",
    review: "테스트 중입니다",
    comment: "음 책이 재밌네요",
    writeDay: "2025-07-31",
  },
  {
    id: uuidv4(),
    author: "tester",
    title: "book_name",
    img_src: "/images/rogo_with_text.png",
    review: "테스트 중입니다",
    comment: "음 책이 재밌네요",
    writeDay: "2025-07-31",
  },
  {
    id: uuidv4(),
    author: "tester",
    title: "book_name",
    img_src: "/images/rogo_with_text.png",
    review: "테스트 중입니다",
    comment: "음 책이 재밌네요",
    writeDay: "2025-07-31",
  },
  {
    id: uuidv4(),
    author: "tester",
    title: "book_name",
    img_src: "/images/rogo_with_text.png",
    review: "테스트 중입니다",
    comment: "음 책이 재밌네요",
    writeDay: "2025-07-31",
  },
  {
    id: uuidv4(),
    author: "tester",
    title: "book_name",
    img_src: "/images/rogo_with_text.png",
    review: "테스트 중입니다",
    comment: "음 책이 재밌네요",
    writeDay: "2025-07-31",
  },
  {
    id: uuidv4(),
    author: "tester",
    title: "book_name",
    img_src: "/images/rogo_with_text.png",
    review: "테스트 중입니다",
    comment: "음 책이 재밌네요",
    writeDay: "2025-07-31",
  },
  {
    id: uuidv4(),
    author: "tester",
    title: "book_name",
    img_src: "/images/rogo_with_text.png",
    review: "테스트 중입니다",
    comment: "음 책이 재밌네요",
    writeDay: "2025-07-31",
  },
];

export function addDummies() {
  // 이름은 그대로 addDummies로 유지한다 가정
  let existingBooks = fetchLocalStorageBooks();
  const combinedBooksMap = new Map();
  existingBooks.forEach((book) => combinedBooksMap.set(book.id, book));
  dummies.forEach((book) => combinedBooksMap.set(book.id, book)); // 더미가 기존 데이터 덮어쓰거나 추가
  const updatedBooks = Array.from(combinedBooksMap.values());
  localStorage.setItem("books", JSON.stringify(updatedBooks));
  console.log(
    "Dummy data added/merged into existing localStorage 'books' data."
  );
}
