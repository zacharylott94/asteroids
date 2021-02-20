import move from "./behaviors/move.js"
import circle from "./draw/circle.js"
import Graphics from "./engine/graphics.js"
import Vector from "./dataStructures/Vector.js"
import Renderer from "./draw/renderer.js"
import objectList, { objectType } from "./engine/objectList.js"
import { SmallAsteroidFactory, MediumAsteroidFactory, LargeAsteroidFactory } from "./dataStructures/Asteroid.js"

for (let i = 0; i < 3; i++) {
  objectList[objectType.Asteroid].push(SmallAsteroidFactory(Vector.fromComponents(Math.random() * 500, Math.random() * 500),
    Vector.fromComponents(Math.random() * 3, Math.random() * 3)))
  objectList[objectType.Asteroid].push(MediumAsteroidFactory(Vector.fromComponents(Math.random() * 500, Math.random() * 500),
    Vector.fromComponents(Math.random() * 3, Math.random() * 3)))
  objectList[objectType.Asteroid].push(LargeAsteroidFactory(Vector.fromComponents(Math.random() * 500, Math.random() * 500),
    Vector.fromComponents(Math.random() * 3, Math.random() * 3)))
}


let circleRenderer = Renderer(circle)

let graphicsLoop = () => {
  Graphics.clear()

  //test stuff below
  objectList[objectType.Asteroid].forEach(circleRenderer)
}

let physicsLoop = () => {
  objectList[objectType.Asteroid] = objectList[objectType.Asteroid].map(move)
}

setInterval(graphicsLoop, 1000 / 60)
setInterval(physicsLoop, 1000 / 60)