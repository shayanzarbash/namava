import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import './style.scss';
import Provider from './utils/Provider';
import 'flickity/dist/flickity.min.css';
import Single from './pages/Single';

const App = () => {
  return (

    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path={'/:type/:id([0-9]+):name'} exact={true} component={Single} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
