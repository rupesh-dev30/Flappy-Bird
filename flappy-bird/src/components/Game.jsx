import React, { useState, useEffect } from 'react';
import Bird from './Bird';
import Pipe from './Pipe';
import DayNight from './DayNight';

const Game = () => {
  const [birdY, setBirdY] = useState(250);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gravity = 0.5;
  const jumpStrength = -10;
  const pipeWidth = 50;
  const pipeGap = 200;

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ') {
        setBirdVelocity(jumpStrength);
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        setBirdVelocity((v) => v + gravity);
        setBirdY((y) => y + birdVelocity);

        setPipes((pipes) => {
          const newPipes = pipes.map((pipe) => ({ ...pipe, x: pipe.x - 5 }));
          if (newPipes.length && newPipes[0].x < -pipeWidth) {
            newPipes.shift();
            setScore((s) => s + 1);
          }
          if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < 400) {
            const topPipeHeight = Math.random() * (300 - pipeGap);
            newPipes.push({ x: 800, height: topPipeHeight, top: true });
            newPipes.push({ x: 800, height: 500 - topPipeHeight - pipeGap, top: false });
          }
          return newPipes;
        });

        pipes.forEach((pipe) => {
          if (
            100 + 30 > pipe.x &&
            100 < pipe.x + pipeWidth &&
            ((pipe.top && birdY < pipe.height) || (!pipe.top && birdY + 30 > 500 - pipe.height))
          ) {
            setGameOver(true);
          }
        });

        if (birdY + 30 > 500 || birdY < 0) {
          setGameOver(true);
        }
      }
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, [birdVelocity, birdY, gameOver, pipes]);

  const handleRestart = () => {
    setBirdY(250);
    setBirdVelocity(0);
    setPipes([]);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div style={{ position: 'relative', width: '800px', height: '500px', border: '1px solid black', overflow: 'hidden' }}>
      <DayNight />
      <Bird birdY={birdY} />
      {pipes.map((pipe, index) => (
        <Pipe key={index} x={pipe.x} height={pipe.height} width={pipeWidth} top={pipe.top} />
      ))}
      {gameOver && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <h1>Game Over</h1>
          <p>Score: {score}</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>Score: {score}</div>
    </div>
  );
};

export default Game;
