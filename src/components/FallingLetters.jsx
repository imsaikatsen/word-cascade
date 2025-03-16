import React, { useEffect, useState } from 'react';

const FallingLetter = ({ letter, onRemove }) => {
  const [positionX, setPositionX] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(5);

  useEffect(() => {
    setPositionX(Math.random() * window.innerWidth);
    setAnimationDuration(Math.random() * 3 + 3);
  }, []);

  return (
    <div
      className="absolute text-white text-4xl font-bold shadow-lg animate-fall cursor-pointer hover:scale-125 transition-transform duration-200"
      style={{
        left: `${positionX}px`,
        animationDuration: `${animationDuration}s`,
      }}
      onClick={() => onRemove(letter)}
    >
      {letter}
    </div>
  );
};

export default FallingLetter;
