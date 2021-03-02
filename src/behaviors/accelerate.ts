import Vector from "../dataStructures/Vector.js"

export default function (obj: IVelocity & IAcceleration): void {
  obj.velocity = Vector.add(obj.velocity, obj.acceleration)

}