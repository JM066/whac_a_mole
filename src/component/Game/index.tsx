import { useEffect, useCallback, useState } from "react"

import Mole from "@/component/Mole"
import Score from "@/component/Score"
import Time from "@/component/Time"
import Button from "@/component/Button"
import { Key } from "@/app.type"

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

function Game({ timer = 30, speed = 1000 }) {
  // const playing = localStorage.getItem(Key.Playing)
  const [isStarted, setIsStarted] = useState<boolean>(false)
  // const [time, setTime] = useState<number>(0)
  const scoreState = localStorage.getItem(Key.Score)
  const [status, setStatus] = useState<Status>({
    score: Number(scoreState) || 0,
    moles: Array(29).fill(false),
  })

  const toggleStart = () => {
    setIsStarted((prev) => !prev)
  }

  // const stop = () => {
  //   setIsStarted(false)
  // }

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

  const deactivateMoles = useCallback(
    (index: number) => {
      console.log("index", index)
      if (!isStarted) return
      return function () {
        setStatus((prev) => {
          const newMoles = [...prev.moles]
          let newScore = prev.score
          if (newMoles[index]) {
            newMoles[index] = false
            newScore
          }
          return { moles: newMoles, score: newScore }
        })
      }
    },
    [status]
  )
  //Todo: Cancel timer when the time is up

  useEffect(() => {
    let interval: NodeJS.Timer

    if (isStarted) {
      interval = setInterval(activateMoles, speed)
    }
    return () => clearInterval(interval)
  }, [isStarted, activateMoles, speed])

  // const reset = () => {
  //   setStatus({
  //     score: 0,
  //     moles: Array(29).fill(false),
  //   })
  // }
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
      <Time isStarted={isStarted} stop={stop} time={timer} />
      <Button className="start" onClick={toggleStart}>
        {isStarted ? "Stop" : "Start"}
      </Button>
      {GAMEBOARD_ROWS.map((row, idx) => (
        <div key={`row-${idx}`} className="row">
          {row.map((col) => (
            <Mole
              key={`col-${col}`}
              mole={status.moles[col]}
              updateStatus={updateStatus(col)}
              deactivateMoles={deactivateMoles(col)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Game
