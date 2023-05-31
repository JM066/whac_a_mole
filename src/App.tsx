import { useState, useEffect } from "react";
import Game from "./Game/index.tsx";
import Time from "./Time/index.tsx";
import Mole from "./Mole/index.tsx";
import "./App.scss";
const GAMEBOARD_ROWS = [
  [0, 1],
  [2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21],
  [22, 23],
];
function App() {
  const [moles, setMoles] = useState<boolean[]>(Array(24).fill(false));
  const [score, setScore] = useState<number>(0);
  const isStartedState = localStorage.getItem("isStarted");
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
                onClick={() => {
                  console.log("index", index, i);
                  handleClick(active);
                }}
              />
            ))}
          </div>
        ))}
        <button
          className="start"
          onClick={() => {
            localStorage.removeItem("time");
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
