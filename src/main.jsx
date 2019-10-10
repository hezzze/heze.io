/* eslint-env browser */

import { render } from 'react-dom';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './js/store/store';

import App from './js/App';
import About from './js/About';

import 'antd-mobile/dist/antd-mobile.css';

const appContainer = document.getElementById('app');

if (appContainer) {
  render(
    (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/" component={App} />
          </Switch>
        </BrowserRouter>
      </Provider>
    ), appContainer
  );
}
