import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from './pages/Home';
import './style.scss';
import Provider from './utils/Provider';
import 'flickity/dist/flickity.min.css';
import Single from './pages/Single';

const App = () => {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:type/:id-:name' element={<Single />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
