import fif from "../../hof/fif"
import identity from "../../hof/identity"
import text from "../text"

export const pausedTextSetup = (width, height, paused) => {
  return fif(
    paused,
    () => text(() => [width / 2, height / 2], () => 'PAUSED', { size: '2em' }),
    identity
  )
}