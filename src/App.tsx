import { GlobalStyles } from './styles/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Test from './pages/test/Test';
import Home from './pages/home/Home';
import Statistic from './pages/statistic';

const App = () => (
  <>
    <GlobalStyles />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/statistic" element={<Statistic />} />
      </Routes>
    </Router>
  </>
);

export default App;
