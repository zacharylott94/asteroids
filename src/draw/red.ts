import { Canvas } from "../engine/canvas.js"

export const red = draw => (...args) => {
  const ctx = Canvas.context
  ctx.save()
  ctx.strokeStyle = "red"
  draw(...args)
  ctx.restore()
}