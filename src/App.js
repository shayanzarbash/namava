import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './style.scss';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
