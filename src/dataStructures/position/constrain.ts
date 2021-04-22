import addVector from "./addVector.js"
import specificPositionVector from "./specificPositionVector.js"


export default (offsets, Settings, realPositionIndex) => (position: TPosition): TPosition => {
  const realPosition = specificPositionVector(realPositionIndex)(position)
  const resultVector: TVector = { ...realPosition }
  if (realPosition.x > Settings.GAME_WIDTH) {                   //if object is past the right edge of the screen
    resultVector.x = realPosition.x - Settings.GAME_WIDTH //subtract the width of the screen to wrap it to the left
  }
  if (realPosition.y > Settings.GAME_HEIGHT) {                   //if object is past the bottom edge of the screen
    resultVector.y = realPosition.y - Settings.GAME_HEIGHT //subtract the height of the screen to wrap it to the top
  }
  if (realPosition.x < 0) {                           //if the object is past the left edge of the screen
    resultVector.x = realPosition.x + Settings.GAME_WIDTH //add the width of the screen to wrap it to the right
  }
  if (realPosition.y < 0) {                            //if the object is past the top of the screen
    resultVector.y = realPosition.y + Settings.GAME_HEIGHT //add the height of the screen to wrap it to the bottom
  }
  return addVector(offsets, resultVector)
}

