import GRAPHICS from "../graphics.js"
import Canvas from "./Canvas.js"
import EventCoordinator from "./EventCoordinator.js"
class HUD {
  static draw() {
    GRAPHICS.drawText(`Score: ${HUD.score}`, Canvas.width/2, 10)
  }
  static tickScore() {
    HUD.score += 1
  }
  static reset() {
    HUD.score = 0
  }
  static paused() {
    GRAPHICS.drawText(`PAUSED`, Canvas.width/2, Canvas.height/2, {size: "2em"})
  }
}
HUD.score = 0
EventCoordinator.registerCallback(EventCoordinator.event.ObjectDeleted, HUD.tickScore)
// EventCoordinator.registerCallback(EventCoordinator.event.GameReset, HUD.reset)

export default HUD