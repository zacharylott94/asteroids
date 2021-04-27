import Vector from "../../dataStructures/vector/Vector.js"

export default function <T>(obj: T & IVelocity & IAcceleration & IRotation): T & IVelocity & IAcceleration & IRotation {
  return { ...obj, velocity: Vector.add(obj.velocity, Vector.fromDegreesAndMagnitude(obj.rotation, obj.acceleration)) }
}