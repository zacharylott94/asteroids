interface ICircleRenderable extends IPosition, IRadius { }
interface ICollidable extends IPosition, IRadius { }

interface IRotatableRenderable extends IPosition, IRotation { }

interface IMoveable extends IVelocity, IPosition { }

interface IAsteroid extends ICircleRenderable, IVelocity, ITypeable { }

interface IRotatableObject extends IRotatableRenderable, IVelocity, IRadius, ITypeable { }

type TRenderFunction<T> = (location: TVector, object: T) => void


type TVector = {
  x: number,
  y: number
}
type TPosition = [TVector, TVector, TVector, TVector, TVector, TVector, TVector, TVector, TVector,]

type Degrees = number