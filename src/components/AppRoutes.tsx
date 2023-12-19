import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from '../styles/GlobalStyle';
import Test from '../pages/test/Test';
import Home from '../pages/home/Home';
import Statistic from '../pages/Statistic';

const AppRoutes = () => (
  <Router>
    <GlobalStyles />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="/Statistic" element={<Statistic />} />
    </Routes>
  </Router>
);

export default AppRoutes;
