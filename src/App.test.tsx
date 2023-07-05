import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Game from "./component/Game/index";
import App from "./App";

const localStorageMock = (function () {
  let store: { [key: string]: string } = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });
const removeLocalStorage = (id: string) => {
  window.localStorage.removeItem(id);
};
describe("<App />", () => {
  let setMoles: jest.Mock;
  beforeEach(() => {
    setMoles = jest.fn();
    render(<App />);
  });

  it("renders text correctly", () => {
    expect(screen.getByText("Score: 0")).toBeInTheDocument();
    expect(screen.getByText("Time:")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("Start")).toBeInTheDocument();
  });

  it("starts the game when button is clicked and remove the 'time' key in the localStorage", () => {
    userEvent.click(screen.getByText("Start"));
    const moles = Array(24).fill(false);
    expect(<Game moles={moles} setMoles={setMoles} />).toBeInTheDocument;
    const mockId = "time";
    removeLocalStorage(mockId);
    expect(localStorage.getItem(mockId)).toEqual(undefined);
  });
});
