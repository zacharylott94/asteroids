import Vector from "../Vector.js"

export default function closestTo(position: TPosition, point: TVector) {
  let closest = Vector.ZERO
  let closestDistance = Number.MAX_SAFE_INTEGER
  position.forEach(each => {
    const squaredDistance = Vector.distanceSquared(each, point)
    if (squaredDistance < closestDistance) {
      closestDistance = squaredDistance
      closest = each
    }
  })
  return closest
}