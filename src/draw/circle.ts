import { context } from "../engine/canvas.js"

const circle: TRenderFunction<ICircleRenderable> = (location: TVector, object: ICircleRenderable) => {
  context.save()
  context.moveTo(location.x, location.y)
  context.beginPath()
  context.arc(location.x, location.y, object.radius, 0, 2 * Math.PI)
  context.stroke()
  context.restore()
}


export default circle