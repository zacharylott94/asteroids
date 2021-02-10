import { context } from "../engine/canvas.js";

//strokes a circle

  function circle(location: TVector, object:any): void {
    context.save()
    context.moveTo(location.x, location.y)
    context.beginPath();
    context.arc(location.x,location.y, object.radius, 0, 2 * Math.PI)
    context.stroke()
    context.restore()
  }




export default circle