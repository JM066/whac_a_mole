import React, { useEffect, useCallback } from "react";
import { ActionType, StateType } from "@/reducer";

interface IGame {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}
function Game({ state, dispatch }: IGame) {
  const generateAndUpdateRandomMole = useCallback(() => {
    const activeMoles = state.moles.filter((mole) => mole).length;
    if (activeMoles >= 5) return;
    const index = Math.floor(Math.random() * state.moles.length);
    dispatch({ type: "activate", index });

    setTimeout(() => {
      dispatch({ type: "activate", index });
    }, 1000 * Math.random() * 2 + 1);
  }, [state, dispatch]);

  useEffect(() => {
    const interval = setInterval(generateAndUpdateRandomMole, 1000);
    return () => clearInterval(interval);
  }, [generateAndUpdateRandomMole]);

  return null;
}

export default Game;
