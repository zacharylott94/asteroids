//creates a generic game object

class GameObject {
    constructor(position, velocity, draw, radius){
        if (position.constructor.name !== 'Vector') throw TypeError('position was not an instance of class Vector')
        if (velocity.constructor.name !== 'Vector') throw TypeError('velocity was not an instance of class Vector')
        if (typeof draw !== 'function') throw TypeError('draw is not a function')
        if (typeof radius !== 'number' || Number.isNaN(radius)) throw TypeError('radius is not of type Number')
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
