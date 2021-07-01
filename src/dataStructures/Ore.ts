import { isPlayer } from "../hof/conditions.js"
import GenericFactory from "./genericObject.js"
const radius = 3

const Ore = (location, velocity): Ore => ({
  ...GenericFactory(location, velocity, radius, ObjectType.Ore),
  hasCollided: false,
  isCollidableWith: isPlayer
})

export default Ore