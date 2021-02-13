import Position from "../dataStructures/Position.js";

export default function (obj: TMoveable): TMoveable {
  let newPosition = Position.constrain(Position.addVector(obj.position, obj.velocity) )
  let newObject: TMoveable = {...obj,position:newPosition}
  return newObject
}