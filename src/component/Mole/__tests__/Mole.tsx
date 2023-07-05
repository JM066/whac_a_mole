import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Mole from "../index";

describe("<Mole />", () => {
  let onclick: jest.Mock;

  beforeEach(() => {
    onclick = jest.fn();
  });

  it("renders <Mole /> correctly", () => {
    render(<Mole active={false} onClick={onclick} />);
    expect(screen.getByText("Mole")).toBeInTheDocument();
  });

  it("renders with active className active prop value is true", () => {
    render(<Mole active={true} onClick={onclick} />);
    expect(screen.getByTestId("mole")).toHaveClass("active");
  });

  it("renders without active className when active prop is false", () => {
    render(<Mole active={false} onClick={onclick} />);
    expect(screen.getByTestId("mole")).not.toHaveClass("active");
  });

  it("calls the onClick prop when the mole is clicked", async () => {
    render(<Mole active={false} onClick={onclick} />);
    await waitFor(() => userEvent.click(screen.getByTestId("mole")));
    expect(onclick).toHaveBeenCalledTimes(1);
  });
});
