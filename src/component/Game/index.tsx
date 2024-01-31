import React, { useEffect, useCallback, useReducer } from "react"
import { ActionType, StateType } from "@/reducer"
import Mole from "@/component/Mole"
import reducer from "@/reducer"

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
  state: StateType
  isStarted: boolean
  dispatch: React.Dispatch<ActionType>
}
function Game({ state, dispatch, isStarted }: Props) {
  const [state, dispatch] = useReducer(reducer, {
    score: 0,
    moles: Array(24).fill(false),
  })
  const generateAndUpdateRandomMole = useCallback(() => {
    const activeMoles = state.moles.filter((mole) => mole).length
    if (activeMoles >= 5) return
    const index = Math.floor(Math.random() * state.moles.length)
    dispatch({ type: "activate", index: index })

    setTimeout(() => {
      dispatch({ type: "deactivate", index: index })
    }, 1000 * Math.random() * 2 + 1)
  }, [state, dispatch])

  useEffect(() => {
    const interval = setInterval(generateAndUpdateRandomMole, 1000)
    return () => clearInterval(interval)
  }, [generateAndUpdateRandomMole])

  const hitMole = (index: number) => {
    dispatch({ type: "hit", index })
  }
  return (
    <div>
      {GAMEBOARD_ROWS.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="row">
          {row.map((active, activeIndex) => (
            <Mole
              key={`mole-${activeIndex}`}
              active={state.moles[active]}
              onClick={hitMole}
              activeValue={active}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Game
