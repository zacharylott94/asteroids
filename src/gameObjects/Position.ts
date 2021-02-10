import { Settings } from "../settings.js"
import Vector from "./Vector.js"

enum EPosition {
  topLeft,
  top,
  topRight,
  left,
  real,
  right,
  bottomLeft,
  bottom,
  bottomRight,
}

const offsets: TPosition = [
  Vector.fromComponents(-Settings.GAME_WIDTH,-Settings.GAME_HEIGHT),
  Vector.fromComponents(0                   ,-Settings.GAME_HEIGHT),
  Vector.fromComponents( Settings.GAME_WIDTH,-Settings.GAME_HEIGHT),
  Vector.fromComponents(-Settings.GAME_WIDTH,0),
  Vector.fromComponents(0                   ,0),
  Vector.fromComponents( Settings.GAME_WIDTH,0),
  Vector.fromComponents(-Settings.GAME_WIDTH,Settings.GAME_HEIGHT),
  Vector.fromComponents(0                   ,Settings.GAME_HEIGHT),
  Vector.fromComponents( Settings.GAME_WIDTH,Settings.GAME_HEIGHT),

]

export default class Position {
  static fromVector(vector:TVector): TPosition {
    let newPosition = offsets
    return Position.addVector(newPosition, vector)
  }

  static fromComponents(x:number, y:number): TPosition {
    let newPosition = offsets
    return Position.addVector(newPosition, Vector.fromComponents(x,y))
  }

  static addVector(position:TPosition,vector:TVector): TPosition {
    let newPosition: TPosition = [
      ...position
    ]
    newPosition = <TPosition>newPosition.map(each => Vector.add(each, vector))
    return newPosition
  }

  static real(position:TPosition):TVector {
    return position[EPosition.real]
  }

  static closestTo(position:TPosition, point:TVector) {
    let closest = Vector.ZERO
    let closestDistance = Number.MAX_SAFE_INTEGER
    position.forEach(each => {
      let squaredDistance = Vector.distanceSquared(each, point)
      if (squaredDistance < closestDistance) {
        closestDistance = squaredDistance
        closest = each
      }
    })
    return closest
  }

}