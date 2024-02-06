import { useState, useEffect } from "react"

export default function useTimer(
  isStarted: boolean,
  time: number,
  stop: () => void,
  interval: number = 1000
) {
  const [timeStamp, setTimeStamp] = useState<number>(time)

  useEffect(() => {
    let timer: NodeJS.Timer
    if (!isStarted) {
      setTimeStamp(0)
    } else {
      setTimeStamp(10)
      timer = setInterval(startCountdown, interval)
    }
    return () => clearInterval(timer)
  }, [isStarted])

  useEffect(() => {
    if (timeStamp <= 0) {
      stop()
      console.log("stopped?")
    }
  }, [timeStamp, stop])

  const startCountdown = () => {
    setTimeStamp((prev) => Math.max(prev - 1, 0))
  }
  return { timeStamp }
}
