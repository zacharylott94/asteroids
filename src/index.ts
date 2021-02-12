import move from "./behaviors/move.js"
import circle from "./draw/circle.js"
import Graphics from "./engine/graphics.js"
import Position from "./gameObjects/Position.js"
import Vector from "./gameObjects/Vector.js"
import { isMoveable } from "./typeGuards.js"

function objectFactory(p = Vector.fromComponents(Math.random()*500, Math.random()*500),
                       v = Vector.fromComponents(Math.random()*3,Math.random()*3),
                       r = Math.random() * 30) {
  let object = {
    position: Position.fromVector(p),
    velocity: v,
    renderAt: circle,
    radius: r
  }
  return object
}
let objectList: any[] = new Array(10).fill("").map(_ => objectFactory())
objectList[0] = objectFactory(Vector.ZERO, Vector.ZERO, 10)
objectList[1] = objectFactory(Vector.fromComponents(10,10), Vector.ZERO, 10)

let graphicsLoop = () => {
  Graphics.clear()

  //test stuff below
  objectList.forEach(object => Graphics.renderObject(object))
}

let physicsLoop = () => {
  objectList = objectList.map(object => {
    if(isMoveable(object)) return move(object)
    return object
  })
}

setInterval(graphicsLoop, 1000/60)
setInterval(physicsLoop, 1000/60)