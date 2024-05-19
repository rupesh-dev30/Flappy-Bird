import React, { useState, useEffect } from 'react';

const DayNight = () => {
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDay((prev) => !prev);
    }, 60000); // Switch between day and night every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className={`game-container ${isDay ? 'day' : 'night'}`}>
        <div className="mountains"></div>
        <div className="sun" style={{ top: isDay ? '50px' : '400px' }}></div>
      </div>
    </div>
  );
};

export default DayNight;
