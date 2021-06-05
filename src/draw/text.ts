import { context } from "../engine/canvas.js"
import { canvasContextScope } from "./canvasContextScope.js"

const drawText = (locationFunction, textFunction) => {
  let color = "rgb(0,255,0)"
  let size = '1em'

  context.textAlign = "center"
  context.textBaseline = "top"
  context.font = `${size} sans-serif`
  context.fillStyle = color
  let [x, y] = locationFunction()
  context.fillText(textFunction(), x, y)


}


export default canvasContextScope(drawText)
