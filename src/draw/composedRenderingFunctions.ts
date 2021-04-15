import { conditional } from "../hof/conditional.js"
import mapper from "../hof/mapper.js"
import { isAsteroidOrParticle, isPlayer, isProjectile } from "../types/typeGuards.js"
import circle from "./circle.js"
import playerShipGraphic from "./playerShipGraphic.js"
import projectileGraphic from "./projectileGraphic.js"
import Renderer from "./renderer.js"

export const circleRenderer = mapper(conditional(isAsteroidOrParticle, Renderer(circle)))
export const playerRenderer = mapper(conditional(isPlayer, Renderer(playerShipGraphic)))
export const projectileRenderer = mapper(conditional(isProjectile, Renderer(projectileGraphic)))