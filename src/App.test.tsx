import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "./App";

// Mock the localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

// Mock the Time and Game components
// jest.mock("./Time.tsx", () => {
//   return function DummyTime() {
//     return <div data-testid="time">Dummy Time</div>;
//   };
// });

// jest.mock("./Game/index.tsx", () => {
//   return function DummyGame() {
//     return <div data-testid="game">Dummy Game</div>;
//   };
// });

describe("<App />", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders correctly", () => {
    expect(screen.getByText("Score: 0")).toBeInTheDocument();
    // expect(screen.getByText("Time:")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("Start")).toBeInTheDocument();
  });

  it("starts the game when the start button is clicked", () => {
    userEvent.click(screen.getByText("Start"));
    // expect(localStorage.removeItem).toHaveBeenCalledWith("time");
    // expect(screen.getByTestId("time")).toBeInTheDocument();
    // expect(screen.getByTestId("game")).toBeInTheDocument();
  });
});
