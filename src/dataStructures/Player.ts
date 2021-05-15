import { Settings } from "../settings.js"
import GenericFactory from "./genericObject.js"

export default (): Player => {
  return {
    ...GenericFactory([Settings.GAME_WIDTH / 2, Settings.GAME_HEIGHT / 2], [0, 0], Settings.PLAYER_RADIUS, ObjectType.Player),
    rotation: 0,
    acceleration: .02,
    hasCollided: false,
    accelerating: false,
  }
}