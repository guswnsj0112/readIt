// localStorage.js

export function fetchLocalStorageBooks() {
  const data = localStorage.getItem("books");
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed.filter(book =>
        book.id && book.author && book.read_day && book.paragraph && book.img_src
      );
    }
    return [];
  } catch (e) {
    console.error("localStorage 파싱 에러:", e);
    return [];
  }
}
