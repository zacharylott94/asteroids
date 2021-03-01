interface IAcceleration {
  acceleration: TVector
}

interface IVelocity {
  velocity: TVector
}

interface IPosition {
  position: TPosition
}

interface IRotation {
  rotation: Degrees
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

const enum ObjectType {
  Asteroid,
  Player,
  Projectile
}
