import { render } from "@testing-library/react";
import Game from "../index";

jest.useFakeTimers();
jest.spyOn(global, "setInterval");
jest.spyOn(global, "setTimeout");
describe("<Game />", () => {
  let dispatch: jest.Mock;
  const state = { score: 0, moles: Array(24).fill(false) };

  beforeEach(() => {
    Math.random = jest.fn().mockReturnValue(0.5);
    dispatch = jest.fn();
    render(<Game state={state} dispatch={dispatch} />);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("calls generateAndUpdateRandomMole every second", () => {
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
    const expectedIndex = Math.floor(Math.random() * state.moles.length);
    jest.runOnlyPendingTimers();
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "activate",
      index: expectedIndex,
    });
  });

  it("calls updateMolesState and it updates the moles state", () => {
    const expectedDelay = 1000 * Math.random() * 2 + 1;
    jest.runOnlyPendingTimers();
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function),
      expectedDelay
    );

    const expectedIndex = Math.floor(Math.random() * state.moles.length);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "activate",
      index: expectedIndex,
    });
    jest.advanceTimersByTime(expectedDelay);
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith({
      type: "deactivate",
      index: expectedIndex,
    });
    const updatedMolesState = dispatch.mock.calls[2][0];
    const currentState = state.moles[updatedMolesState.index];
    expect(currentState).toBe(false);
  });
});
