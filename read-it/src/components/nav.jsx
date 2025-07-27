import nav_logo from '../images/nav_logo.png';
import './nav.css';

function Nav() {
  return (
    <nav className="Nav">
      <img src={nav_logo} alt="로고 사진" className="navLogo" />
      <ul className="menu">
        <li>
          <span>소개</span>
          <p>01</p>
        </li>
        <li>
          <span>책장</span>
          <p>02</p>
        </li>
        <li>
          <span>문의</span>
          <p>03</p>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
