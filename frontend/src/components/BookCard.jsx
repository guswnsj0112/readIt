import React from "react";
import { Link } from "react-router-dom";

export default function BookCard({ book_data }) {
  const { id, title, author, img_src, writeDay, comment } = book_data;
  // 이미지가 없을 경우를 대비한 기본 썸네일 이미지
  const thumbnail = img_src || "/images/rogo_with_text.png";

  return (
    <div className="w-[300px] mx-auto md:w-[250px] md:mx-5 lg:w-[360px] h-[337px] m-4 bg-white border border-gray-200 rounded-lg shadow-md transition-transform duration-200 ease-in-out hover:-translate-y-1">
      <Link
        to={`/bookwhisper/${id}`}
        className="block p-4 h-full w-full flex flex-col no-underline text-main-font"
      >
        <img
          src={thumbnail}
          alt={`${title} 표지`}
          className="w-full h-[200px] rounded object-cover border border-gray-300 shrink-0"
        />

        <div className="flex flex-col flex-grow mt-2">
          <div className="flex justify-between items-start">
            <h4 className="w-[200px] text-base font-bold text-main-font truncate">{title}</h4>
            <p className="w-[80px] text-sm text-gray-2 text-right truncate shrink-0 ml-2">- {author}</p>
          </div>
          <p className="text-[15px] text-main-font truncate mt-2.5">{comment}</p>
          <p className="text-xs text-gray-400 text-right mt-auto">작성일: {writeDay}</p>
        </div>
      </Link>
    </div>
  );
}
