import { useEffect, useCallback, useState } from "react"
import Mole from "@/component/Mole"
import Score from "@/component/Score"
import Time from "@/component/Time"
import Button from "@/component/Button"
import { Key } from "@/app.type"
const SPEED = 1000
const GAMEBOARD_ROWS = [
  [0, 1],
  [2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22],
  [23, 24, 25, 26],
  [27, 28],
]
type Status = {
  score: number
  moles: boolean[]
}

function Game() {
  const playing = localStorage.getItem(Key.Playing)
  const [isStarted, setIsStarted] = useState<boolean>(playing != null ? JSON.parse(playing) : false)
  const scoreState = localStorage.getItem(Key.Score)
  const [status, setStatus] = useState<Status>({
    score: Number(scoreState) || 0,
    moles: Array(29).fill(false),
  })
  useEffect(() => {
    localStorage.setItem(Key.Playing, isStarted.toString())
  }, [isStarted])

  useEffect(() => {
    localStorage.setItem(Key.Score, status.score.toString())
  }, [status.score])

  useEffect(() => {
    if (isStarted) {
      reset()
      localStorage.removeItem(Key.Score)
    }
  }, [isStarted])

  const start = () => {
    setIsStarted((prev) => !prev)
  }

  const stop = () => {
    setIsStarted(false)
  }

  const activateMoles = useCallback(() => {
    setStatus((prev) => {
      if (prev.moles.filter((m) => m).length >= 5) return prev
      let index: number
      do {
        index = Math.floor(Math.random() * prev.moles.length)
      } while (prev.moles[index])
      const newMoles = [...prev.moles]
      newMoles[index] = true

      return { ...prev, moles: newMoles }
    })
  }, [status])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (isStarted) {
      interval = setInterval(activateMoles, SPEED)
    }
    return () => clearInterval(interval)
  }, [isStarted, activateMoles, SPEED])

  const reset = () => {
    setStatus({
      score: 0,
      moles: Array(29).fill(false),
    })
  }
  const updateStatus = (index: number) => {
    if (!isStarted) return
    return function () {
      setStatus((prev) => {
        const newMoles = [...prev.moles]
        let newScore = prev.score
        if (newMoles[index]) {
          newMoles[index] = false
          newScore += 1
        }
        return { moles: newMoles, score: newScore }
      })
    }
  }

  return (
    <div>
      <Score score={status.score} />
      <Time isStarted={isStarted} stop={stop} />
      <Button className="start" onClick={start}>
        {isStarted ? "Stop" : "Start"}
      </Button>
      {GAMEBOARD_ROWS.map((row, idx) => (
        <div key={`row-${idx}`} className="row">
          {row.map((col) => (
            <Mole key={`col-${col}`} mole={status.moles[col]} updateStatus={updateStatus(col)} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Game
