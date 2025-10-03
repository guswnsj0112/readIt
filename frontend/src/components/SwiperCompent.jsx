import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import BookCard from "../components/BookCard";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Pagination } from 'swiper/modules';

export default function SwiperCompent({ bookcards }) {
  console.log(bookcards[0])
  return (
    <div className="swiper">
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {bookcards.slice(0, 3).map(book => (
          <SwiperSlide key={book.id}>
					  <BookCard book_data={book} />
		  </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
