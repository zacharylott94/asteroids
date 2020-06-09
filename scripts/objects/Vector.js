let create = (degrees,magnitude) => {
  let angle = Math.PI * 2 / 360 * degrees
  let x = Math.cos(angle)
  let y = Math.sin(angle)
  return {
      x,
      y,
      magnitude
  }
}

let getRadians = (vector) => {
  return Math.asin(vector.y)
}

let getDegrees = (vector) => {
  let rad = getRadians(vector)
  let deg = rad * 360 / 2 / Math.PI
  return deg
}


let distanceSquared = (vector1, vector2) => {
  let dx = vector2.x - vector1.x
  let dy = vector2.y - vector1.y
  dx *= dx
  dy *= dy
  let sum = dx + dy
  return sum
}

let distance = (vector1, vector2) => {
  return Math.sqrt(distanceSquared(vector1, vector2))
}

let add = (vec, vec2) => {
  return {x:vec.x + vec2.x, y:vec.y + vec2.y}
}
let multiply = (vec, ...sca) => {
  sca = sca.reduce((acc, next) => {return acc * next})
  return {x:vec.x*sca, y:vec.y*sca}
}

const Vector = {
  create,
  getDegrees,
  distanceSquared,
  distance,
  add,
  multiply,
}
export default Vector