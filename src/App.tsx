import { useState, useEffect } from "react"
import * as Popover from "@radix-ui/react-popover"
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons"

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
  const status = getLocalStorage(LOCAL_STORAGE_KEY.IS_STARTED)
  const [isStarted, setIsStarted] = useState<boolean>(status != null ? JSON.parse(status) : false)

  // const handleClick = (index: number) => {
  //   dispatch({ type: "hit", index })
  // }
  const handleStart = () => {
    setIsStarted((prev) => !prev)
    // removeLocalStorage(LOCAL_STORAGE_KEY.TIME);
    // setLocalStorage(LOCAL_STORAGE_KEY.IS_STARTED, JSON.stringify(true));
    // setIsStarted(true)
  }

  const addScore = () => {}
  return (
    <div className="App">
      HI
      <div className="header">{/* <Typography>Score: {state.score}</Typography> */}</div>
      <Button className="start" onClick={handleStart}>
        {isStarted ? "Stop" : "Start"}
      </Button>
      <Game isStarted={isStarted} addScore={addScore} />
      <Popover.Root>
        <Popover.Trigger>
          <Button className="w-full bg-red-500" aria-label="Update dimensions">
            <MixerHorizontalIcon />
          </Button>
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content className="PopoverContent" sideOffset={5}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p className="Text" style={{ marginBottom: 10 }}>
                Game Setting
              </p>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="time">
                  Time
                </label>
                <input className="Input" id="width" defaultValue="temp" />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="speed">
                  Speed
                </label>
                <input className="Input" id="maxWidth" defaultValue="temp" />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="height">
                  Difficulty
                </label>
                <input className="Input" id="difficulty" defaultValue="temp" />
              </fieldset>
            </div>
            <Popover.Close className="PopoverClose" aria-label="Close">
              <Cross2Icon />
            </Popover.Close>
            <Popover.Arrow className="PopoverArrow" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      {/* <Time stop={stop} /> */}
    </div>
  )
}

export default App
