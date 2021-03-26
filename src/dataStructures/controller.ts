import { getControllerMapping } from "../libraries/storage.js"
import { Settings } from "../settings.js"
let controls = getControllerMapping(Settings.CONTROLLER_ACTIONS)
console.log(controls)

let gamepad
addEventListener("gamepadconnected", (e: any) => gamepad = e.gamepad)

function pollGamepad() {
  let pressed = []
  for (let each of controls) {

  }
  return pressed
}