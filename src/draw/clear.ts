import { context } from "../engine/canvas.js"
import { Settings } from "../settings.js"

export const clear = () => {
  context.fillRect(-10, -10, Settings.GAME_WIDTH + 15, Settings.GAME_HEIGHT + 15)
}