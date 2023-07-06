import { useState, useReducer } from "react";
import reducer from "@/reducer";
import getLocalStorage, {
  removeLocalStorage,
  setLocalStorage,
} from "@/helpers/getTimer.ts";
import Game from "@/component/Game";
import Time from "@/component/Time";
import Mole from "@/component/Mole";
import Button from "@/component/Button";
import Typography from "@/component/Typography";
import { LOCAL_STORAGE_KEY, GAMEBOARD_ROWS } from "./app.type.ts";
import "./App.scss";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    score: 0,
    moles: Array(24).fill(false),
  });
  const isStartedState = getLocalStorage(LOCAL_STORAGE_KEY.IS_STARTED);
  const [isStarted, setIsStarted] = useState<boolean>(
    isStartedState ? JSON.parse(isStartedState) : false
  );

  const handleClick = (index: number) => {
    dispatch({ type: "hit", index });
  };
  const handleStart = () => {
    removeLocalStorage(LOCAL_STORAGE_KEY.TIME);
    setLocalStorage(LOCAL_STORAGE_KEY.IS_STARTED, JSON.stringify(true));
    setIsStarted(true);
  };

  return (
    <div className="App">
      <div className="header">
        <Typography>Score: {state.score}</Typography>
        <Typography>
          Time:
          {isStarted ? <Time setIsStarted={setIsStarted} /> : 0}
        </Typography>
      </div>
      <div>
        {GAMEBOARD_ROWS.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="row">
            {row.map((active, activeIndex) => (
              <Mole
                key={`mole-${activeIndex}`}
                active={state.moles[active]}
                onClick={handleClick}
                activeValue={active}
              />
            ))}
          </div>
        ))}
        <Button className="start" onClick={handleStart}>
          {isStarted && <Game state={state} dispatch={dispatch} />}
          Start
        </Button>
      </div>
    </div>
  );
}

export default App;
