import { Settings } from "../settings.js"
import GenericFactory from "./genericObject.js"


export default function AsteroidFactory(location: TVector, velocity: TVector, radius: number): IGeneric {
  return GenericFactory(location, velocity, radius, ObjectType.Asteroid)
}


export function LargeAsteroidFactory(location: TVector, velocity: TVector): IGeneric {
  return AsteroidFactory(location, velocity, Settings.LARGE_ASTEROID_RADIUS)
}

export function MediumAsteroidFactory(location: TVector, velocity: TVector): IGeneric {
  return AsteroidFactory(location, velocity, Settings.MEDIUM_ASTEROID_RADIUS)
}

export function SmallAsteroidFactory(location: TVector, velocity: TVector): IGeneric {
  return AsteroidFactory(location, velocity, Settings.SMALL_ASTEROID_RADIUS)
}