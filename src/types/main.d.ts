interface ICircleRenderable extends IPosition, IRadius { }
interface ICollidable extends IPosition, IRadius {
  // type: !ObjectType.Particle
}

interface IRotatableRenderable extends IPosition, IRotation { }

interface IMoveable extends IVelocity, IPosition { }

interface IRotatableGeneric extends IRotation, IGeneric { }

type TRenderFunction<T> = (location: TVector, object: T) => void

interface IGeneric extends IMoveable, ITypeable, IDeleteable, IRadius { }

type Condition = (...args) => boolean
type Monoid<T> = (thing: T) => T
type Maybe<T> = T | void

type TVector = [number, number]
type TPosition = [TVector, TVector, TVector, TVector, TVector, TVector, TVector, TVector, TVector,]

type Degrees = number
