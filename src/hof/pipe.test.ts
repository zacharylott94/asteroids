import { pipe } from "./pipe.js"

it('pipe passes a value through a list of functions', () => {
  expect(pipe(1, [x => x + 2, x => x * 2, x => x - 3, x => x * x])).toBe(9)
})