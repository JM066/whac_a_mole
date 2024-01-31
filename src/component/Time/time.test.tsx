import { render } from "@testing-library/react"

import { it, vi, describe } from "vitest"
import { localStorageMock } from "@/mocks/localStorage"
import Time from "./index"

beforeAll(() => localStorageMock.getItem("time"))
afterAll(() => localStorageMock.removeItem("time"))
//Todo: Get localStorageMock value
describe("Time", async () => {
  it("calls setIsStarted when the time counts down to 0", async () => {
    render(<Time stop={vi.fn()} />)
    // const time = await screen.findByText(0)
  })
})
