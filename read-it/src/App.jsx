import './App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
		  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
		  <Routes>
  			<Route path="/" element={<Home />} />
		  </Routes>
    </div>
  );
}

export default App;
