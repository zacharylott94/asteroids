
import { isAsteroid } from "../hof/conditions.js"

import { Settings } from "../settings.js"
import GenericFactory from "./genericObject.js"
import Vector from "./vector/Vector.js"


export default function Projectile(location: TVector, rotation: Degrees, inheritedVelocity: TVector = [0, 0], collidableWith = isAsteroid, owner: ObjectType): Projectile {

  let velocity = Vector.fromDegreesAndMagnitude(rotation, Settings.PROJECTILE_SPEED)
  return {
    ...GenericFactory(location, Vector.add(velocity, inheritedVelocity), 1, ObjectType.Projectile),
    ttl: Settings.PROJECTILE_TTL,
    rotation,
    hasCollided: false,
    collidableWith,
    owner,
  }
}