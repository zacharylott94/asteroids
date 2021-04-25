import { conditional } from "../hof/conditional.js"
import mapper from "../hof/mapper.js"
import { hasCollided, isAsteroidOrParticle, isPlayer, isProjectile } from "../types/typeGuards.js"
import { circle } from "./circle.js"
import { color } from "./color.js"
import playerShipGraphic from "./playerShipGraphic.js"
import projectileGraphic from "./projectileGraphic.js"
import Renderer from "./renderer.js"
import { canvasContextScope } from "./canvasContextScope.js"

function buildRenderer(condition, draw) {
  return mapper(conditional(condition, Renderer(canvasContextScope(draw))))
}
const yellow = color("yellow")
const red = color("red")
export const collisionRenderer = buildRenderer(hasCollided, red(circle))
export const circleRenderer = buildRenderer(isAsteroidOrParticle, circle)
export const playerRenderer = buildRenderer(isPlayer, playerShipGraphic)
export const projectileRenderer = buildRenderer(isProjectile, yellow(projectileGraphic))