import { context } from "../engine/canvas.js"
type anyRenderable = IRotatableRenderable & ICircleRenderable
export function canvasContextScope(func: RenderFunction<anyRenderable>): RenderFunction<anyRenderable> {
  return function (location, object) {
    context.save()
    func(location, object)
    context.restore()
  }
}