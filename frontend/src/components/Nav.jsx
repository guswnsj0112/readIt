// src/components/Nav.jsx

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
      <nav className="flex justify-between items-center h-12 lg:h-24 max-w-[21.875rem] lg:max-w-[75.00rem] my-2 m-auto py-0 px-2 lg:px-6 border-b border-gray-1 relative">
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
          className="md:hidden focus:outline-none z-50"
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

      {/* 모바일 메뉴 오버레이 */}
      <div
        className={`fixed top-0 right-0 h-full w-full backdrop-blur-sm bg-black/50 transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden z-40`}
        onClick={toggleMenu}
      >
        <ul
          className="absolute right-0 h-1/3 w-1/3 max-w-[300px] bg-white shadow-xl flex flex-col p-8 space-y-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 메뉴 닫기 버튼 */}
          <button
            onClick={toggleMenu}
            className="self-end text-2xl z-40 font-bold text-gray-600 hover:text-gray-900 transition-colors"
          >
          </button>
          
          <li>
            <Link to="/" className="block py-2 text-l font-medium text-gray-800 hover:text-blue-500 transition-colors">
              소개 <sup>01</sup>
            </Link>
          </li>
          <li>
            <Link to="/bookcase" className="block py-2 text-l font-medium text-gray-800 hover:text-blue-500 transition-colors">
              책장 <sup>02</sup>
            </Link>
          </li>
          <li>
            <Link to="/contact" className="block py-2 text-l font-medium text-gray-800 hover:text-blue-500 transition-colors">
              문의 <sup>03</sup>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Nav;