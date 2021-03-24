import Vector from "../dataStructures/Vector.js"

export default function <T>(obj: T & IVelocity & IAcceleration): T & IVelocity & IAcceleration {
  return { ...obj, velocity: Vector.add(obj.velocity, obj.acceleration) }
}