import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './style.scss';
import Provider from './utils/Provider';
import 'flickity/dist/flickity.min.css';

const App = () => {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
