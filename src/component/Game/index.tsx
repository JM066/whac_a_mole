import { useEffect, useCallback, useState } from "react"
import Mole from "@/component/Mole"

const GAMEBOARD_ROWS = [
  [0, 1],
  [2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22],
  [23, 24, 25, 26],
  [27, 28],
]
interface Props {
  isStarted: boolean
  addScore: () => void
  speed?: number
}
function Game({ isStarted, speed = 1000, addScore }: Props) {
  const [moles, setMoles] = useState<boolean[]>(Array(29).fill(false))

  const activateMoles = useCallback(() => {
    const activeMoles = moles.filter((mole) => mole).length
    if (activeMoles > 5) return
    const index = Math.floor(Math.random() * moles.length)
    setMoles((prev) => {
      const arr = [...prev]
      arr[index] = true
      return arr
    })
  }, [moles])

  useEffect(() => {
    if (!isStarted) return
    const interval = setInterval(activateMoles, speed)
    return () => clearInterval(interval)
  }, [isStarted, activateMoles, speed])

  const updateStatus = (index: number) => {
    return function innerUpdateStatus() {
      console.log("hit", index)
      setMoles((prev) => {
        const arr = [...prev]
        arr[index] = false
        return arr
      })
    }
  }

  return (
    <div>
      {GAMEBOARD_ROWS.map((row, idx) => (
        <div key={`row-${idx}`} className="row">
          {row.map((col) => (
            <Mole
              key={`col-${col}`}
              status={moles[col]}
              updateStatus={updateStatus(col)}
              activeMole={col}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Game
