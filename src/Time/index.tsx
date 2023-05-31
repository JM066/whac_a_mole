import React from "react";
import useTimer from "../useTimer.ts";

interface ITime {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}
function Time({ setIsStarted }: ITime) {
  const timeState = localStorage.getItem("time");
  const { time } = useTimer(
    () => setIsStarted(false),
    timeState ? Number(timeState) : 60000
  );

  return <p>{time}</p>;
}

export default Time;
