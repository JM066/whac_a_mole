import { useState, useEffect } from "react";
import Game from "./Game/index.tsx";
import Time from "./Time.tsx";
import "./App.scss";
interface IMole {
  active: boolean;
  onclick: () => void;
}
function Mole({ active, onclick }: IMole) {
  return (
    <div className={`mole ${active ? "active" : ""} `} onClick={onclick}>
      Mole
    </div>
  );
}

function App() {
  const [moles, setMoles] = useState<boolean[]>(Array(24).fill(false));
  const [score, setScore] = useState<number>(0);
  const isStartedState = localStorage.getItem("isStarted");
  const [isStarted, setIsStarted] = useState<boolean>(
    isStartedState ? JSON.parse(isStartedState) : false
  );

  useEffect(() => {
    localStorage.setItem("isStarted", JSON.stringify(isStarted));
  }, [isStarted]);

  function handleClick(index: number, i: number) {
    const molesIndex =
      molesRows.slice(0, index).reduce((total, row) => total + row.length, 0) +
      i;
    if (moles[molesIndex]) {
      setScore((prev) => prev + 1);
      setMoles((prev) => {
        const prevMolesState = [...prev];
        prevMolesState[molesIndex] = false;
        return prevMolesState;
      });
    }
  }

  const molesRows = [
    [moles[0], moles[1]],
    [moles[2], moles[3], moles[4], moles[5]],
    [moles[6], moles[7], moles[8], moles[9], moles[10], moles[11]],
    [moles[12], moles[13], moles[14], moles[15], moles[16], moles[17]],
    [moles[18], moles[19], moles[20], moles[21]],
    [moles[22], moles[23]],
  ];
  return (
    <div className="App">
      <div className="header">
        <p>Score: {score}</p>
        Time: {isStarted ? <Time setIsStarted={setIsStarted} /> : <p>0</p>}
      </div>
      <div>
        {molesRows.map((molesRow, index) => (
          <div key={index} className={`row row-${index + 1}`}>
            {molesRow.map((active, i) => (
              <Mole
                key={i}
                active={active}
                onclick={() => handleClick(index, i)}
              />
            ))}
          </div>
        ))}
        <div
          onClick={() => {
            localStorage.removeItem("time");
            setIsStarted(true);
          }}
        >
          {isStarted && <Game moles={moles} setMoles={setMoles} />}
          Start
        </div>
      </div>
    </div>
  );
}

export default App;
