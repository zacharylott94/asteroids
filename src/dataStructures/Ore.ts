import { isPlayer } from "../hof/conditions.js"
import GenericFactory from "./genericObject.js"
const radius = 3

const Ore = (location, velocity): Ore => ({
  ...GenericFactory(location, velocity, radius, ObjectType.Ore),
  hasCollidedWith: [],
  isCollidableWith: isPlayer,
  rotation: 0,
  angularVelocity: 2
})

export default Ore