# 📚 ReadIt - 감성 독서 기록 웹서비스

> 책과 감성의 순간, 나만의 독서 여정을 소중히 남기기 위해 만든 프로젝트
<img width="599" height="771" alt="LandingPage" src="https://github.com/user-attachments/assets/cbc5256e-de03-4802-bfc4-43fa9179108d" />

-(https://readit-38t1.onrender.com/)
  
---

## 🧩 소개

**ReadIt**은 사용자가 읽은 책에 대한 감정과 감상을 자유롭게 기록할 수 있도록 설계된  
감성 중심의 독서 기록 웹서비스입니다.

- 로컬 스토리지 기반으로 나만의 독서 흐름을 소중히 저장합니다.

- 독서 후 감정 기반 기록을 통해  **단순한 독서 기록이 아닌, 감정의 기록**을 추구합니다.

---

## 🎨 주요 기능 (1차 MVP 기준)

| 기능 |
|------
| ✅ 감성 랜딩 페이지 
| ✅ 직관적이며 감성적인 UX 구성 
| ✅ 책 리스트 카드 출력 
| ✅ 나만의 책장/감정 히스토리 페이지
---

## 🛠️ 기술 스택

- **Front-End**: React, Vite
- **배포**: Render  
- **기획 및 디자인**: Framer, Notion 기반 플로우 정의

---

## 🌱 향후 개발 계획
- [ ] 반응형 카드 UI, 최근 읽은 책 나열
- [ ] 감상문 작성 기능 
- [ ] 반응형 디자인 | 모바일 및 태블릿 대응 (Tailwind 적용) 
- [ ] Firebase 또는 Express/MongoDB를 통한 감상문 백엔드 저장
- [ ] 유저 로그인 기능
- [ ] 감정 태그 기반 책 추천 기능



## 📁 프로젝트 폴더 구조
readIt/
├── backend/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── BookCard.*
│       │   ├── BookWhisper.css
│       │   ├── Bookcase.css
│       │   ├── EditBookWhisper.css
│       │   ├── FetchBookAPI.jsx
│       │   ├── Nav.*
│       │   ├── QuoteConontainer.*
│       │   ├── RecordForm.jsx
│       │   └── SearchBar.*
│       ├── images/
│       ├── pages/
│       ├── util/
│       │   ├── fetchToday.js
│       │   └── localStorage.js
│       ├── App.*
│       └── main.jsx
*.jsx / *.css: 해당 컴포넌트의 JSX와 CSS 파일이 함께 존재함을 의미합니다.
(+백엔드 파일과 추가적인 파일 생략)

## 📌 폴더/파일 설명
경로/파일명	설명
components/	재사용 가능한 UI 컴포넌트들
pages/	페이지 단위 라우트 컴포넌트
util/	날짜 계산, 로컬 스토리지 등 유틸 함수
images/	앱에서 사용하는 정적 이미지
App.jsx	메인 앱 컴포넌트
main.jsx	React 앱 엔트리 포인트

