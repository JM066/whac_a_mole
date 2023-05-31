import React from "react";
import { LOCAL_STORAGE_KEY } from "../const.ts";
import useTimer from "../useTimer.ts";

interface ITime {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}
function Time({ setIsStarted }: ITime) {
  const timeState = localStorage.getItem(LOCAL_STORAGE_KEY.TIME);
  const { time } = useTimer(
    () => setIsStarted(false),
    timeState ? Number(timeState) : 60000
  );

  return <p>{time}</p>;
}

export default Time;
