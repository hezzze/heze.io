import {
  Button, Flex, WhiteSpace
} from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

import AtvImage from '../AtvImage';
import './index.scss';

const backImageSrc = require('../../assets/card-back.png');

export default function About() {
  const navigate = useNavigate();

  return (
    <div>
      <center><p>被发现了！🤪🤓😅<br />Hey, don't look!! xD</p></center>
      <div className="hz-card-box disable-select">
        <AtvImage
          layers={[
            backImageSrc
          ]}
          staticFallback="http://kloc.pm/images/kloc-icon-flattened.jpg"
          style={{ width: 320, height: 320 }}
        />
      </div>
      <WhiteSpace />
      <Flex justify="center">
        {/* use `am-button-borderfix`. because Multiple buttons inline arranged, the last one border-right may not display */}
        <Button icon="left" inline size="small" onClick={() => navigate('/')} className="am-button-borderfix">back</Button>
      </Flex>
    </div>
  );
}
