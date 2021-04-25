import { moveAndTick } from "./behaviors/actions/composedActions.js"
import { fireProjectile } from "./behaviors/actions/fireProjectile.js"
import "./dataStructures/controller.js"
import { Particle } from "./dataStructures/Particle.js"
import Player from "./dataStructures/Player.js"
import Position from "./dataStructures/position/Position.js"
import Projectile from "./dataStructures/Projectile.js"
import Vector from "./dataStructures/vector/Vector.js"
import { circleRenderer, collisionRenderer, playerRenderer, projectileRenderer } from "./draw/composedRenderingFunctions.js"
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
import collide, { resetCollision } from "./behaviors/actions/collide.js"
import removeDeleted from "./behaviors/actions/removeDeleted.js"


const objectList = stator(new Array<IGeneric & IRotatableGeneric & ICollidable>())
const particleList = stator(new Array<IGeneric & ITimeToLive>())
let player = Player(Settings.PLAYER_RADIUS)(Vector.fromComponents(Settings.GAME_WIDTH / 2, Settings.GAME_HEIGHT / 2), Vector.ZERO, 0)

objectList(partial(concat, player))
objectList(partial(concat, Projectile(<TVector>[10, 10], 45)))
objectList(partial(concat, Projectile(<TVector>[10, 10], 55)))
objectList(partial(concat, Projectile(<TVector>[10, 10], 65)))

let graphicsLoop = () => {
  clear()
  objectList(circleRenderer)
  objectList(playerRenderer)
  objectList(projectileRenderer)
  objectList(collisionRenderer)
  particleList(circleRenderer)
}

let physicsLoop = () => {
  objectList(resetCollision)
  objectList(moveAndTick)
  objectList(removeDeleted)
  objectList(collide)

  particleList(moveAndTick)
  particleList(partial(concat, Particle(Position.real(objectList[0]?.position), Vector.fromDegreesAndMagnitude(randomAngle(0, 360), Math.random() * 1.5))))
  particleList(removeDeleted)
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