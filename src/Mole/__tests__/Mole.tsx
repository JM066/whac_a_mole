import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import Mole from "../index"; // or the correct path to your Mole component

describe("<Mole />", () => {
  let mockOnClick: jest.Mock;

  beforeEach(() => {
    mockOnClick = jest.fn();
  });

  it("renders correctly", () => {
    render(<Mole active={false} onClick={mockOnClick} />);
    expect(screen.getByText("Mole")).toBeInTheDocument();
  });

  it("renders with active className when active prop is true", () => {
    render(<Mole active={true} onClick={mockOnClick} />);
    expect(screen.getByText("Mole")).toHaveClass("active");
  });

  it("renders without active className when active prop is false", () => {
    render(<Mole active={false} onClick={mockOnClick} />);
    expect(screen.getByText("Mole")).not.toHaveClass("active");
  });

  //   it("calls the onClick handler when clicked", () => {
  //     const mockOnClick = jest.fn();
  //     render(<Mole active={false} onClick={mockOnClick} />);
  //     userEvent.click(screen.getByText("Mole"));
  //     expect(mockOnClick).toHaveBeenCalledTimes(1);
  //   });
});
