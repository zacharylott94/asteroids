import { Settings } from "../settings.js"
import { context } from "./canvas.js"


export default class Graphics {
  static rotate({ x, y }: TVector, rotation: Degrees) {
    context.translate(x, y)
    context.rotate(Math.PI * 2 / 360 * rotation)
    context.translate(-x, -y)
  }
  static clear() {
    context.fillRect(-10, -10, Settings.GAME_WIDTH + 15, Settings.GAME_HEIGHT + 15)
  }
}
