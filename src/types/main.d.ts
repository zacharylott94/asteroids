interface ICircleRenderable extends IPosition, IRadius { }
interface ICollidable extends IPosition, IRadius { }

interface IRotatableRenderable extends IPosition, IRotation { }

interface IMoveable extends IVelocity, IPosition { }

interface IAsteroid extends ICircleRenderable, IVelocity { }

interface IRotatableObject extends IRotatableRenderable, IVelocity, IRadius { }

type TRenderFunction<T> = (location: TVector, object: T) => void


type TVector = {
  x: number,
  y: number
}
type TPosition = [TVector, TVector, TVector, TVector, TVector, TVector, TVector, TVector, TVector,]

type Degrees = number