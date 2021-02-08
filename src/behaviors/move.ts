import { IPosition } from "../gameObjects/Position.js";
import Position from "../gameObjects/Position.js"
import { TVector } from "../gameObjects/Vector";

interface IVelocity {
  velocity: TVector
}
export default function (obj: IPosition & IVelocity): IPosition & IVelocity {
  let newPosition = Position.addVector(obj.position, obj.velocity) 
  let newObject: IPosition & IVelocity = {...obj,position:newPosition}
  return newObject
}