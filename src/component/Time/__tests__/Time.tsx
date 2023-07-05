import { render, act } from "@testing-library/react";
import Time from "../index";

describe("Time", () => {
  let setIsStarted: jest.Mock;

  beforeEach(() => {
    setIsStarted = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("calls setIsStarted when the time counts down to 0", async () => {
    const { rerender } = render(<Time setIsStarted={setIsStarted} />);

    act(() => {
      rerender(<Time setIsStarted={setIsStarted} />);
      jest.advanceTimersByTime(60000);
    });
    rerender(<Time setIsStarted={setIsStarted} />);
    expect(setIsStarted).toHaveBeenCalledTimes(1);
    expect(setIsStarted).toHaveBeenCalledWith(false);
  });
});
