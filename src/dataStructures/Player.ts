import { Settings } from "../settings.js"
import GenericFactory from "./genericObject.js"

export default function PlayerFactory(location: TVector, velocity: TVector, rotation: Degrees): IRotatableGeneric & IAcceleration {
  return {
    ...GenericFactory(location, velocity, Settings.PLAYER_RADIUS, ObjectType.Player),
    rotation,
    acceleration: .05,
  }
}