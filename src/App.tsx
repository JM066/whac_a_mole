import { useState, useEffect } from "react"
import * as Popover from "@radix-ui/react-popover"
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons"
import Game from "@/component/Game"
import Time from "@/component/Time"
import Button from "@/component/Button"
import { Key } from "./app.type.ts"
import "./App.scss"

function App() {
  const status = localStorage.getItem(Key.IsStarted)
  const [isStarted, setIsStarted] = useState<boolean>(status != null ? JSON.parse(status) : false)

  useEffect(() => {
    localStorage.setItem(Key.IsStarted, isStarted.toString())
  }, [isStarted])

  const start = () => {
    setIsStarted((prev) => !prev)
  }

  const stop = () => {
    setIsStarted(false)
  }
  const addScore = () => {}
  return (
    <div className="App">
      <Time isStarted={isStarted} stop={stop} />
      <Button className="start" onClick={start}>
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
    </div>
  )
}

export default App
