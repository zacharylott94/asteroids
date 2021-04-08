import { stator } from "./stator"

describe('stator', () => {
  it('does the thing', () => {
    let state = stator(5)
    let inc = num => num + 1
    state(inc)
    expect(state()).toBe(6)
    state(num => num * 2)
    expect(state()).toBe(12)

  })
})