import { Canvas } from "../engine/canvas.js"

export const color = str => draw => (...args) => {
  const ctx = Canvas.context
  ctx.strokeStyle = str
  draw(...args)
}