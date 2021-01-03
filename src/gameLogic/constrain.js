import Vector from "../objects/Vector.js"
//makes sure the object stays in the playing field

class Constrain {
    static object(object, width, height) {
        object.position = Constrain.vector(object.position, width, height)
    }

    static vector(vector, gameWidth, gameHeight) {

        let result = new Vector(vector.x,vector.y)
        if (vector.x > gameWidth) {                   //if object is past the right edge of the screen
            result.x = vector.x - gameWidth; //subtract the width of the screen to wrap it to the left
        }
        if (vector.y > gameHeight) {                   //if object is past the bottom edge of the screen
            result.y = vector.y - gameHeight; //subtract the height of the screen to wrap it to the top
        }
        if (vector.x < 0) {                           //if the object is past the left edge of the screen
            result.x = vector.x + gameWidth; //add the width of the screen to wrap it to the right
        }
        if (vector.y < 0) {                            //if the object is past the top of the screen
            result.y = vector.y + gameHeight; //add the height of the screen to wrap it to the bottom
        }
        return result
    }
}

export default Constrain