import move from "./behaviors/move.js"
import circle from "./draw/circle.js"
import Graphics from "./engine/graphics.js"
import Vector from "./dataStructures/Vector.js"
import Renderer from "./draw/renderer.js"
import objectList, { objectType } from "./engine/objectList.js"
import { SmallAsteroidFactory, MediumAsteroidFactory, LargeAsteroidFactory } from "./dataStructures/Asteroid.js"
import playerShipGraphic from "./draw/playerShipGraphic.js"
import PlayerFactory from "./dataStructures/Player.js"
import Position from "./dataStructures/Position.js"

for (let i = 0; i < 3; i++) {
  objectList[objectType.Asteroid].push(SmallAsteroidFactory(Vector.fromComponents(Math.random() * 500, Math.random() * 500),
    Vector.fromComponents(Math.random() * 3, Math.random() * 3)))
  objectList[objectType.Asteroid].push(MediumAsteroidFactory(Vector.fromComponents(Math.random() * 500, Math.random() * 500),
    Vector.fromComponents(Math.random() * 3, Math.random() * 3)))
  objectList[objectType.Asteroid].push(LargeAsteroidFactory(Vector.fromComponents(Math.random() * 500, Math.random() * 500),
    Vector.fromComponents(Math.random() * 3, Math.random() * 3)))

  let playerVelocity = Vector.fromComponents(Math.random() * 3, Math.random() * 3)
  objectList[objectType.Player].push(PlayerFactory(Vector.fromComponents(Math.random() * 500, Math.random() * 500),
    playerVelocity, Vector.degrees(playerVelocity)
  ))
}


let circleRenderer = Renderer(circle)
let playerRenderer = Renderer(playerShipGraphic)

let graphicsLoop = () => {
  Graphics.clear()

  //test stuff below
  objectList[objectType.Asteroid].forEach(circleRenderer)
  objectList[objectType.Player].forEach(playerRenderer)
}

let physicsLoop = () => {
  objectList[objectType.Asteroid] = objectList[objectType.Asteroid].map(move)
  objectList[objectType.Player] = objectList[objectType.Player].map(move)
}

setInterval(graphicsLoop, 1000 / 60)
setInterval(physicsLoop, 1000 / 60)