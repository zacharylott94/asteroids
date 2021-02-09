import { Settings } from "../settings.js"

const element:any = document.getElementById("canvas")
element.width = Settings.GAME_WIDTH
element.height = Settings.GAME_HEIGHT
export let context = element.getContext("2d")
context.translate(0.5, 0.5)            //an attempt to remove anti-aliasing
context.imageSmoothingEnabled = false  //an attempt to remove anti-aliasing
context.fillColor = "black"
context.strokeStyle = "rgb(0,255,0)"
export const Canvas = {
  context
}
