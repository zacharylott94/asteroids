import move from "./behaviors/move.js"
import circle from "./draw/circle.js"
import Graphics from "./engine/graphics.js"
import Vector from "./dataStructures/Vector.js"
import Renderer from "./draw/renderer.js"
import ObjectList, { getObjects } from "./engine/objectList.js"
import { SmallAsteroidFactory, MediumAsteroidFactory, LargeAsteroidFactory } from "./dataStructures/Asteroid.js"
import playerShipGraphic from "./draw/playerShipGraphic.js"
import PlayerFactory from "./dataStructures/Player.js"
import Projectile from "./dataStructures/Projectile.js"
import projectileGraphic from "./draw/projectileGraphic.js"
import tickTTL from "./behaviors/tickTTL.js"

let objectList = ObjectList()

for (let i = 0; i < 3; i++) {
  objectList.push(SmallAsteroidFactory(Vector.fromComponents(Math.random() * 500, Math.random() * 500),
    Vector.fromComponents(Math.random() * 3, Math.random() * 3)))
  objectList.push(MediumAsteroidFactory(Vector.fromComponents(Math.random() * 500, Math.random() * 500),
    Vector.fromComponents(Math.random() * 3, Math.random() * 3)))
  objectList.push(LargeAsteroidFactory(Vector.fromComponents(Math.random() * 500, Math.random() * 500),
    Vector.fromComponents(Math.random() * 3, Math.random() * 3)))

  let playerVelocity = Vector.fromComponents(Math.random() * 3, Math.random() * 3)
  objectList.push(PlayerFactory(Vector.fromComponents(Math.random() * 500, Math.random() * 500),
    playerVelocity, Vector.degrees(playerVelocity)
  ))

  let projectileVelocity = Vector.fromComponents(Math.random() * 4, Math.random() * 4)
  objectList.push(Projectile(Vector.fromComponents(Math.random() * 500, Math.random() * 500), projectileVelocity, Vector.degrees(projectileVelocity)))

}


let circleRenderer = Renderer(circle)
let playerRenderer = Renderer(playerShipGraphic)
let projectileRenderer = Renderer(projectileGraphic)

let graphicsLoop = () => {
  Graphics.clear()

  //test stuff below
  getObjects(objectList, ObjectType.Asteroid).forEach(circleRenderer)
  getObjects(objectList, ObjectType.Player).forEach(playerRenderer)
  getObjects(objectList, ObjectType.Projectile).forEach(projectileRenderer)

}


let physicsLoop = () => {
  //update
  objectList.forEach(move)
  getObjects(objectList, ObjectType.Projectile).forEach(tickTTL)


  objectList = objectList.filter(each => !each.delete)
}

setInterval(() => { objectList[0].delete = true }, 1000) //testing

setInterval(graphicsLoop, 1000 / 60)
setInterval(physicsLoop, 1000 / 60)