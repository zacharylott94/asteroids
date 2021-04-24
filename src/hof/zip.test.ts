import zip from "./zip.js"

it('Zip, takes two arrays and creates tuples from their values', () => {
  const array1 = [1, 2, 3]
  const array2 = [4, 5, 6]
  const array3 = [[1, 4], [2, 5], [3, 6]]
  expect(zip(array1, array2)).toStrictEqual(array3)
})

it('should fill in undefined if one array is longer than the other', () => {
  const array1 = [1, 2, 3]
  const array2 = [4, 5]
  const array3 = [[1, 4], [2, 5], [3, undefined]]
  const array4 = [[4, 1], [5, 2], [undefined, 3]]
  expect(zip(array1, array2)).toStrictEqual(array3)
  expect(zip(array2, array1)).toStrictEqual(array4)
})