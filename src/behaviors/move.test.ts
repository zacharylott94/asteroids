import Position from "../gameObjects/Position";
import Vector from "../gameObjects/Vector.js";
import move from "./move.js";

describe('move', () => {
  it('takes an object, adds its velocty to its position and returns a new object', () => {
    let obj = {
      position: Position.fromComponents(10,10),
      velocity: {
        x: 10,
        y: 10,
      },
      dummy:"dummy data" //just to prove an object can have more properties than required
    }
    let expected = {
      position: Position.fromComponents(20,20),
      velocity: {
        x: 10,
        y: 10,
      },
      dummy:"dummy data"
    }
    expect(move(obj)).toStrictEqual(expected)
    expect(obj).toBe(obj) //enforce no mutation
  });
});