/**
* code adopted from https://github.com/keyz/react-atv-img
* using hooks api from react 16.8+
*/

import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

export default function AtvImage(props) {
  const [isOnHover, setIsOnHover] = useState(false);
  const [container, setContainer] = useState({});
  const [shine, setShine] = useState({});
  const [layers, setLayers] = useState([]);

  const rootElemRef = useRef({
    width: 0,
    height: 0
  });
  const offsetsRef = useRef();


  const rootRef = useRef(null);

  const handleMove = ({ pageX, pageY }) => {
    const layerCount = props.layers.length; // the number of layers

    const bodyScrollTop = document.body.scrollTop || document.getElementsByTagName('html')[0].scrollTop;
    const bodyScrollLeft = document.body.scrollLeft;

    const offsets = offsetsRef.current;
    const rootElem = rootElemRef.current;

    const wMultiple = 320 / rootElem.width;
    const offsetX = 0.52 - (pageX - offsets.left - bodyScrollLeft) / rootElem.width; // cursor position X
    const offsetY = 0.52 - (pageY - offsets.top - bodyScrollTop) / rootElem.height; // cursor position Y
    const dy = (pageY - offsets.top - bodyScrollTop) - rootElem.height / 2; // center Y of container
    const dx = (pageX - offsets.left - bodyScrollLeft) - rootElem.width / 2; // center X of container
    const yRotate = (offsetX - dx) * (0.07 * wMultiple); // rotation for container Y
    const xRotate = (dy - offsetY) * (0.1 * wMultiple); // rotation for container X

    const arad = Math.atan2(dy, dx); // angle between cursor and center of container in RAD

    const rawAngle = arad * 180 / Math.PI - 90; // convert rad to degrees
    const angle = rawAngle < 0 ? rawAngle + 360 : rawAngle;

    console.log(xRotate, yRotate);

    setContainer({
      transform: `rotateX(${xRotate}deg) rotateY(${yRotate}deg)` + (isOnHover ? ' scale3d(1.07,1.07,1.07)' : ''),
    });

    setShine({
      background: `linear-gradient(${angle}deg, rgba(255, 255, 255, ${(pageY - offsets.top - bodyScrollTop) / rootElem.height * 0.4}) 0%, rgba(255, 255, 255, 0) 80%)`,
      transform: `translateX(${(offsetX * layerCount) - 0.1}px) translateY(${(offsetY * layerCount) - 0.1}px)`,
    });

    setLayers(props.layers.map((_, idx) => ({
      transform: `translateX(${(offsetX * (layerCount - idx)) * ((idx * 2.5) / wMultiple)}px) translateY(${offsetY * layerCount * ((idx * 2.5) / wMultiple)}px)`,
    })));
  };

  const handleTouchMove = (evt) => {
    evt.preventDefault();
    const { pageX, pageY } = evt.touches[0];
    // console.log(pageX, pageY);
    handleMove({ pageX, pageY });
  };

  const handleEnter = () => {
    setIsOnHover(true);
  };

  const handleLeave = () => {
    setIsOnHover(false);
    setContainer({});
    setShine({});
    setLayers([]);
  };

  // effect hook will be called after DOM is painted, so calculations can go in there
  // see Note section in https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
  useEffect(() => {
    const rootNode = rootRef.current;

    if (!props.isStatic) {
      rootElemRef.current = {
        width: rootNode.clientWidth || rootNode.offsetWidth
        || rootNode.scrollWidth,
        height: rootNode.clientHeight || rootNode.offsetHeight
        || rootNode.scrollHeight
      };
    }
    offsetsRef.current = rootNode.getBoundingClientRect();


    // TODO: figure out a cleaner way to do this, fully understand useCallback
    // because of this https://github.com/facebook/react/issues/8968
    // listeners needs to be added manually
    // breaks:
    // 1. dependencies for the hook since function has to be defined in top-level scope
    // 2. can't use native react event prop like onTouchMove, onTouchStart, onTouchEnd
    if (rootNode) {
      rootNode.addEventListener('touchmove', handleTouchMove);
      rootNode.addEventListener('touchstart', handleEnter);
      rootNode.addEventListener('touchend', handleLeave);
    }
    return () => {
      if (rootNode) {
        rootNode.removeEventListener('touchmove', handleTouchMove);
        rootNode.removeEventListener('touchstart', handleEnter);
        rootNode.removeEventListener('touchend', handleLeave);
      }
    };
  }, [props.isStatic]);

  const renderShadow = () => (
    <div style={{ ...styles.shadow, ...(isOnHover ? styles.shadowOnHover : {}) }} />
  );

  const renderLayers = () => (
    <div style={styles.layers}>
      {props.layers && props.layers.map((imgSrc, idx) => (
        <div
          style={{
            backgroundImage: `url(${imgSrc})`,
            ...styles.renderedLayer,
            ...(layers[idx] ? layers[idx] : {}),
          }}
          key={idx}
        />
      ))}
    </div>
  );

  const renderShine = () => (
    <div style={{ ...styles.shine, ...shine }} />
  );

  if (props.isStatic) {
    return (
      <div
        style={{
          ...styles.root,
          ...(props.style ? props.style : {}),
        }}
        className={props.className || ''}
      >
        <img style={styles.staticFallback} src={props.staticFallback} />
      </div>
    );
  }

  return (
    <div
      style={{
        ...styles.root,
        transform: `perspective(${rootElemRef.current.width * 3}px)`,
        ...(props.style ? props.style : {}),
      }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={props.className || ''}
      ref={rootRef}
    >
      <div style={{ ...styles.container, ...container }}>
        {renderShadow()}
        {renderLayers()}
        {renderShine()}
      </div>
    </div>
  );
}

AtvImage.propTypes = {
  layers: PropTypes.arrayOf(PropTypes.string).isRequired,
  isStatic: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  staticFallback: PropTypes.string,
  style: PropTypes.object
};

AtvImage.defaultProps = {
  staticFallback: '',
  style: {}
};
