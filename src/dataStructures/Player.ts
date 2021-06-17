import { isPlayer } from "../hof/conditions.js"
import { Settings } from "../settings.js"
import GenericFactory from "./genericObject.js"

function collidableWith(obj: GameObject) {
  return obj.collidableWith === isPlayer
}

export default (): Player => {
  return {
    ...GenericFactory([Settings.GAME_WIDTH / 2, Settings.GAME_HEIGHT / 2], [0, 0], Settings.PLAYER_RADIUS, ObjectType.Player),
    rotation: 0,
    acceleration: 0,
    hasCollided: false,
    collidableWith,
  }
}