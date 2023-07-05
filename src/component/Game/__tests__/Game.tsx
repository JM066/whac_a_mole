import { render } from "@testing-library/react";
import Game from "../index";

jest.useFakeTimers();
jest.spyOn(global, "setInterval");

describe("<Game />", () => {
  let setMoles: jest.Mock;
  const moles = Array(24).fill(false);
  beforeEach(() => {
    setMoles = jest.fn();
    render(<Game moles={moles} setMoles={setMoles} />);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("calls generateAndUpdateRandomMole every second", () => {
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);

    jest.runOnlyPendingTimers();
    expect(setMoles).toHaveBeenCalledTimes(1);
  });

  it("calls updateMolesState and it updates the moles state", () => {
    jest.runOnlyPendingTimers();
    expect(setMoles).toHaveBeenCalledTimes(1);
    expect(setMoles).toHaveBeenCalledWith(expect.any(Function));
    //get the current state
    const updateMolesState = setMoles.mock.calls[0][0];
    //and compare
    const prevState = moles;
    const currentState = updateMolesState(prevState);

    expect(currentState.filter(Boolean).length).toBe(1);
  });
});
