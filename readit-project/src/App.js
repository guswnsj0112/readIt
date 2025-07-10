import './App.css';
import Nav from './components/nav.jsx';
import main_image from './images/main_image.png'
import BookList from './components/BookList.jsx'

function App() {
  return (
    <div className="App">
		  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
		  <Nav />
		  <h1 className="sr-only">읽잇 ReadIt</h1>
		  <main>
			  <div className="slogan">
			  	<h2>책과 감성의 순간.</h2>
			  	<h3>나만의 독서 여정, 소중히 남기기.</h3>
			  </div>
			  <img src={main_image} alt="메인 이미지" className="mainImage" />
			  <div className='quote'>
					<blockquote>
					  <p>경쟁하지 말고 독점하라</p>
					  <cite>– ZERO to ONE / 2025년 06월</cite>
					</blockquote>
  			  </div>
			  <div className="introduction">
				 <section>
				  <div className= "emoji">✍️</div>
				  <h4>감성 기록.</h4>
				  <p>책을 읽으며 느낀 점을 섬세하게 남길 수 있어요.</p>
				</section>
				<section>
				  <div className= "emoji">📷</div>
				  <h4>이미지와 함께.</h4>
				  <p>책 이미지와 함께 감상평을 기록해보세요.</p>
				</section>
				<section>
				  <div className= "emoji">📚</div>
				  <h4>나만의 서재.</h4>
				  <p>읽은 책을 한눈에, 나만의 컬렉션으로 저장.</p>
				</section>
			  </div>
			  <h3>최근 읽은 책들</h3>
			  <p>감성 한줄평으로 보는 나의 서재</p>
			  <BookList />
			  <div className="bottom">
				<h2>지금, 감동을 기록하세요.</h2>
			  	<p>책의 여운, 감성 그대로 남기기.</p>
			  	<div className="btn">독서 기록 시작하기</div>
			  </div>
		  </main>
    </div>
  );
}

export default App;
