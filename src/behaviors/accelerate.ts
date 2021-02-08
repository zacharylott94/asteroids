import Vector from "../gameObjects/Vector.js";
import { IVelocity, IAcceleration } from "../interfaces.js";


export default function (obj: IVelocity & IAcceleration): IVelocity & IAcceleration {
  let newVelocity = Vector.add(obj.velocity, obj.acceleration)
  let newObject: IVelocity & IAcceleration = {...obj,velocity:newVelocity}
  return newObject
}