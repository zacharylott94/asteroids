import Canvas from "../objects/Canvas.js"
import Vector from "../objects/Vector.js"
//makes sure the object stays in the playing field
const object = (object) => {
    object.position = Constrain.vector(object.position)
};

const vector = (vector) => {
    let result = new Vector(vector.x,vector.y)
    if (vector.x > Canvas.width) {                   //if object is past the right edge of the screen
        result.x = vector.x - Canvas.width; //subtract the width of the screen to wrap it to the left
    }
    if (vector.y > Canvas.height) {                   //if object is past the bottom edge of the screen
        result.y = vector.y - Canvas.height; //subtract the height of the screen to wrap it to the top
    }
    if (vector.x < 0) {                           //if the object is past the left edge of the screen
        result.x = vector.x + Canvas.width; //add the width of the screen to wrap it to the right
    }
    if (vector.y < 0) {                            //if the object is past the top of the screen
        result.y = vector.y + Canvas.height; //add the height of the screen to wrap it to the bottom
    }
    return result
}
const Constrain = {
    object,
    vector
}

export default Constrain