import Graphics from "../engine/graphics.js"
import { context } from "../engine/canvas.js"

//Draws a diamond for the projectile
let projectileGraphic: TRenderFunction<IRotatableRenderable>
projectileGraphic = (location: TVector, object: IRotatableRenderable) => {
  let length = 4
  let width = 2
  const { x, y } = location
  context.save()
  Graphics.rotate(location, object.rotation)
  context.beginPath()
  context.moveTo(x, y + width)
  context.lineTo(x - length, y)
  context.lineTo(x, y - width)
  context.lineTo(x + length, y)
  context.lineTo(x, y + width)
  context.stroke()
  context.restore()
}

export default projectileGraphic
