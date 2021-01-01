import Canvas from "./Canvas.js"
import EventCoordinator from "./EventCoordinator.js"
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
  static tickScore() {
    HUD.score += 1
  }
}
HUD.score = 0
EventCoordinator.registerCallback(EventCoordinator.event.ObjectDeleted, HUD.tickScore)

export default HUD