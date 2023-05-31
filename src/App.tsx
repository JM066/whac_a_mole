import { useState } from "react";
import { LOCAL_STORAGE_KEY, GAMEBOARD_ROWS } from "./const.ts";
import Game from "./Game/index.tsx";
import Time from "./Time/index.tsx";
import Mole from "./Mole/index.tsx";
import "./App.scss";

function App() {
  const [moles, setMoles] = useState<boolean[]>(Array(24).fill(false));
  const [score, setScore] = useState<number>(0);
  const isStartedState = localStorage.getItem(LOCAL_STORAGE_KEY.IS_STARTED);
  const [isStarted, setIsStarted] = useState<boolean>(
    isStartedState ? JSON.parse(isStartedState) : false
  );

  function handleClick(index: number) {
    if (moles[index]) {
      setScore((prev) => prev + 1);
      setMoles((prev) => {
        const prevMolesState = [...prev];
        prevMolesState[index] = false;
        return prevMolesState;
      });
    }
  }

  return (
    <div className="App">
      <div className="header">
        <p>Score: {score}</p>
        Time: {isStarted ? <Time setIsStarted={setIsStarted} /> : <p>0</p>}
      </div>
      <div>
        {GAMEBOARD_ROWS.map((row, index) => (
          <div key={index} className="row">
            {row.map((active, i) => (
              <Mole
                key={i}
                active={moles[active]}
                onClick={() => handleClick(active)}
              />
            ))}
          </div>
        ))}
        <button
          className="start"
          onClick={() => {
            localStorage.removeItem(LOCAL_STORAGE_KEY.TIME);
            localStorage.setItem(
              LOCAL_STORAGE_KEY.IS_STARTED,
              JSON.stringify(true)
            );
            setIsStarted(true);
          }}
        >
          {isStarted && <Game moles={moles} setMoles={setMoles} />}
          Start
        </button>
      </div>
    </div>
  );
}

export default App;
