import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './pages/test/Test';
import Home from './pages/home/Home';

const App = () => (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  </>
);

export default App;
