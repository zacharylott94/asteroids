import Position from "../dataStructures/Position.js";
import Vector from "../dataStructures/Vector.js";
import { isMoveable, isRotatable } from "./typeGuards.js";

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

  it('isRotatable returns true if the passed object has a rotation', () => {
    let object = {
      rotation: 10
    }
    expect(isRotatable(object)).toBe(true)
    let object2 = {}
    expect(isRotatable(object2)).toBe(false)
  });
});