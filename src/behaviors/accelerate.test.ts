import accelerate from "./accelerate.js";

describe('accelerate', () => {
  it('takes an object, adds its velocty to its position and returns a new object', () => {
    let obj = {
      acceleration: {x: 10, y: 10},
      velocity: {
        x: 10,
        y: 10,
      },
      dummy:"dummy data" //just to prove an object can have more properties than required
    }
    let expected = {
      acceleration: {x: 10, y: 10},
      velocity: {
        x: 20,
        y: 20,
      },
      dummy:"dummy data"
    }
    expect(accelerate(obj)).toStrictEqual(expected)
    expect(obj).toBe(obj) //enforce no mutation
  });
});