import { moveAllMoveable, tickAllTTL } from "./behaviors/actions/composedActions.js"
import { fireProjectile } from "./behaviors/actions/fireProjectile.js"
import "./dataStructures/controller.js"
import { Particle } from "./dataStructures/Particle.js"
import Player from "./dataStructures/Player.js"
import Position from "./dataStructures/position/Position.js"
import Projectile from "./dataStructures/Projectile.js"
import Vector from "./dataStructures/Vector.js"
import { circleRenderer, playerRenderer, projectileRenderer } from "./draw/composedRenderingFunctions.js"
import AsteroidSpawnSystem from "./engine/asteroidSpawner.js"
import global from "./engine/global.js"
import { clear } from "./draw/clear.js"
import { partial } from "./hof/partial.js"
import { stator } from "./hof/stator.js"
import concat from "./libraries/concat.js"
import "./libraries/inputViewer.js"
import { randomAngle } from "./libraries/random.js"
import { setButtonMapping } from "./libraries/storage.js"
import { Settings } from "./settings.js"


let objectList = stator(new Array<IGeneric & ITimeToLive>())
let player = Player(Settings.PLAYER_RADIUS)(Vector.fromComponents(Settings.GAME_WIDTH / 2, Settings.GAME_HEIGHT / 2), Vector.ZERO, 0)

objectList(partial(concat, player))
objectList(partial(concat, Projectile({ x: 10, y: 10 }, 45)))
objectList(partial(concat, Projectile({ x: 10, y: 10 }, 55)))
objectList(partial(concat, Projectile({ x: 10, y: 10 }, 65)))

let graphicsLoop = () => {
  clear()
  objectList(circleRenderer)
  objectList(playerRenderer)
  objectList(projectileRenderer)
}

let physicsLoop = () => {
  objectList(moveAllMoveable)
  objectList(tickAllTTL)
  objectList(partial(concat, Particle(Position.real(objectList[0]?.position), Vector.fromDegreesAndMagnitude(randomAngle(0, 360), Math.random() * 1.5))))
  objectList(list => list.filter(obj => !obj.delete))
  if (global.timer % 200 === 0) {
    console.log(objectList())
    AsteroidSpawnSystem(objectList, global.difficulty)
    objectList(fireProjectile)
  }
  global.timer++
}

setInterval(graphicsLoop, 1000 / 60)
setInterval(physicsLoop, 1000 / 60)

setButtonMapping(["fire", ["buttons", 0]])
setButtonMapping(["left", ["buttons", 7]])
setButtonMapping(["right", ["buttons", 8]])