import Canvas from "../objects/Canvas.js"
//makes sure the object stays in the playing field
const constrain = (object) => {
    if (object.position.x > Canvas.width) {                   //if object is past the right edge of the screen
        object.position.x = object.position.x - Canvas.width; //subtract the width of the screen to wrap it to the left
    }
    if (object.position.y > Canvas.height) {                   //if object is past the bottom edge of the screen
        object.position.y = object.position.y - Canvas.height; //subtract the height of the screen to wrap it to the top
    }
    if (object.position.x < 0) {                           //if the object is past the left edge of the screen
        object.position.x = object.position.x + Canvas.width; //add the width of the screen to wrap it to the right
    }
    if (object.position.y < 0) {                            //if the object is past the top of the screen
        object.position.y = object.position.y + Canvas.height; //add the height of the screen to wrap it to the bottom
    }
};

export default constrain