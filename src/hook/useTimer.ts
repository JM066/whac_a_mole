import { useState, useEffect } from "react";
import { setLocalStorage } from "@/helpers/getTimer";
import { LOCAL_STORAGE_KEY } from "@/app.type";

export default function useTimer(stop: () => void, delay: number) {
  const [time, setTime] = useState<number>(delay / 1000);

  useEffect(() => {
    const interval = setInterval(handleTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time === 0) {
      stop();
    }
    setLocalStorage(LOCAL_STORAGE_KEY.TIME, JSON.stringify(time * 1000));
  }, [time, stop]);

  const handleTimer = () => {
    setTime((prev) => Math.max(prev - 1, 0));
  };
  return { time };
}
