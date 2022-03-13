import './index.scss';

import config from '../../config';

// - Video needs to be muted, since Chrome 66+ will not autoplay video with sound.
// WCAG general accessibility recommendation is that media such as background video play through only once. Loop turned on for the purposes of illustration; if removed, the end of the video will fade in the same way created by pressing the "Pause" button

export default () => (
  <>
    <video className="bgvid" poster={config.video.poster} playsinline autoPlay muted loop>
      <source src={config.video.url} type="video/webm" />
    </video>
    <div className="mask" />
  </>
);
