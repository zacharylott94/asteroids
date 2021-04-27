let pressedCallbacks = {}
let releasedCallbacks = {}

class Controller {
  static registerCallback(button, callbackPressed, callbackReleased?) {
    //Make sure Sets are Initialized
    if (pressedCallbacks[button]?.constructor.name != "Set")
      pressedCallbacks[button] = new Set()

    if (releasedCallbacks[button]?.constructor.name != "Set")
      releasedCallbacks[button] = new Set()

    //If functions were passed, register them
    if (typeof callbackPressed === "function")
      pressedCallbacks[button].add(callbackPressed)

    if (typeof callbackReleased === "function")
      releasedCallbacks[button].add(callbackReleased)

  }
  static unregisterCallback(button, callbackPressed, callbackReleased) {
    pressedCallbacks[button].constructor.name === "Set" ? pressedCallbacks[button].delete(callbackPressed) : false
    releasedCallbacks[button].constructor.name === "Set" ? releasedCallbacks[button].delete(callbackReleased) : false
  }
  static call(button, dict) {
    dict[button]?.forEach?.((each) => each())
  }
  static heldButtons = {}
  static flipflops = {}

  static buttonPushed(button) {
    if (Controller.heldButtons[button] && !Controller.flipflops[button]) {
      Controller.flipflops[button] = true
      return true
    }
    return false
  }

}


// addEventListener("keydown", (e) => { Controller.call(e.key, pressedCallbacks) })
addEventListener("keypress", (e) => { Controller.heldButtons[e.key] = true })
addEventListener("keyup", (e) => { Controller.heldButtons[e.key] = false; Controller.flipflops[e.key] = false })

//tests
// Controller.registerCallback("Enter", () => { console.log("Pressed Enter") }, () => { console.log("Released Enter") })
// Controller.registerCallback("e", () => { console.log("Pressed E") }, () => { console.log("Released E") })

export default Controller