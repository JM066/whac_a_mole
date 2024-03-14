jest.useFakeTimers()
jest.spyOn(global, "setInterval")
jest.spyOn(global, "setTimeout")
describe("<Game />", () => {
  it("calls generateAndUpdateRandomMole every second", () => {})

  it("calls updateMolesState and it updates the moles state", () => {})
})
