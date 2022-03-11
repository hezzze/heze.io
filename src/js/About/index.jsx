import {
  Button, Space
} from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

import AtvImage from '../AtvImage';
import './index.scss';

import backImageSrc from '../../assets/card-back.png';

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
      <Space justify="center" block>
        <Button size="small" onClick={() => navigate('/')}>
          <i className="fa-regular fa-circle-left" style={{ marginRight: '5px' }} />back
        </Button>
      </Space>
    </div>
  );
}
