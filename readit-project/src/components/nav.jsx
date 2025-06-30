import nav_logo from '../images/nav_logo.png';
import './nav.css'

function Nav() {
  return (
    <div className="Nav">
		  <img src={nav_logo}  alt="로고 사진" width="250" height="75" className ="navLogo"/>
		  <ul className="menu">
			  <li>소개 <p>01</p></li>
			  <li>책장 <p>02</p></li>
			  <li>문의 <p>03</p></li>
		  </ul>
    </div>
  );
}

export default Nav;