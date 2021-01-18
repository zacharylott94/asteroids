import Vector from "./Vector.js"
import Canvas from "../Canvas.js"

class Position extends Vector {

  static add(vec1, vec2) {
    let result = Vector.add(vec1, vec2)
    result = Position.constrain(result)
    return result
  }  
  static subtract(vec1, vec2) {
    let result = Vector.subtract(vec1, vec2)
    result = Position.constrain(result)
    return result
  }
  static constrain(pos) {
    let result = new Position(pos.x,pos.y)
    if (pos.x > Canvas.width) {                   //if object is past the right edge of the screen
        result.x = pos.x - Canvas.width; //subtract the width of the screen to wrap it to the left
    }
    if (pos.y > Canvas.height) {                   //if object is past the bottom edge of the screen
        result.y = pos.y - Canvas.height; //subtract the height of the screen to wrap it to the top
    }
    if (pos.x < 0) {                           //if the object is past the left edge of the screen
        result.x = pos.x + Canvas.width; //add the width of the screen to wrap it to the right
    }
    if (pos.y < 0) {                            //if the object is past the top of the screen
        result.y = pos.y + Canvas.height; //add the height of the screen to wrap it to the bottom
    }
    return result
  }
  scale(...scalars) {
    let result = this.scale(scalars)
    result = Position.constrain(result)
    return result
  }

}


export default Position