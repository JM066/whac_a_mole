import React, { useEffect } from "react";

interface IGame {
  moles: boolean[];
  setMoles: React.Dispatch<React.SetStateAction<boolean[]>>;

  onclick?: () => void;
}
function Game({ moles, setMoles }: IGame) {
  useEffect(() => {
    const intervalId = setInterval(generateAndUpdateRandomMole, 1000);
    return () => clearInterval(intervalId);
  }, [moles]);

  function generateAndUpdateRandomMole() {
    const activeMoles = moles.filter((mole) => mole).length;
    if (activeMoles >= 5) return;
    const index = Math.floor(Math.random() * moles.length);
    updateMolesState(index, true);

    setTimeout(() => {
      updateMolesState(index, false);
    }, 1000 * Math.random() * 2 + 1);
  }
  const updateMolesState = (index: number, state: boolean) => {
    setMoles((prev) => {
      const prevMolesState = [...prev];
      prevMolesState[index] = state;
      return prevMolesState;
    });
  };

  return null;
}

export default Game;
