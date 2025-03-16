import React, { useEffect, useState } from 'react';

const Letter = ({ letter, left, speed, onClick }) => {
  const [top, setTop] = useState(-50);

  useEffect(() => {
    const interval = setInterval(() => {
      setTop((prevTop) => prevTop + speed);
    }, 50);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div
      className="falling-letter"
      style={{ top: `${top}px`, left: `${left}%` }}
      onClick={onClick}
    >
      {letter}
    </div>
  );
};

export default Letter;
