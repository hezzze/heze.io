import AtvImage from './AtvImage';
import './App.scss';

const backImageSrc = require('../assets/card-back.png');

const App = () => (
  <div>
    <center><p>你好，朋友<br />What triggers your curiosity today?</p></center>
    <div className="hz-card-box disable-select">
      <AtvImage
        layers={[
          backImageSrc
        ]}
        staticFallback="http://kloc.pm/images/kloc-icon-flattened.jpg"
        style={{ width: 320, height: 320 }}
      />
    </div>
    <center><a href="https://heze.io" style={{ fontFamily: 'fantasy' }}><i>heze.io</i></a> &nbsp; v1.0</center>
  </div>
);

export default App;
