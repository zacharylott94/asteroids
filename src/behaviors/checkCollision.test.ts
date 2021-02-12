import Position from "../gameObjects/Position";
import checkCollision from "./checkCollision"

describe('checkCollision', () => {
  it('Compares two objects and returns true if they have overlapped', () => {
    let object: ICollidable = {
      position: Position.fromComponents(0,0),
      radius: 25,
      handleCollision: (object:ICollidable, otherObject:ICollidable) => {
        console.log(`${object} collided with ${otherObject}`)
        return object
      }
    }
    let object2 = {...object}
    //trivial case
    expect(checkCollision(object, object2)).toBe(true)

    //45 degree angle & near-tangent
    object2 = {...object, position: Position.fromComponents(35.355,35.355)}
    expect(checkCollision(object, object2)).toBe(true)  
    //45 degree angle & just outside tangent
    object2 = {...object, position: Position.fromComponents(36,36)}
    expect(checkCollision(object, object2)).toBe(false)
  });
});