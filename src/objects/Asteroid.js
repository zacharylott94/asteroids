import GameObject from "./GameObject.js"
import Circle from "./Circle.js"
import Event from "../gameLogic/Event.js"

const create = (position, velocity, radius, color) => {
  const draw = Circle
  const asteroid = GameObject.create(position, velocity, draw, radius)
  return asteroid
}

const Asteroid = {
  create,
}

export default Asteroid