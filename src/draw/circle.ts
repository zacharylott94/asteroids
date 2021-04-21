import { context } from "../engine/canvas.js"

export const circle: TRenderFunction<ICircleRenderable> = (location: TVector, object: ICircleRenderable) => {
  context.moveTo(location.x, location.y)
  context.beginPath()
  context.arc(location.x, location.y, object.radius, 0, 2 * Math.PI)
  context.stroke()
}

