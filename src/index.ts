import move from "./behaviors/move.js"
import circle from "./draw/circle.js"
import Graphics from "./engine/graphics.js"
import Vector from "./dataStructures/Vector.js"
import Renderer from "./draw/renderer.js"
import ObjectList, { getObjects } from "./engine/objectList.js"
import playerShipGraphic from "./draw/playerShipGraphic.js"
import PlayerFactory from "./dataStructures/Player.js"
import projectileGraphic from "./draw/projectileGraphic.js"
import tickTTL from "./behaviors/tickTTL.js"
import checkCollision from "./behaviors/checkCollision.js"
import { Settings } from "./settings.js"
import AsteroidSpawnSystem from "./engine/asteroidSpawner.js"

let objectList = ObjectList()

objectList.push(PlayerFactory(Vector.fromComponents(Settings.GAME_WIDTH / 2, Settings.GAME_HEIGHT / 2), Vector.ZERO, 0))


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

let globalTimer = 0
let difficulty = 1
let physicsLoop = () => {
  //update
  objectList.forEach(move)
  getObjects(objectList, ObjectType.Projectile).forEach(tickTTL)

  for (let obj of objectList) {
    for (let obj2 of objectList) {
      if (checkCollision(obj, obj2))
        obj.delete = true
    }
  }


  objectList = objectList.filter(each => !each.delete)
  if (globalTimer % 200 === 0) {
    console.log(globalTimer)
    AsteroidSpawnSystem(objectList, difficulty)
  }
  globalTimer++
}

// setInterval(() => { objectList[0].delete = true }, 1000) //testing

setInterval(graphicsLoop, 1000 / 60)
setInterval(physicsLoop, 1000 / 60)