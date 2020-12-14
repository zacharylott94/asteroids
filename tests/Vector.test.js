import Vector from "../src/objects/Vector.js"

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

  test('Can be normalized', () => {
    const vector = new Vector(2,2)
    expect(vector.normalize().x).toBeCloseTo(Math.SQRT1_2)
    expect(vector.normalize().y).toBeCloseTo(Math.SQRT1_2)
  });

  //Assumes game field of 500,500
  test('distance is calculated based on the width and height of game field', () => {
    const A = new Vector(10,10)
    const B = new Vector(490,10)
    const C = new Vector(10,490)
    const D = new Vector(490,490)
    const AB = Vector.distance(A,B)
    const AC = Vector.distance(A,C)
    const DB = Vector.distance(D,B)
    const DC = Vector.distance(D,C)
    const AD = Vector.distance(A,D)
    const BC = Vector.distance(B,C)

    expect(AB).toBeCloseTo(AC)
    expect(DB).toBeCloseTo(DC)
    expect(DB).toBeCloseTo(AB)
    expect(AD).toBeCloseTo(BC)
  });

    //Allows passed game field
    test('distance is calculated based on the width and height passed', () => {
      const width = 300
      const height = 300
      const A = new Vector(10,10)
      const B = new Vector(290,10)
      const C = new Vector(10,290)
      const D = new Vector(290,290)
      const AB = Vector.distance(A,B)
      const AC = Vector.distance(A,C)
      const DB = Vector.distance(D,B)
      const DC = Vector.distance(D,C)
      const AD = Vector.distance(A,D)
      const BC = Vector.distance(B,C)
  
      expect(AB).toBeCloseTo(AC)
      expect(DB).toBeCloseTo(DC)
      expect(DB).toBeCloseTo(AB)
      expect(AD).toBeCloseTo(BC)
    });

    test('Vector throws error if passed non-number parameters', () => {
      expect(() => {new Vector('f',1)}).toThrow(TypeError)
      expect(() => {new Vector(1,'f')}).toThrow(TypeError)
      expect(() => {new Vector('f','b')}).toThrow(TypeError)
      expect(() => {new Vector(NaN,NaN)}).toThrow(TypeError)
      expect(() => {new Vector([],[])}).toThrow(TypeError)
      expect(() => {new Vector('2','2')}).toThrow(TypeError)

    });
    test('Passing only one parameter throws an error', () => {
      expect(() => {new Vector(1)}).toThrow(TypeError)
      expect(() => {new Vector(undefined,1)}).toThrow(TypeError)
    });

});
