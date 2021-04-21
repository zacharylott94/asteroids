import { context } from "../engine/canvas.js"

export const rotate = ({ x, y }: TVector, rotation: Degrees) => {
  context.translate(x, y)
  context.rotate(Math.PI * 2 / 360 * rotation)
  context.translate(-x, -y)
}