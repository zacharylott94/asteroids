import wrapVector from "../vector/wrapVector.js"
import addVector from "./addVector.js"
import specificPositionVector from "./specificPositionVector.js"


export default (offsets, Settings, realPositionIndex) => (position: TPosition): TPosition => {
  const realPosition = specificPositionVector(realPositionIndex)(position)
  const gameSize = <TVector>[Settings.GAME_WIDTH, Settings.GAME_HEIGHT]
  let resultVector: TVector = wrapVector(gameSize, realPosition)
  return addVector(offsets, resultVector)
}

