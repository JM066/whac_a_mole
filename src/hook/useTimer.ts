import { useState, useEffect, useRef } from "react"

export default function useTimer(
  isStarted: boolean,
  initialTime: number,
  stop: () => void,
  interval: number = 1000
) {
  const [time, setTime] = useState<number>(initialTime)
  const timer = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = undefined
    }
    if (isStarted) {
      setTime(initialTime)
      timer.current = setInterval(startCountdown, interval)
    } else {
      setTime(0)
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current)
      }
    }
  }, [isStarted, initialTime, interval])

  useEffect(() => {
    if (time <= 0) {
      clearInterval(timer.current)
      timer.current = undefined
      stop()
    }
  }, [time])

  const startCountdown = () => {
    setTime((prev) => Math.max(prev - interval / 1000, 0))
  }

  return { time }
}
