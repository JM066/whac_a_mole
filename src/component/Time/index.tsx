import React from "react";
import getLocalStorage from "@/helpers/getTimer";
import useTimer from "@/hook/useTimer";
import { LOCAL_STORAGE_KEY } from "@/app.type";

interface ITime {
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}
function Time({ setIsStarted }: ITime) {
  const timeState = getLocalStorage(LOCAL_STORAGE_KEY.TIME);
  const { time } = useTimer(
    () => setIsStarted(false),
    timeState ? Number(timeState) : 60000
  );

  return <>{time}</>;
}

export default Time;
