import Vector from "../vector/Vector.js";
import Canvas from "../Canvas.js"

class ColliderComponent {
  constructor(parent) {
    this.parent = parent
  }

  collidedWith(otherObject){
    let thisObject = this.parent
    if (thisObject === otherObject) return false //don't check for the same object
    if (thisObject.constructor.name === otherObject.constructor.name) return false //same object classes don't interact

    const squaredDistanceBetweenObjects = Vector.distanceSquared(thisObject.position, otherObject.position, Canvas.width, Canvas.height)
    const summedRadiiOfObjects = thisObject.radius + otherObject.radius
    const squaredRadiiOfObjects = summedRadiiOfObjects * summedRadiiOfObjects
    if (squaredDistanceBetweenObjects <= squaredRadiiOfObjects) return true
    else return false
  }

}
export default ColliderComponent