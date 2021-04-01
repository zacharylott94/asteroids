import circle from "./draw/circle.js"
import Graphics from "./engine/graphics.js"
import Vector from "./dataStructures/Vector.js"
import Renderer from "./draw/renderer.js"
import ObjectList, { removeDeleted } from "./engine/objectList.js"
import playerShipGraphic from "./draw/playerShipGraphic.js"
import PlayerFactory from "./dataStructures/Player.js"
import projectileGraphic from "./draw/projectileGraphic.js"
import { Settings } from "./settings.js"
import AsteroidSpawnSystem from "./engine/asteroidSpawner.js"
import global from "./engine/global.js"
import Projectile from "./dataStructures/Projectile.js"
import "./dataStructures/controller.js"
import rotate from "./behaviors/rotate.js"
import { getButtonMapping, setButtonMapping } from "./libraries/storage.js"
import "./libraries/inputViewer.js"
import { pollGamepad } from "./dataStructures/controller.js"
import updateAsteroid from "./behaviors/updaters/updateAsteroid.js"
import updateParticle from "./behaviors/updaters/updateParticle.js"
import updateProjectile from "./behaviors/updaters/updateProjectile.js"
import { Particle } from "./dataStructures/Particle.js"
import Position from "./dataStructures/Position.js"
import { randomAngle } from "./libraries/random.js"


//@ts-ignore
// addEventListener("gamepadconnected", (e) => console.log(gamepad_buttons = e.gamepad))

let objectList = ObjectList()
objectList.player.push(PlayerFactory(Vector.fromComponents(Settings.GAME_WIDTH / 2, Settings.GAME_HEIGHT / 2), Vector.ZERO, 0))
objectList.projectiles.push(Projectile({ x: 10, y: 10 }, { x: 2, y: 2 }, 45))
objectList.projectiles.push(Projectile({ x: 10, y: 10 }, { x: 2, y: 1 }, 55))
objectList.projectiles.push(Projectile({ x: 10, y: 10 }, { x: 1, y: 2 }, 65))


let circleRenderer = Renderer(circle)
let playerRenderer = Renderer(playerShipGraphic)
let projectileRenderer = Renderer(projectileGraphic)

let graphicsLoop = () => {
  Graphics.clear()

  //test stuff below
  objectList.asteroids.forEach(circleRenderer)
  objectList.player.forEach(playerRenderer)
  objectList.projectiles.forEach(projectileRenderer)
  objectList.particles.forEach(circleRenderer)

}

let physicsLoop = () => {
  //update
  objectList.asteroids = objectList.asteroids.map(updateAsteroid)
  objectList.particles = objectList.particles.map(updateParticle)
  objectList.projectiles = objectList.projectiles.map(updateProjectile)
  let actions = pollGamepad()
  if (actions.indexOf("left") != -1)
    objectList = objectList.player.map((each) => rotate(each, -3))
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
  objectList.particles.push(Particle(Position.real(objectList.asteroids[0]?.position), Vector.fromDegreesAndMagnitude(randomAngle(0, 360), Math.random() * 1.5)))
  objectList = removeDeleted(objectList)
  if (global.timer % 200 === 0) {
    // console.log(pollGamepad())
    console.log(global.timer)
    AsteroidSpawnSystem(objectList, global.difficulty)
  }
  global.timer++
}

// setInterval(() => { objectList[0].delete = true }, 1000) //testing

setInterval(graphicsLoop, 1000 / 60)
setInterval(physicsLoop, 1000 / 60)

setButtonMapping(["fire", ["buttons", 0]])
setButtonMapping(["left", ["buttons", 7]])
setButtonMapping(["right", ["buttons", 8]])
console.log(getButtonMapping("fire")[1])