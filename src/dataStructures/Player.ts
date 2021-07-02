import { isAsteroid, isOre, isOwner } from "../hof/conditions.js"
import or from "../hof/or.js"
import { Settings } from "../settings.js"
import GenericFactory from "./genericObject.js"

const isCollidableWith = [
  isOwner(ObjectType.UFO),
  isAsteroid,
  isOre,
].reduce(or)

export default (): Player => {
  return {
    ...GenericFactory([Settings.GAME_WIDTH / 2, Settings.GAME_HEIGHT / 2], [0, 0], Settings.PLAYER_RADIUS, ObjectType.Player),
    rotation: 0,
    acceleration: 0,
    hasCollidedWith: [],
    isCollidableWith,
    angularVelocity: 0,
  }
}