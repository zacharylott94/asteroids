interface IAcceleration {
  acceleration: TVector
}

interface IVelocity {
  velocity: TVector
}

interface IPosition {
  position: TPosition,
}

interface IRenderable extends IPosition{
  renderAt: (location:TVector, object: any) => void
}

interface IRotatable {
  rotation: number
}

interface ICollidable extends IPosition {
  radius: number
  handleCollision: (thisObject: ICollidable, otherObject: ICollidable) => ICollidable
}

type TMoveable = IVelocity & IPosition

type TVector = {
  x:number,
  y:number
}
type TPosition = [TVector,TVector,TVector,TVector,TVector,TVector,TVector,TVector,TVector,]