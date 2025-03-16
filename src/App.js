import React, { useState, useEffect } from 'react';
import Letter from './Letter';

const TARGET_SCORE = 100;
const BASE_SPEED = 2;
const SPEED_INCREMENT = 0.2; // Gradual speed increase
const WORDS_DICTIONARY = [
  'CAT',
  'DOG',
  'APPLE',
  'PHONE',
  'LAPTOP',
  'TABLE',
  'MOUSE',
];
const GAME_TIME_LIMIT = 5 * 60; // 5 minutes in seconds

const getRandomLetter = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[Math.floor(Math.random() * letters.length)];
};

const App = () => {
  const [score, setScore] = useState(0);
  const [letters, setLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState('');
  const [fallSpeed, setFallSpeed] = useState(BASE_SPEED);
  const [invalidWord, setInvalidWord] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME_LIMIT);
  const [gameOver, setGameOver] = useState(false);

  // **Countdown Timer (Game Over at 0:00)**
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setGameOver(true);
    }
  }, [timeLeft]);

  // **Unlimited Falling Letters**
  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setLetters((prevLetters) => [
          ...prevLetters,
          {
            id: Date.now(),
            letter: getRandomLetter(),
            left: Math.random() * 80 + 10,
            speed: fallSpeed,
            bottom: 0,
          },
        ]);
      }, 500); // Faster letter generation
      return () => clearInterval(interval);
    }
  }, [gameOver, fallSpeed]);

  // **Gradually Increase Falling Speed**
  useEffect(() => {
    const speedUp = setInterval(() => {
      setFallSpeed((prevSpeed) => prevSpeed + SPEED_INCREMENT);
    }, 6000); // Every 6 seconds, speed increases
    return () => clearInterval(speedUp);
  }, []);

  // **Handle Letter Click (Word Formation)**
  const handleLetterClick = (id, letter) => {
    setSelectedLetters((prev) => prev + letter);
    setLetters((prevLetters) => prevLetters.filter((l) => l.id !== id));

    const newWord = selectedLetters + letter;
    if (WORDS_DICTIONARY.includes(newWord)) {
      setScore(score + newWord.length * 10);
      setSelectedLetters('');
      setInvalidWord(false);
    } else if (newWord.length > 6) {
      setInvalidWord(true);
      setSelectedLetters(''); // Reset input if too long
    }
  };

  // **Restart Game**
  const restartGame = () => {
    setScore(0);
    setLetters([]);
    setSelectedLetters('');
    setFallSpeed(BASE_SPEED);
    setInvalidWord(false);
    setTimeLeft(GAME_TIME_LIMIT);
    setGameOver(false);
  };

  // **Format Timer (MM:SS)**
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="game-container">
      <h1>
        Score: {score} / {TARGET_SCORE}
      </h1>
      <h2>Time Left: {formatTime(timeLeft)}</h2>
      <h2>Forming: {selectedLetters}</h2>
      {invalidWord && (
        <div className="warning">❌ Invalid word, try again!</div>
      )}

      {letters.map((letter) => (
        <Letter
          key={letter.id}
          letter={letter.letter}
          left={letter.left}
          speed={letter.speed}
          onClick={() => handleLetterClick(letter.id, letter.letter)}
        />
      ))}

      {gameOver && (
        <div className="game-over">
          <h2>⏳ Time's Up! Game Over! ⏳</h2>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default App;
