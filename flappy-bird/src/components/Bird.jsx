import React from 'react';

const Bird = ({ birdY }) => {
  const birdStyle = {
    position: 'absolute',
    width: '30px',
    height: '30px',
    backgroundColor: 'black',
    borderRadius: '50%',
    top: birdY + 'px',
    left: '100px',
  };

  return <div style={birdStyle}></div>;
};

export default Bird;
