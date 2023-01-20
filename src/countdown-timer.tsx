import { useState, useRef, useEffect } from "react";

const formatDate = (dateObject) => {
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();
  const paddedSeconds = seconds.toString().padStart(2, "0");
  return `${minutes}:${paddedSeconds}`;
};

export default function CountdownTimer() {
  const fiveMinutes = new Date(0, 0, 0, 0, 5);
  const [timeRemaining, setTimeRemaining] = useState(fiveMinutes);
  const intervalId = useRef<number | null>(null);

  const handleClickStart = () => {
    intervalId.current = window.setInterval(() => {
      setTimeRemaining(
        (prevTimeRemaining) => new Date(prevTimeRemaining.getTime() - 1000)
      );
    }, 1000);
  };

  const handleClickStop = () => {
    // If the timer is already stopped, do nothing
    if (intervalId.current === null) {
      return;
    }

    clearInterval(intervalId.current);
    intervalId.current = null;
  };

  const handleReset = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
    }
    setTimeRemaining(fiveMinutes);
  };

  useEffect(() => {
    return () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{formatDate(timeRemaining)}</h1>
      <div>
        <button onClick={handleClickStart}>Start</button>
        <button onClick={handleClickStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
