import scan from "./scan"

it('should map a binary function over the list for every permutation of two items in the list', () => {
  const list = [1, 2, 3, 4]
  const result = [1, 3, 6, 10]
  const sum = (x, y) => x + y
  expect(scan(list, sum)).toStrictEqual(result)
})