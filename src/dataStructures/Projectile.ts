
import { isAsteroid } from "../hof/conditions.js"
import { Settings } from "../settings.js"
import GenericFactory from "./genericObject.js"
import Position from "./position/Position.js"
import Vector from "./vector/Vector.js"

type projectileSettings = {
  rotation: Degrees,
  inheritedVelocity: TVector,
  location: TVector,
  isCollidableWith: Function,
  owner: ObjectType,
}

export const Projectile = (settings: projectileSettings) => {
  const velocity = Vector.fromDegreesAndMagnitude(settings.rotation, Settings.PROJECTILE_SPEED)
  return {
    ...GenericFactory(settings.location, Vector.add(velocity, settings.inheritedVelocity), 1, ObjectType.Projectile),
    ttl: Settings.PROJECTILE_TTL,
    rotation: settings.rotation,
    hasCollided: false,
    isCollidableWith: settings.isCollidableWith,
    owner: settings.owner,
  }
}

export const PlayerProjectile = player => {
  let settings: projectileSettings = {
    location: Position.real(player.position),
    rotation: player.rotation,
    owner: ObjectType.Player,
    isCollidableWith: isAsteroid,
    inheritedVelocity: player.velocity
  }
  return Projectile(settings)
}