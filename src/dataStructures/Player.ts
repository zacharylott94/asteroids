import { Settings } from "../settings.js"
import Position from "./Position.js"

export default function PlayerFactory(location: TVector, velocity: TVector, rotation: Degrees): IPlayer {
  return {
    position: Position.fromVector(location),
    radius: Settings.PLAYER_RADIUS,
    rotation,
    velocity
  }
}