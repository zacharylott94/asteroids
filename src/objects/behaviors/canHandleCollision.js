import Vector from "../vector/Vector.js"
import Canvas from "../Canvas.js"
export const canHandleCollision = (object) => {
  const handleCollision = otherObject => {
    // let object = this.parent
    if (object === otherObject) return
    if (object.type === otherObject.type) return

    const squaredDistanceBetweenObjects = Vector.distanceSquared(object.position, otherObject.position, Canvas.width, Canvas.height)
    const summedRadiiOfObjects = object.radius + otherObject.radius
    const squaredRadiiOfObjects = summedRadiiOfObjects * summedRadiiOfObjects
    if (squaredDistanceBetweenObjects <= squaredRadiiOfObjects) object.onCollide(otherObject)
  }
  return {handleCollision}
}