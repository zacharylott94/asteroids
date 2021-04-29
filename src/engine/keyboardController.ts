const heldButtons = {}
const flipflops = {}
const Controller = {
  isButtonPushed(button) {
    if (heldButtons[button] && !flipflops[button]) {
      flipflops[button] = true
      return true
    }
    return false
  },
  isButtonHeld(button) {
    return heldButtons[button]
  }

}


addEventListener("keypress", (e) => { heldButtons[e.key] = true })
addEventListener("keyup", (e) => { heldButtons[e.key] = false; flipflops[e.key] = false })

export default Controller