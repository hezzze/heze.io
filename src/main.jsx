/* eslint-env browser */

import { render } from 'react-dom';
import { Routes, Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
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
        <HashRouter>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<App />} />
          </Routes>
        </HashRouter>
      </Provider>
    ), appContainer
  );
}
