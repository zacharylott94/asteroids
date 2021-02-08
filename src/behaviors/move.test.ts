import Position from "../gameObjects/Position";
import Vector from "../gameObjects/Vector.js";
import move from "./move.js";

describe('move', () => {
  it('takes an object, adds its velocty to its position and returns a new object', () => {
    let obj = {
      position: Position.fromVector(Vector.fromComponents(10,10)),
      velocity: {
        x: 10,
        y: 10,
      }
    }
    let expected = {
      position: Position.fromVector(Vector.fromComponents(20,20)),
      velocity: {
        x: 10,
        y: 10,
      }
    }
    expect(move(obj)).toStrictEqual(expected)
    expect(obj).toBe(obj) //enforce no mutation
  });
});