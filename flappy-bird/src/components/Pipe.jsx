import React from 'react';

const Pipe = ({ x, height, width, top }) => {
  const pipeStyle = {
    position: 'absolute',
    width: width + 'px',
    height: height + 'px',
    backgroundColor: 'green',
    left: x + 'px',
    top: top ? '0' : 'auto',
    bottom: top ? 'auto' : '0',
  };

  return <div style={pipeStyle}></div>;
};

export default Pipe;
