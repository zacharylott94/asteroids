import accelerate from "./accelerate.js"

describe('accelerate', () => {
  it('returns a new object by adding the acceleration property of the old object to the velocity property', () => {
    let obj = {
      acceleration: 2,
      rotation: 90,
      velocity: {
        x: 10,
        y: 10,
      },
      dummy: "dummy data" //just to prove an object can have more properties than required
    }
    let expected = { x: 10, y: 12 }
    obj = accelerate(obj)
    expect(obj.velocity).toStrictEqual(expected)
  })
})