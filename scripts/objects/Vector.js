const createDM = (degrees,magnitude) => {
  const angle = Math.PI * 2 / 360 * degrees
  const x = Math.cos(angle)
  const y = Math.sin(angle)
  return {
      x:x * magnitude,
      y:y * magnitude
  }
}

const create = (x,y) => {
  return {
    x,
    y
  }
}

const getRadians = (vector) => {
  return Math.asin(normalize(vector).y)
}

const getDegrees = (vector) => {
  const rad = getRadians(vector)
  const deg = rad * 360 / 2 / Math.PI
  return deg
}


const distanceSquared = (vector1, vector2) => {
  let dx = vector2.x - vector1.x
  let dy = vector2.y - vector1.y
  dx *= dx
  dy *= dy
  const sum = dx + dy
  return sum
}

const distance = (vector1, vector2) => {
  return Math.sqrt(distanceSquared(vector1, vector2))
}

const add = (vec, vec2) => {
  return {x:vec.x + vec2.x, y:vec.y + vec2.y}
}
const multiply = (vec, ...sca) => {
  sca = sca.reduce((acc, next) => {return acc * next})
  return {x:vec.x*sca, y:vec.y*sca}
}

const magnitude = (vec) => {
  const x = vec.x
  const y = vec.y
  return Math.sqrt(x*x + y*y)
}

const normalize = (vec) => {
  return {x:vec.x/magnitude(vec) ,y:vec.y/magnitude(vec)}
}

const Vector = {
  createDM,
  create,
  getDegrees,
  distanceSquared,
  distance,
  add,
  multiply,
  magnitude,
  normalize
}
export default Vector