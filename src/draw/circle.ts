import { context } from "../engine/canvas.js"

export const circle: RenderFunction<ICircleRenderable> = ([x, y]: TVector, object: ICircleRenderable) => {
  context.moveTo(x, y)
  context.beginPath()
  context.arc(x, y, object.radius, 0, 2 * Math.PI)
  context.stroke()
}

export const unitCircle = (vec: TVector) => circle(vec, { radius: 1 })
