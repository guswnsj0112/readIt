import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Bookcase from "./pages/Bookcase";
import BookWhisper from "./pages/BookWhisper";
import EditBookWhisper from "./pages/EditBookWhisper";

import "./App.css";
function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookcase" element={<Bookcase />} />
        <Route path="/bookwhisper/:id" element={<BookWhisper />} />
        <Route path="/editbookwhisper/:id" element={<EditBookWhisper />} />
      </Routes>
    </div>
  );
}

export default App;
