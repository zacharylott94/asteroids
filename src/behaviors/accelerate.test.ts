import accelerate from "./accelerate.js"

describe('accelerate', () => {
  it('mutates an object by adding its acceleration property to its velocity property', () => {
    let obj = {
      acceleration: { x: 10, y: 10 },
      velocity: {
        x: 10,
        y: 10,
      },
      dummy: "dummy data" //just to prove an object can have more properties than required
    }
    let expected = {
      acceleration: { x: 10, y: 10 },
      velocity: {
        x: 20,
        y: 20,
      },
      dummy: "dummy data"
    }
    accelerate(obj)
    expect(obj).toStrictEqual(expected)
  })
})