import Vector from "./Vector.js"
describe('Static Class Vector', () => {
  it('can create vectors from x and y values', () => {
    expect(Vector.fromComponents(10, 10)).toStrictEqual({ x: 10, y: 10 })
    expect(Vector.new(10, 10)).toStrictEqual({ x: 10, y: 10 })
  })
  it('can create vectors from degrees and magnitude', () => {
    let vec = Vector.fromDegreesAndMagnitude(45, 1)
    expect(vec.x).toBeCloseTo(.707)
    expect(vec.y).toBeCloseTo(.707)
    vec = Vector.fromDegreesAndMagnitude(0, 1)
    expect(vec.x).toBe(1)
    expect(vec.y).toBe(0)
  })
  it('can add two vectors', () => {
    let vec1 = Vector.fromComponents(1, 1)
    let vec2 = Vector.fromComponents(1, 5)
    let expected = Vector.fromComponents(2, 6)
    expect(Vector.add(vec1, vec2)).toStrictEqual(expected)
  })
  it('can subtract two vectors', () => {
    let vec1 = Vector.fromComponents(1, 1)
    let vec2 = Vector.fromComponents(1, 5)
    let expected = Vector.fromComponents(0, -4)
    expect(Vector.subtract(vec1, vec2)).toStrictEqual(expected)
  })
  it('can scale a vector', () => {
    let vec = Vector.fromComponents(2, 4)
    let expected = Vector.fromComponents(6, 12)
    expect(Vector.scale(vec, 3)).toStrictEqual(expected)
  })
  it('can get the squared magnitude of a vector', () => {
    let vec = Vector.fromComponents(2, 4)
    let expected = 20
    expect(Vector.squaredMagnitude(vec)).toBe(expected)
  })
  it('can get the magnitude of a vector', () => {
    let vec = Vector.fromComponents(2, 6)
    let expected = 6.324
    expect(Vector.magnitude(vec)).toBeCloseTo(expected)
  })
  it('can normalize a vector', () => {
    let vec = Vector.fromComponents(-3, 4)
    let expected = Vector.fromComponents(-.6, .8)
    expect(Vector.normalize(vec)).toStrictEqual(expected)
  })
  it('can get the angle of a vector in radians', () => {
    let vec = Vector.fromComponents(-1, 0)
    let expected = Math.PI
    expect(Vector.radians(vec)).toBeCloseTo(expected)
  })
  it('can get the angle of a vector in degrees', () => {
    let vec = Vector.fromComponents(-5, -5)
    let expected = 225
    expect(Vector.degrees(vec)).toBe(expected)
    vec = Vector.fromComponents(-5, 5)
    expected = 135
    expect(Vector.degrees(vec)).toBe(expected)
  })
  it('has identity vectors', () => {
    expect(Vector.UP).toStrictEqual({ x: 0, y: -1 })
    expect(Vector.DOWN).toStrictEqual({ x: 0, y: 1 })
    expect(Vector.LEFT).toStrictEqual({ x: -1, y: 0 })
    expect(Vector.RIGHT).toStrictEqual({ x: 1, y: 0 })
    expect(Vector.ZERO).toStrictEqual({ x: 0, y: 0 })

  })
  it('can get the squared distance between two vectors', () => {
    let vec1 = Vector.fromComponents(5, 4)
    let vec2 = Vector.fromComponents(-1, 10)
    let expected = 72
    expect(Vector.distanceSquared(vec1, vec2)).toBe(expected)
  })
  it('can get distance between two vectors', () => {
    let vec1 = Vector.fromComponents(6, 3)
    let vec2 = Vector.fromComponents(-2, 5)
    let expected = 8.246
    expect(Vector.distance(vec1, vec2)).toBeCloseTo(expected)
  })
  it('can find the dot product of two vectors', () => {
    let vec1 = Vector.fromComponents(10, -3)
    let vec2 = Vector.fromComponents(-3, 6)
    let expected = -48
    expect(Vector.dotProduct(vec1, vec2)).toBeCloseTo(expected)
  })

})