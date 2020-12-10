//creates a generic game object
import Vector from "./Vector.js"

class GameObject {
    constructor(position, velocity, draw, radius){
        this.position = position
        this.velocity = velocity
        this.draw = draw
        this.radius = radius
        this.collided = false
    }

    //Compatibility from when factory functions were being used to instantiate objects
    static create (position /*Vector*/, velocity /*Vector*/ , draw /*Function*/, radius /*Number*/) {
        const object = new GameObject(position, velocity, draw, radius)
        return object;
    }
    
    static move (obj) { 
        obj.position.x += obj.velocity.x
        obj.position.y += obj.velocity.y
    }
}


export default GameObject
