let pressedCallbacks = {}
let releasedCallbacks = {}
const button = {
  fire: "Enter",
  left: "a",
  right: "d",
  accelerate: "w",
  reset: "o",
  pause: "p"
}
Object.freeze(button)

class Controller {
  static registerCallback(button, callbackPressed, callbackReleased){
    //Make sure Sets are Initialized
    if (pressedCallbacks[button]?.constructor.name != "Set")
      pressedCallbacks[button] = new Set([callbackPressed])

    if (releasedCallbacks[button]?.constructor.name != "Set" )
      releasedCallbacks[button] = new Set([callbackReleased])

    //If functions were passed, register them
    if (typeof callbackPressed == "function")
      pressedCallbacks[button].add(callbackPressed)

    if (typeof callbackReleased == "function")
      releasedCallbacks[button].add(callbackReleased)

  }
  static unregisterCallback(button, callbackPressed, callbackReleased){
    pressedCallbacks[button].constructor.name === "Set" ? pressedCallbacks[button].delete(callbackPressed): false
    releasedCallbacks[button].constructor.name === "Set" ? releasedCallbacks[button].delete(callbackReleased): false
  }
  static call(button, dict){
    dict[button]?.forEach?.((each)=> each())
  }
}
Controller.button = button

addEventListener("keydown",(e) =>{Controller.call(e.key,pressedCallbacks)})
addEventListener("keyup",(e) =>{Controller.call(e.key,releasedCallbacks)})

//tests
// Controller.registerCallback("Enter", ()=>{console.log("Pressed Enter")}, ()=>{console.log("Released Enter")})
// Controller.registerCallback("e", ()=>{console.log("Pressed E")}, ()=>{console.log("Released E")})

export default Controller