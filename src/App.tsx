import { useState, useReducer } from "react"
// import reducer from "@/reducer"
import getLocalStorage, { removeLocalStorage, setLocalStorage } from "@/helpers/getTimer.ts"
import Game from "@/component/Game"
import Time from "@/component/Time"
// import Mole from "@/component/Mole"
import Button from "@/component/Button"
import Typography from "@/component/Typography"
import { LOCAL_STORAGE_KEY } from "./app.type.ts"
import "./App.scss"

function App() {
  // const [state, dispatch] = useReducer(reducer, {
  //   score: 0,
  //   moles: Array(24).fill(false),
  // })

  const status = getLocalStorage(LOCAL_STORAGE_KEY.IS_STARTED)
  const [isStarted, setIsStarted] = useState<boolean>(status ? JSON.parse(status) : false)

  // const handleClick = (index: number) => {
  //   dispatch({ type: "hit", index })
  // }
  const handleStart = () => {
    setIsStarted((prev) => !prev)
    // removeLocalStorage(LOCAL_STORAGE_KEY.TIME);
    // setLocalStorage(LOCAL_STORAGE_KEY.IS_STARTED, JSON.stringify(true));
    // setIsStarted(true)
  }
  const stop = () => {
    setIsStarted(false)
  }
  return (
    <div className="App">
      <div className="header">{/* <Typography>Score: {state.score}</Typography> */}</div>
      <div>
        {/* <Game status={status} isStarted={isStarted} /> */}
        <Time stop={stop} />
        <Button className="start" onClick={handleStart}>
          {isStarted ? "Stop" : "Start"}
        </Button>
      </div>
    </div>
  )
}

export default App
