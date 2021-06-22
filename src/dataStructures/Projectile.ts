
import { isAsteroid } from "../hof/conditions.js"
import { Settings } from "../settings.js"
import GenericFactory from "./genericObject.js"
import Position from "./position/Position.js"
import Vector from "./vector/Vector.js"

type projectileSettings = {
  rotation: Degrees,
  inheritedVelocity: TVector,
  location: TVector,
  isCollidableWith: collisionMask,
  owner: ObjectType,
}

export const Projectile = (settings: projectileSettings): Projectile => {
  const velocity = Vector.fromDegreesAndMagnitude(settings.rotation, Settings.PROJECTILE_SPEED)
  return {
    ...GenericFactory(settings.location, Vector.add(velocity, settings.inheritedVelocity), 1, ObjectType.Projectile),
    ttl: Settings.PROJECTILE_TTL,
    rotation: settings.rotation,
    hasCollided: false,
    isCollidableWith: settings.isCollidableWith,
    owner: settings.owner,
    angularVelocity: 0
  }
}

export const PlayerProjectile = player => {
  const location = Vector.add(Position.real(player.position),
    Vector.fromDegreesAndMagnitude(player.rotation, 10))
  let settings: projectileSettings = {
    location,
    rotation: player.rotation,
    owner: ObjectType.Player,
    isCollidableWith: isAsteroid,
    inheritedVelocity: player.velocity
  }
  return Projectile(settings)
}