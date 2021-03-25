import { Settings } from "../settings.js"
import GenericFactory from "./genericObject.js"

export default function Projectile(location: TVector, velocity: TVector, rotation: Degrees): IRotatableGeneric & ITimeToLive {
  return {
    ...GenericFactory(location, velocity, 1, ObjectType.Projectile),
    ttl: Settings.PROJECTILE_TTL,
    rotation,
  }
}