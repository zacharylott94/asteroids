import Position from "../gameObjects/Position.js";
import { IVelocity, IPosition } from "../interfaces.js";


export default function (obj: IPosition & IVelocity): IPosition & IVelocity {
  let newPosition = Position.addVector(obj.position, obj.velocity) 
  let newObject: IPosition & IVelocity = {...obj,position:newPosition}
  return newObject
}