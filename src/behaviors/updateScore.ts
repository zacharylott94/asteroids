import and from "../hof/and.js"
import { isAsteroid } from "../hof/conditionals.js"

const updateScore = objectList => score => score + objectList()
  .filter([
    isAsteroid,
    obj => obj.delete,
    obj => obj.size === 0,
  ].reduce(and))
  .length

export default updateScore
