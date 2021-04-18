import { conditional } from "./conditional"

describe('conditional', () => {
  it('returns a function that executes only if the input passes a check', () => {
    const inc = num => num + 1
    const num = 4
    const lessThan5 = num => num < 5
    const conditionalInc = conditional(lessThan5, inc)
    let incedNum = conditionalInc(num)
    expect(incedNum).toBe(5)
    incedNum = conditionalInc(num)
    expect(incedNum).toBe(5)
  })
})