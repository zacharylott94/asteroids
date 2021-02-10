import { Settings } from "../settings.js";
import { context } from "./canvas.js";


export default class Graphics {
  static renderObject(object: IRenderable):void{
    // let image = object.render(object)
    object.position.forEach((eachPosition: TVector ) => object.renderAt(eachPosition, object))

    // Everything below is for debugging
    // if (Settings.RENDER_DEBUG){
    //     Graphics.showCenter(object)
    //     Graphics.showVelocity(object)
    //     //Rotation Viewer Hack
    //     if(object.rotation != undefined) Graphics.drawRay(object.position, Vector.add(object.position, Vector.fromDegreesAndMagnitude(object.rotation, 20)), "aqua")
    // }
    object


  } 
  //rotates context at point and rotation
//   static rotate({x,y}, rotation) {
//       let ctx = Canvas.context
//       ctx.translate(x,y)
//       ctx.rotate(Math.PI * 2 / 360 * rotation)
//       ctx.translate(-x,-y)
//   }
  static clear() { 
    context.fillRect(-10, -10, Settings.GAME_WIDTH+15, Settings.GAME_HEIGHT+15)
  }
//   static showCenter(object) {
//       Graphics.drawCross(object.position, object.radius*2, "rgb(255,0,0)")
//   }
//   static showVelocity(object) {
//       Graphics.drawRay(object.position, Vector.add(object.position, object.velocity.scale(50)))
//   }
//   static drawCross(position, size, color) {
//       let ctx = Canvas.context
//       ctx.save()
//       ctx.fillStyle = color
//       ctx.fillRect(position.x-size/2,position.y,size,1)
//       ctx.fillRect(position.x,position.y-size/2,1,size)
//       ctx.restore()
//   }

//   static drawRay(start, end, color = "rgb(255,255,0)") {
//       let ctx = Canvas.context
//       ctx.save()
//       ctx.strokeStyle = color
//       ctx.beginPath()
//       ctx.moveTo(start.x, start.y)
//       ctx.lineTo(end.x, end.y)
//       ctx.stroke()
//       ctx.restore()
//   }

//   static drawText(text, x, y, {color = "rgb(0,255,0)", size = "1em"} = {}) {
//       let ctx = Canvas.context
//       ctx.save()
//       ctx.textAlign = "center"
//       ctx.textBaseline = "top"
//       ctx.font = `${size} sans-serif`
//       ctx.fillStyle = color
//       ctx.fillText(text,x,y)

//       ctx.restore()
//   }

}
