import { useState, useEffect } from "react"
import getLocalStorage, { setLocalStorage } from "@/helpers/getTimer"
import { LOCAL_STORAGE_KEY } from "@/app.type"

export default function useTimer(stop: () => void, duration: number) {
  const timeState = getLocalStorage(LOCAL_STORAGE_KEY.TIME)
  const [remainingTime, setRemainingTime] = useState<number>(Number(timeState) || duration)

  useEffect(() => {
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (remainingTime === 0) {
      stop()
    }
    setLocalStorage(LOCAL_STORAGE_KEY.TIME, JSON.stringify(time))
  }, [remainingTime, stop])

  const updateTime = () => {
    setRemainingTime((prev) => Math.max(prev - 1, 0))
  }
  return { remainingTime }
}
