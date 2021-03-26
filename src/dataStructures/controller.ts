import { getControllerMapping } from "../libraries/storage.js"
import { Settings } from "../settings.js"
let controls = getControllerMapping(Settings.CONTROLLER_ACTIONS)
console.log(controls)

let gamepad
addEventListener("gamepadconnected", (e: any) => gamepad = e.gamepad)

export function pollGamepad() {
  if (gamepad === undefined) return []
  let pressed: any[] = []
  for (let each of controls) {
    if (!each) continue
    // console.log(each)
    let action = each[0]
    let binding = each[1]
    if (!binding) continue
    let [type, index] = binding
    if (gamepad[type][index].value == 1) pressed.push(action)
  }
  // console.log(pressed)
  return pressed
}