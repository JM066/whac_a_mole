import { useState, useEffect } from "react"
import { Key } from "@/app.type"

export default function useTimer(isStarted: boolean, duration: number, stop: () => void) {
  const timeState = localStorage.getItem(Key.Time)
  const [time, setTime] = useState<number>(Number(timeState) || duration)

  useEffect(() => {
    if (!isStarted) return
    setTime(Number(localStorage.getItem(Key.Time)) || duration)
    const interval = setInterval(startCountdown, 1000)
    return () => clearInterval(interval)
  }, [isStarted])

  useEffect(() => {
    if (time <= 0) {
      stop()
    }
    localStorage.setItem(Key.Time, time.toString())
  }, [time, stop])

  const startCountdown = () => {
    setTime((prev) => Math.max(prev - 1, 0))
  }
  return { time }
}
