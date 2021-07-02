interface ICircleRenderable extends IRadius { }
interface IRotatableRenderable extends IPosition, IRotation { }

interface ICollidable extends IPosition, IRadius {
  hasCollidedWith: ObjectType[],
  isCollidableWith: collisionMask
}

type collisionMask = (obj: GameObject) => boolean


interface IMoveable extends IVelocity, IPosition { }

interface IRotatableGeneric extends IRotation, IGeneric { }

interface IDurability { durability: number }


interface IGeneric extends IMoveable, ITypeable, IDeleteable, IRadius { }

type RenderFunction<T> = (location: TVector, object: T) => void
type Condition = (...args) => boolean
type Monoid<T> = (thing: T) => T

type TVector = [number, number]
type TPosition = [TVector, TVector, TVector, TVector, TVector, TVector, TVector, TVector, TVector,]

type Asteroid = IGeneric & ICollidable & IDurability & { size: number }
type Player = ICollidable & IGeneric & IAcceleration & IRotation
type Projectile = IRotatableGeneric & ICollidable & ITimeToLive & { owner: ObjectType }
type Ore = ICollidable & IGeneric
type Particle = (time: number) => TVector
type GameObject = Player | Projectile | Asteroid | Ore

type Degrees = number

type Stator<T> = (monoid?: Monoid<T>) => T

interface HumanInterface {
  fire: Function,
  accelerate: Function,
  rotateCounterclockwise: Function,
  rotateClockwise: Function,
  pause: Function,
  reset: Function
}

type GameState = {
  timer: Stator<number>,
  paused: Stator<boolean>,
  particleList: Stator<Particle[]>,
  objectList: Stator<GameObject[]>,
  score: Stator<number>,
  ore: Stator<number>,
}
