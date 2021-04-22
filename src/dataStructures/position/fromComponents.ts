import Vector from "../Vector.js"
import addVector from "./addVector.js"

export default function fromComponents(offsets, x: number, y: number): TPosition {
  return addVector(offsets, Vector.fromComponents(x, y))
}