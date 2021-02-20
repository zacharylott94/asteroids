interface IAcceleration {
  acceleration: TVector
}

interface IVelocity {
  velocity: TVector
}

interface IPosition {
  position: TPosition,
}

interface ICircleRenderable extends IPosition {
  radius: number
}

type TRenderFunction = (location: TVector, object: any) => void

interface IRotatable {
  rotation: Degrees
}

interface IUpdateable {
  update: (object: any) => any
}

interface ICollidable extends IPosition {
  radius: number
  handleCollision: (thisObject: ICollidable, otherObject: ICollidable) => ICollidable
}

type TMoveable = IVelocity & IPosition

type TVector = {
  x: number,
  y: number
}
type TPosition = [TVector, TVector, TVector, TVector, TVector, TVector, TVector, TVector, TVector,]

type Degrees = number