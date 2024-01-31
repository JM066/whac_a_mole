import { render } from "@testing-library/react"
import { screen } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import App from "./App"

describe("<App />", () => {
  test("starts the game", async () => {
    const user = userEvent.setup()
    render(<App />)
    const startButton = screen.getByRole("button", { name: /start/i })
    await user.click(startButton)
    const stopButton = screen.getByRole("button", { name: /stop/i })
    expect(stopButton).toBeInTheDocument()
  })
})
