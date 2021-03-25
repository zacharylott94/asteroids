import Position from "./Position.js"


export default function GenericFactory(location: TVector, velocity: TVector, radius: number, type = ObjectType.Generic): IGeneric {
  return {
    position: Position.fromVector(location),
    radius,
    velocity,
    type: type,
    delete: false,
  }
}