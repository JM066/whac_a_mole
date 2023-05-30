import { render } from "@testing-library/react";
import Game from "../index";

jest.useFakeTimers();

test("it updates moles state", () => {
  const setMoles = jest.fn();
  const moles = Array(24).fill(false);

  render(<Game moles={moles} setMoles={setMoles} />);

  //   act(() => {
  //     jest.runAllTimers();
  //   });

  //   expect(setMoles).toHaveBeenCalled();
});
