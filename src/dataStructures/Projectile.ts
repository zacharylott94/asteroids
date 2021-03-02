import { Settings } from "../settings.js"
import Position from "./Position.js"

export default function Projectile(location: TVector, velocity: TVector, rotation: Degrees): IRotatableGeneric & ITimeToLive {
  return {
    position: Position.fromVector(location),
    ttl: Settings.PROJECTILE_TTL,
    velocity,
    rotation,
    radius: 1,
    type: ObjectType.Projectile,
    delete: false
  }
}