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

type TMoveable = IVelocity & IPosition

type TVector = {
  x:number,
  y:number
}
type TPosition = [TVector,TVector,TVector,TVector,TVector,TVector,TVector,TVector,TVector,]