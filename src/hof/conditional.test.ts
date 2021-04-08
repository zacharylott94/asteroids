import { conditional } from "./conditional"

describe('conditional', () => {
  it('returns a function that executes only if the input passes a check', () => {
    let inc = num => num + 1
    let num = 4
    let lessThan5 = num => num < 5
    let conditionalInc = conditional(lessThan5, inc)
    let incedNum = conditionalInc(num)
    expect(incedNum).toBe(5)
    incedNum = conditionalInc(num)
    expect(incedNum).toBe(5)
  })
})