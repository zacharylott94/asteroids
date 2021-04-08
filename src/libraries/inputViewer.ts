///@ts-nocheck
import { Settings } from "../settings.js"

let gamepad
//@ts-ignore
addEventListener("gamepadconnected", (e) => gamepad = e.gamepad)
setInterval(() => populateHTML(gamepad), 10)
//@ts-ignore
document.addEventListener("DOMContentLoaded", () => { document.getElementById("action")?.innerHTML = controlOptions() })


function populateHTML(gamepad) {
  if (gamepad === undefined) return
  let controlHTML = document.getElementById('controls')
  //@ts-ignore
  controlHTML?.innerHTML = `
  ${iterateControls(gamepad)}
  `
}

function iterateControls(gamepad) {
  let output = '<h2>Buttons</h2>'
  for (let [key, value] of Object.entries(gamepad.buttons))
    output += `<h3>${key}</h3> <div>${value.pressed}</div> `
  output += '<h2>Axes</h2>'
  for (let [key, value] of Object.entries(gamepad.axes))
    output += `<h3>${key}</h3> <div>${value}</div>`
  return output
}


function controlOptions() {
  let output = ''
  for (let each of Object.keys(Settings.CONTROLLER_ACTIONS))
    output += `<option value="${each}">${each}</option>`
  return output
}