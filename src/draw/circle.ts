import { context } from "../engine/canvas.js"

export const circle: TRenderFunction<ICircleRenderable> = ([x, y]: TVector, object: ICircleRenderable) => {
  context.moveTo(x, y)
  context.beginPath()
  context.arc(x, y, object.radius, 0, 2 * Math.PI)
  context.stroke()
}

