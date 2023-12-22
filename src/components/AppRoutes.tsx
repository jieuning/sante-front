import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from '../styles/GlobalStyle';
import Test from '../pages/test/Test';
import Home from '../pages/home/Home';
import Statistic from '../pages/Statistic';
import Main from '../pages/Main';
import Login from '../pages/login';
import List from '../pages/List'
const AppRoutes = () => (
  <Router>
    <GlobalStyles />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="/statistic" element={<Statistic />} />
      <Route path="/main" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/list" element={<List />} />
    </Routes>
  </Router>
);

export default AppRoutes;
