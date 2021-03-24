import Position from "../dataStructures/Position.js"

export default function <T>(obj: T & IMoveable): T {
  return { ...obj, position: Position.constrain(Position.addVector(obj.position, obj.velocity)) }
}