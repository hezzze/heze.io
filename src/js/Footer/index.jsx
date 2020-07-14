import {
  WingBlank
} from 'antd-mobile';
import GitHubButton from 'react-github-btn';

import './index.scss';

export default () => (
  <WingBlank>
    <center>
      <p className="footer-box">
        <div className="github-btn"><GitHubButton href="https://github.com/hezzze/heze.io" data-color-scheme="no-preference: light; light: light; dark: dark;" aria-label="Star hezzze/heze.io on GitHub">Star</GitHubButton></div>
        <a href="https://heze.io" className="site-link"><i>heze.io</i></a>
        <span className="version-text">v1.1.0</span>
      </p>
    </center>
  </WingBlank>
);
