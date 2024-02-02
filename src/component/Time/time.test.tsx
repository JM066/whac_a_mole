import { it, vi, describe } from "vitest"
import { localStorageMock } from "@/mocks/localStorage"

beforeAll(() => localStorageMock.getItem("time"))
afterAll(() => localStorageMock.removeItem("time"))
//Todo: Get localStorageMock value
describe("Time", async () => {
  it("calls setIsStarted when the time counts down to 0", async () => {})
})
