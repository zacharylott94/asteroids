import Vector from "../Vector.js"

export default function addVector(position: TPosition, vector: TVector): TPosition {
  let newPosition: TPosition = [
    ...position
  ]
  newPosition = <TPosition>newPosition.map(each => Vector.add(each, vector))
  return newPosition
}