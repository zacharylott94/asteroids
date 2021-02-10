import Position from "./gameObjects/Position.js";
import Vector from "./gameObjects/Vector.js";
import { isMoveable } from "./typeGuards.js";

describe('Typeguards', () => {
  it('isMoveable returns true if the passed object has a velocity and position', () => {
    let object = {
      velocity: Vector.fromComponents(2,2),
      position: Position.fromComponents(2,2)
    }
    let object2 = {}
    let object3 = {
      velocity: Vector.ZERO
    }
    expect(isMoveable(object)).toBe(true)
    expect(isMoveable(object2)).toBe(false)
    expect(isMoveable(object3)).toBe(false)
  });
});