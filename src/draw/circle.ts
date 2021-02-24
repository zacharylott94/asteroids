import { context } from "../engine/canvas.js"

//strokes a circle
let circle: TRenderFunction<ICircleRenderable>
circle = function (location: TVector, object: ICircleRenderable): void {
  context.save()
  context.moveTo(location.x, location.y)
  context.beginPath()
  context.arc(location.x, location.y, object.radius, 0, 2 * Math.PI)
  context.stroke()
  context.restore()
}




export default circle