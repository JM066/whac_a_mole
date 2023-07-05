export type StateType = { score: number; moles: boolean[] };
export type ActionType =
  | { type: "deactive"; index: number }
  | { type: "activate"; index: number };

export default function reducer(
  state: StateType,
  action: ActionType
): StateType {
  let newMoles;
  switch (action.type) {
    case "deactive":
      if (state.moles[action.index]) {
        newMoles = [...state.moles];
        newMoles[action.index] = false;
        return { score: state.score + 1, moles: newMoles };
      }
      return state;
    case "activate":
      newMoles = [...state.moles];
      newMoles[action.index] = true;
      return { ...state, moles: newMoles };
    default:
      throw new Error("Unexpected action");
  }
}
