import { Settings } from "../settings.js"

const element:any = document.getElementById("canvas")
element.width = Settings.GAME_WIDTH
element.height = Settings.GAME_HEIGHT
const context = element.getContext("2d")
export const Canvas = {
  context
}
