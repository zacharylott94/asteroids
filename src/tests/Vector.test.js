import Vector from "../objects/Vector.new.js"


test('Can get degrees from a Vector', () => {
  const testVector = new Vector(1,1)
  const testdegrees = 45
  expect(testVector.degrees()).toBeCloseTo(testdegrees, 5)
});

test('Can add two Vectors', () => {
  const testVector1 = new Vector(2,3)
  const testVector2 = new Vector(-1,2)
  const expectedResult = new Vector(1,5)
  expect(Vector.add(testVector1,testVector2)).toBe(expectedResult)
  
});

test('no values in Vector constructor returns a zero Vector', () => {
  const vector = new Vector()
  expect(vector.x).toBe(0)
  expect(vector.y).toBe(0)
});

test('Can create Vector from a given degrees and magnitude', () => {
  const vector = Vector.fromDegreesAndMagnitude(0, 1)
  expect(vector.x).toBe(1)
  expect(vector.y).toBe(0)
  const vector2 = Vector.fromDegreesAndMagnitude(90, 1)
  expect(vector2.x).toBeCloseTo(0,5)
  expect(vector2.y).toBeCloseTo(1,5)
});
