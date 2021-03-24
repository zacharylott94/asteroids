import apply from "./apply"

describe('apply', () => {
  it('takes a function and a list and applies applies the list as variables to the function', () => {
    function add(...args: number[]) {
      return args.reduce((x, y) => x + y)
    }
    let list = [1, 2, 3, 4, 5]
    let answer = 15
    expect(apply(add, list)).toBe(answer)
  })
})