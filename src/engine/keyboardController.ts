const heldButtons: Record<string, boolean> = {}
const flipflops: Record<string, boolean> = {}
const Controller = {
  isButtonPushed(button: string): boolean {
    if (heldButtons[button] && !flipflops[button]) {
      flipflops[button] = true
      return true
    }
    return false
  },
  isButtonHeld(button: string): boolean {
    return heldButtons[button]
  }
}

addEventListener("keypress", (e) => { heldButtons[e.key] = true })
addEventListener("keyup", (e) => { heldButtons[e.key] = false; flipflops[e.key] = false })

export default Controller