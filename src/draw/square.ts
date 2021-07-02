import { context } from "../engine/canvas.js"
import { rotate } from "./rotate.js"

const sideLength = 4.5

const square = sideLength => (location, object) => {
  const [x, y] = location
  const halfSide = sideLength / 2
  rotate(location, object.rotation)
  context.beginPath()
  context.moveTo(x - halfSide, y - halfSide)
  context.lineTo(x + halfSide, y - halfSide)
  context.lineTo(x + halfSide, y + halfSide)
  context.lineTo(x - halfSide, y + halfSide)
  context.lineTo(x - halfSide, y - halfSide)
  context.stroke()

}


export default square(sideLength)