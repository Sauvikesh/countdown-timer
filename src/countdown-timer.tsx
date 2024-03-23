import { useState, useEffect } from 'react';

// function that formats our time
const formatDate = (dateObject: Date) => {
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();

  // formatting to make it look nicer visually, taken from solution
  const paddedSeconds = seconds.toString().padStart(2, '0');
  return `${minutes}:${paddedSeconds}`;
};

export default function CountdownTimer() {
  const fiveMinutes = new Date(0, 0, 0, 0, 5);
  const [timeRemaining, setTimeRemaining] = useState(fiveMinutes);
  const [isCountingDown, setIsCountingDown] = useState(false);

  const countdown = () => {
    setTimeRemaining((timeRemaining) => new Date(timeRemaining.getTime() - 1000));
    };

  useEffect(() => {

    // have a useState variable to start and stop the timer
    if (isCountingDown) {
        const intervalId = setInterval(() => {
            countdown();
        }, 1000);
        return () => clearInterval(intervalId);
    }
  }, [isCountingDown]);


  return (
    <div>
      <h1>{formatDate(timeRemaining)}</h1>
      <div>
        <button onClick= {() => {setIsCountingDown(true)}}>Start</button>
        <button onClick= {() => {setIsCountingDown(false)}}>Stop</button>
        <button onClick= {() => {setTimeRemaining(new Date(0, 0, 0, 0, 5))}}>Reset</button>
      </div>
    </div>
  );
}