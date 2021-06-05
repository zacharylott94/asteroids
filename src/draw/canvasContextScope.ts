import { context } from "../engine/canvas.js"
export function canvasContextScope(func) {
  return function (...args) {
    context.save()
    func(...args)
    context.restore()
  }
}