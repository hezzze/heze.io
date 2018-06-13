/* eslint-env browser */

import { render } from 'react-dom';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import App from './js/App';

const appContainer = document.getElementById('app');

if (appContainer) {
  render(
    (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </BrowserRouter>
    ), appContainer
  );
}
