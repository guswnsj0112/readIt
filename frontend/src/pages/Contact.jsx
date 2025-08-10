import Nav from "../components/Nav";
import "../components/Contact.css";

export default function Contact() {
  return (
    <div className="Contact">
      <Nav />
      <section className="contact-container">
        <h1>Contact Us</h1>
        <h2>문의사항이 있으신가요?</h2>

        <div className="contact-section">
          <h3>첫 이미지 로딩이 오래 걸리는 이유</h3>
          <p>
            현재 Render 무료 플랜을 사용하고 있어, 서버에서 이미지 API를
            실행하고 응답을 받는 과정이 상대적으로 오래 걸립니다.
          </p>
        </div>

        <div className="contact-section">
          <h3>저장 방식</h3>
          <p>
            책 정보는 로컬 스토리지(Local Storage)에 저장됩니다. 브라우저를
            새로고침해도 데이터는 유지되지만, 다른 브라우저나 기기에서는 접근할
            수 없습니다. 또한 브라우저 캐시를 삭제하면 저장된 책 정보가
            사라집니다.
          </p>
        </div>

        <div className="contact-section">
          <h3>API 및 이미지</h3>
          <ul>
            <li>API: Naver Book API</li>
            <li>이미지: ChatGPT 생성 이미지</li>
          </ul>
        </div>

        <div className="contact-section">
          <h3>향후 개선 예정</h3>
          <ul>
            <li>PC, 태블릿, 모바일 환경에 대응하는 반응형 디자인</li>
            <li>
              백엔드 구축 시, 직접 이미지 파일 업로드 기능 지원
              <br />
              (현재는 Base64 URL 형식으로 저장하여 Local Storage 용량 제한으로
              불가능)
            </li>
            <li>로그인 기능 및 데이터베이스 저장</li>
            <li>데이터베이스 기록을 사용하여 독서 습관 그래프 추가</li>
          </ul>
        </div>

        <div className="contact-section">
          <h3>기타 문의</h3>
          <ul>
            <li>
              이메일:{" "}
              <a href="mailto:guswnsj0112@naver.com">guswnsj0112@naver.com</a>
            </li>
            <li>
              GitHub:{" "}
              <a
                href="https://github.com/guswnsj0112"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/guswnsj0112
              </a>
            </li>
            <li>
              읽잇 MVP 프로젝트:{" "}
              <a
                href="https://stream-puffin-abd.notion.site/MVP-221e0b38263d806986abfecd3ed69fc9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Notion 페이지
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
