import { useEffect, useCallback, useState, useRef } from "react"

import Mole from "@/component/Mole"
import Score from "@/component/Score"
import Time from "@/component/Time"
import Button from "@/component/Button"

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

function Game({ timer = 20, speed = 1500 }) {
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const [status, setStatus] = useState<Status>({
    score: 0,
    moles: Array(29).fill(false),
  })
  const interval = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (isStarted) {
      reset()
      interval.current = setInterval(popUp, speed)
    } else {
      if (interval.current) {
        clearInterval(interval.current)
        interval.current = undefined
      }
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current)
      }
    }
  }, [isStarted, speed])

  const toggleStart = () => setIsStarted((prev) => !prev)

  const stop = () => setIsStarted(false)

  const reset = () => {
    setStatus({
      score: 0,
      moles: Array(29).fill(false),
    })
  }

  const popUp = () => {
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
  }

  const hide = useCallback((index: number) => {
    return function () {
      setStatus((prev) => {
        const newMoles = [...prev.moles]
        if (newMoles[index]) {
          newMoles[index] = false
          return { ...prev, moles: newMoles }
        }
        return prev
      })
    }
  }, [])

  const whack = (index: number) => {
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
      <Time isStarted={isStarted} stop={stop} initialTime={timer} />
      <Button className="start" onClick={toggleStart}>
        {isStarted ? "Stop" : "Start"}
      </Button>
      {GAMEBOARD_ROWS.map((row, idx) => (
        <div key={`row-${idx}`} className="row">
          {row.map((col) => (
            <Mole
              key={`col-${col}`}
              mole={status.moles[col]}
              speed={speed}
              whack={whack(col)}
              hide={hide(col)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Game
