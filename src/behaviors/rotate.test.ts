import rotate from "./rotate"

describe('rotate', () => {
  it('adds a value to an object\'s rotation', () => {
    let object: IRotation = {
      rotation: 0
    }
    let expected: IRotation = {
      rotation: 10
    }
    let rotateAmount = 10
    object = rotate(object, rotateAmount)
    expect(object).toStrictEqual(expected)
  })
})