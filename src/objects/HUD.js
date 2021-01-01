import Canvas from "./Canvas.js"

class HUD {
  static draw() {
    let ctx = Canvas.context
    ctx.save()
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.font = "1em sans-serif"
    ctx.fillStyle = "rgb(0,255,0"
    ctx.fillText(`Score: ${HUD.score}`,Canvas.width/2, 10)

    ctx.restore()
  }
}
HUD.score = 0


export default HUD