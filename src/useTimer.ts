import { useState, useEffect } from "react";

export default function useTimer(stop: () => void, delay: number) {
  const [time, setTime] = useState<number>(delay / 1000);

  useEffect(() => {
    const interval = setInterval(handleTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTimer = () => {
    setTime((prev) => Math.max(prev - 1, 0));
  };
  useEffect(() => {
    if (time === 0) {
      stop();
    }
    localStorage.setItem("time", JSON.stringify(time * 1000));
  }, [time]);

  return { time };
}
