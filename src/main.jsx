// @babel/polyfill is deprecated
// the following lines are replacement as of 7.4
// https://babeljs.io/docs/en/babel-polyfill#docsNav
import 'core-js/stable';
import 'regenerator-runtime/runtime';

/* eslint-env browser */
import { createRoot } from 'react-dom/client';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './js/store/store';

// Initialize i18n
import './i18n';

import App from './js/App';
import About from './js/About';
import Playground from './js/Playground';

// import 'antd-mobile/dist/antd-mobile.css';

const appContainer = document.getElementById('app');

if (appContainer) {
  const root = createRoot(appContainer);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
