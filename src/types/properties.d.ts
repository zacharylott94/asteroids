interface IAcceleration {
  acceleration: number
}

interface IVelocity {
  velocity: TVector
}

interface IPosition {
  position: TPosition
}

interface IRotation {
  rotation: Degrees,
  angularVelocity: Degrees
}

interface IRadius {
  radius: number
}

interface ITimeToLive {
  ttl: number
}

interface ITypeable {
  type: ObjectType
}

interface IDeleteable {
  delete: bool
}

const enum ObjectType {
  Asteroid,
  Player,
  Projectile,
  Generic,
  UFO,
}
