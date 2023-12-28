import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from '../styles/GlobalStyle';
import Statistic from '../pages/statistic';
import Main from '../pages/Main';
import Login from '../pages/login';
import List from '../pages/List';
import Intro from '../pages/intro';
import Register from '../pages/register';
const AppRoutes = () => (
  <Router>
    <GlobalStyles />
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/statistic" element={<Statistic />} />
      <Route path="/main" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/list" element={<List />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
);

export default AppRoutes;
