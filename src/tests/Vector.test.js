import Vector from "../objects/Vector.new.js"

describe('Vectors', () => {
  test('can return degrees', () => {
    const testVector = new Vector(1,1)
    const testdegrees = 45
    expect(testVector.degrees()).toBeCloseTo(testdegrees, 5)
  });

  test('Can be added', () => {
    const testVector1 = new Vector(2,3)
    const testVector2 = new Vector(-1,2)
    const addedVectors = Vector.add(testVector1,testVector2)
    const expectedResult = new Vector(1,5)
    expect(addedVectors.x).toBe(expectedResult.x)
    expect(addedVectors.y).toBe(expectedResult.y)
    
  });

  test('can be constructed with no values for a zero vector', () => {
    const vector = new Vector()
    expect(vector.x).toBe(0)
    expect(vector.y).toBe(0)
  });

  test('Can be created with given degrees and magnitude', () => {
    const vector = Vector.fromDegreesAndMagnitude(0, 1)
    expect(vector.x).toBe(1)
    expect(vector.y).toBe(0)
    const vector2 = Vector.fromDegreesAndMagnitude(90, 1)
    expect(vector2.x).toBeCloseTo(0,5)
    expect(vector2.y).toBeCloseTo(1,5)
  });

  test('Can be scaled', () => {
    const vector = new Vector(2,3)
    expect(vector.scale(3).x).toBe(6)
    expect(vector.scale(3).y).toBe(9)
  });

  test('Can return magnitude', () => {
    const vector = new Vector(1,1)
    expect(vector.magnitude()).toBeCloseTo(Math.SQRT2)
  });

});
