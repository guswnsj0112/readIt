import nav_logo from "../images/nav_logo.png";
import "./nav.css";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <nav className="Nav">
      <img src={nav_logo} alt="로고 사진" className="navLogo" />
      <ul className="menu">
        <li>
          <Link to="/">
            {" "}
            <span>
              {" "}
              소개 <sup>01</sup>{" "}
            </span>{" "}
          </Link>
        </li>
        <li>
          <Link to="/bookcase">
            <span>
              {" "}
              책장 <sup>02</sup>{" "}
            </span>
          </Link>
        </li>
        <li>
          <span>
            {" "}
            문의 <sup>03</sup>{" "}
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
