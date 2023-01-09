import { Route, Switch, } from 'react-router-dom';
import Home from './pages/Home';
import './style.scss';
import Provider from './utils/Provider';
import 'flickity/dist/flickity.min.css';
import Single from './pages/Single';

const App = () => {
  return (
    <Provider>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/:type/:id-:name'>
          <Single />
        </Route>
      </Switch>
    </Provider>
  );
}

export default App;
