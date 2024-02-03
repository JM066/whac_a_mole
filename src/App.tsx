import Game from "@/component/Game"

import "./App.scss"

function App() {
  return (
    <div className="App">
      <Game />
      {/* <Popover.Root>
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
      </Popover.Root> */}
    </div>
  )
}

export default App
