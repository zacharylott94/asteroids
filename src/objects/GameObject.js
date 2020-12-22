//creates a generic game object

import ObjectPool from "../gameLogic/ObjectPool.js"

class GameObject {
    constructor(position, velocity, draw, radius){
        if (position.constructor.name !== 'Vector') throw TypeError('position is not an instance of class Vector')
        if (velocity.constructor.name !== 'Vector') throw TypeError('velocity is not an instance of class Vector')
        if (typeof draw !== 'function') throw TypeError('draw is not a function')
        if (typeof radius !== 'number' || Number.isNaN(radius)) throw TypeError('radius is not of type Number')
        this.position = position
        this.velocity = velocity
        this.draw = draw
        this.radius = radius
        this.collided = false
        ObjectPool.add(this)
    }

    //Compatibility from when factory functions were being used to instantiate objects
    static create (position /*Vector*/, velocity /*Vector*/ , draw /*Function*/, radius /*Number*/) {
        const object = new GameObject(position, velocity, draw, radius)
        return object;
    }
    
    move () { 
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

    delete() {
        ObjectPool.remove(this)
    }
    }
}


export default GameObject
