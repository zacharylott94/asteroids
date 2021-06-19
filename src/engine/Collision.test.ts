import Position from "../dataStructures/position/Position.js"
import { checkCollision } from "./Collision.js"

describe('checkCollision', () => {
  it('Compares two objects and returns the first object with a true hasCollided property if the object overlap', () => {
    let object: ICollidable = {
      position: Position.fromComponents(0, 0),
      radius: 25,
      hasCollided: false,
      isCollidableWith: obj => true,
    }
    let object2 = { ...object }
    //trivial case
    expect(checkCollision(object, object2)).toStrictEqual({ ...object, hasCollided: true })
    //same referential object
    expect(checkCollision(object, object)).toStrictEqual(object)

    //45 degree angle & near-tangent
    object2 = { ...object, position: Position.fromComponents(35.355, 35.355) }
    expect(checkCollision(object, object2)).toStrictEqual({ ...object, hasCollided: true })
    //45 degree angle & just outside tangent
    object2 = { ...object, position: Position.fromComponents(36, 36) }
    expect(checkCollision(object, object2)).toStrictEqual({ ...object })
  })
})