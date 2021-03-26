import move from "./behaviors/move.js"
import circle from "./draw/circle.js"
import Graphics from "./engine/graphics.js"
import Vector from "./dataStructures/Vector.js"
import Renderer from "./draw/renderer.js"
import ObjectList, { getObjects } from "./engine/objectList.js"
import playerShipGraphic from "./draw/playerShipGraphic.js"
import PlayerFactory from "./dataStructures/Player.js"
import projectileGraphic from "./draw/projectileGraphic.js"
// import checkCollision from "./behaviors/checkCollision.js"
import { Settings } from "./settings.js"
import AsteroidSpawnSystem from "./engine/asteroidSpawner.js"
import global from "./engine/global.js"
import mapIf from "./hof/mapIf.js"
import { hasTTL, isMoveable, isPlayer } from "./types/typeGuards.js"
import tickTTL from "./behaviors/tickTTL.js"
import Projectile from "./dataStructures/Projectile.js"
import { controller } from "./dataStructures/controller.js"
import rotate from "./behaviors/rotate.js"
import accelerate from "./behaviors/accelerate.js"
import { getButtonMapping, setButtonMapping } from "./libraries/storage.js"
import "./libraries/inputViewer.js"

let gamepad_buttons: any = []
//@ts-ignore
addEventListener("gamepadconnected", (e) => console.log(gamepad_buttons = e.gamepad))

let objectList = ObjectList()
objectList.push(PlayerFactory(Vector.fromComponents(Settings.GAME_WIDTH / 2, Settings.GAME_HEIGHT / 2), Vector.ZERO, 0))
objectList.push(Projectile({ x: 10, y: 10 }, { x: 2, y: 2 }, 45))
objectList.push(Projectile({ x: 10, y: 10 }, { x: 2, y: 1 }, 55))
objectList.push(Projectile({ x: 10, y: 10 }, { x: 1, y: 2 }, 65))


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
  objectList = mapIf(isMoveable, move, objectList)
  objectList = mapIf(hasTTL, tickTTL, objectList)

  // for (let obj of objectList) {
  //   for (let obj2 of objectList) {
  //     if (checkCollision(obj, obj2))
  //       obj.delete = true
  //   }
  // }

  //}

  // let pressed_buttons = gamepad_buttons.map((button: any, index) => [index, button]).filter(tuple => tuple[1].pressed == 1.0)
  // if (pressed_buttons.length > 0)
  //   console.log(pressed_buttons)
  objectList = objectList.filter(each => !each.delete)
  if (global.timer % 200 === 0) {
    console.log(global.timer)
    AsteroidSpawnSystem(objectList, global.difficulty)
  }
  global.timer++
}

// setInterval(() => { objectList[0].delete = true }, 1000) //testing

setInterval(graphicsLoop, 1000 / 60)
setInterval(physicsLoop, 1000 / 60)

// setButtonMapping(["fire", "0"])
// console.log(getButtonMapping("fire"))