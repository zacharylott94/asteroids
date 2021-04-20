import { head, rest, tail, body } from "./arrayFunctions"
const array = [1, 2, 3, 4]

it('head returns the first value of an array', () => {
  expect(head(array)).toBe(array[0])
})

it('rest returns all values except the first of an array', () => {
  const result = [2, 3, 4]
  expect(rest(array)).toStrictEqual(result)
})
it('tail returns the last value of an array', () => {
  const result = array[array.length]
  expect(tail(array)).toBe(result)
})
it('body returns an array of all elements except the last', () => {
  const result = [1, 2, 3]
  expect(body(array)).toStrictEqual(result)
})