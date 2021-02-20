import move from "./behaviors/move.js"
import circle from "./draw/circle.js"
import Graphics from "./engine/graphics.js"
import Position from "./dataStructures/Position.js"
import Vector from "./dataStructures/Vector.js"
import { isUpdateable } from "./types/typeGuards.js"
import playerShipGraphic from "./draw/playerShipGraphic.js"
import rotate from "./behaviors/rotate.js"
import Renderer from "./draw/renderer.js"

function objectFactory(p = Vector.fromComponents(Math.random() * 500, Math.random() * 500),
  v = Vector.fromComponents(Math.random() * 3, Math.random() * 3),
  r = Math.random() * 30) {
  let object = {
    position: Position.fromVector(p),
    velocity: v,
    renderAt: circle,
    radius: r,
    update: move
  }
  return object
}
let objectList: any[] = new Array(10).fill("").map(_ => objectFactory())
objectList[0] = {
  position: Position.fromVector(Vector.ZERO),
  velocity: Vector.fromComponents(2, 2),
  rotation: 45,
  renderAt: playerShipGraphic,
  update: (obj: any) => {
    obj = rotate(obj, 1),
      obj = move(obj)
    return obj
  }
}


let circleRenderer = Renderer(circle)

let graphicsLoop = () => {
  Graphics.clear()

  //test stuff below
  objectList.forEach(circleRenderer)
}

let physicsLoop = () => {
  objectList = objectList.map(object => {
    if (isUpdateable(object)) return object.update(object)
    return object
  })
}

setInterval(graphicsLoop, 1000 / 60)
setInterval(physicsLoop, 1000 / 60)