import { Settings } from "../settings.js"
import GenericFactory from "./genericObject.js"
import Vector from "./vector/Vector.js"

export default function Projectile(location: TVector, rotation: Degrees): Projectile {

  let velocity = Vector.fromDegreesAndMagnitude(rotation, Settings.PROJECTILE_SPEED)
  return {
    ...GenericFactory(location, velocity, 1, ObjectType.Projectile),
    ttl: Settings.PROJECTILE_TTL,
    rotation,
    hasCollided: false,
  }
}