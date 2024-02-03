import { useEffect, useCallback, useState } from "react"
import Mole from "@/component/Mole"
import Score from "@/component/Score"
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
interface Props {
  isStarted: boolean
  speed?: number
}
function Game({ isStarted, speed = 1000 }: Props) {
  const scoreState = localStorage.getItem(Key.Score)
  const [status, setStatus] = useState<Status>({
    score: Number(scoreState) || 0,
    moles: Array(29).fill(false),
  })
  useEffect(() => {
    localStorage.setItem(Key.Score, status.score.toString())
  }, [status.score])

  useEffect(() => {
    if (isStarted) {
      reset()
      localStorage.removeItem(Key.Score)
    }
  }, [isStarted])

  const activateMoles = useCallback(() => {
    setStatus((prev) => {
      if (prev.moles.filter((m) => m).length >= 5) return prev
      let index
      do {
        index = Math.floor(Math.random() * prev.moles.length)
      } while (prev.moles[index])
      const newMoles = [...prev.moles]
      newMoles[index] = true
      return { ...prev, moles: newMoles }
    })
    //Todo: Deactivate each mole after a certan time
  }, [status])

  useEffect(() => {
    let interval: number | NodeJS.Timeout
    if (isStarted) {
      interval = setInterval(activateMoles, speed)
    }
    return () => clearInterval(interval)
  }, [isStarted, activateMoles, speed])

  const reset = () => {
    setStatus({
      score: 0,
      moles: Array(29).fill(false),
    })
  }
  const updateStatus = (index: number) => {
    if (!isStarted) return

    return function innerUpdateStatus() {
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
