import Position from "../dataStructures/Position.js"

export default function <T>(obj: T & IMoveable): T {
  let newPosition = Position.constrain(Position.addVector(obj.position, obj.velocity))
  let newObject: T = { ...obj, position: newPosition }
  return newObject
}