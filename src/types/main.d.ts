interface ICircleRenderable extends IPosition, IRadius { }
interface IRotatableRenderable extends IPosition, IRotation { }

interface ICollidable extends IPosition, IRadius {
  hasCollided: Boolean
}


interface IMoveable extends IVelocity, IPosition { }

interface IRotatableGeneric extends IRotation, IGeneric { }


interface IGeneric extends IMoveable, ITypeable, IDeleteable, IRadius { }

type RenderFunction<T> = (location: TVector, object: T) => void
type Condition = (...args) => boolean
type Monoid<T> = (thing: T) => T

type TVector = [number, number]
type TPosition = [TVector, TVector, TVector, TVector, TVector, TVector, TVector, TVector, TVector,]

type Asteroid = IGeneric & ICollidable
type Player = ICollidable & IGeneric & IAcceleration & IRotation
type Projectile = IRotatableGeneric & ICollidable & ITimeToLive
type Particle = IGeneric & ITimeToLive

type Degrees = number
