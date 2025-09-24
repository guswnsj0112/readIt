import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import nav_logo from '../images/nav_logo.png';
import './Nav.css';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex justify-between items-center max-w-[21.875rem] lg:max-w-[75.00rem] md:max-w-[48.125rem] mt-2 m-auto py-0 px-2 md:px-5 lg:px-6  border-b-2 border-gray-1">
        <Link to="/">
          <img src={nav_logo} alt="로고 사진" className="w-[150px] mb-[5px] lg:w-[200px] h-auto flex" />
        </Link>
        
        {/* 데스크톱 메뉴 (md: 이상 화면에서 보임) */}
        <ul className="hidden md:flex gap-12 items-center font-bold text-base leading-[1.2]">
          <li>
            <Link to="/" className="hover:text-gray-600 transition-colors">
              <span>소개 <sup>01</sup></span>
            </Link>
          </li>
          <li>
            <Link to="/bookcase" className="hover:text-gray-600 transition-colors">
              <span>책장 <sup>02</sup></span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-600 transition-colors">
              <span>문의 <sup>03</sup></span>
            </Link>
          </li>
        </ul>

        {/* 햄버거 버튼 (모바일에서만 보임) */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
        >
          {/* 메뉴가 닫혔을 때 (햄버거 아이콘) */}
          {!isOpen ? (
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          ) : (
            /* 메뉴가 열렸을 때 (X 아이콘) */
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          )}
        </button>
      </nav>

      {/* 모바일 드롭다운 메뉴 */}
      {/* isOpen 상태에 따라 메뉴를 보여주거나 숨깁니다. */}
      {/* md: 이상 화면에서는 항상 숨깁니다. */}
      <ul className={`${isOpen ? 'block' : 'hidden'} md:hidden w-full max-w-[21.875rem] lg:max-w-[75.00rem] m-auto py-0 px-2 lg:px-6`}>
        <li className="py-3 px-2 border-b border-gray-1">
          <Link to="/" onClick={toggleMenu} className="block text-gray-800">
            <span>소개 <sup>01</sup></span>
          </Link>
        </li>
        <li className="py-3 px-2 border-b border-gray-1">
          <Link to="/bookcase" onClick={toggleMenu} className="block text-gray-800">
            <span>책장 <sup>02</sup></span>
          </Link>
        </li>
        <li className="py-3 px-2 border-b border-gray-1">
          <Link to="/contact" onClick={toggleMenu} className="block text-gray-800">
            <span>문의 <sup>03</sup></span>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Nav;