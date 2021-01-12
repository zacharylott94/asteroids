//creates a generic game object

import ObjectPool from "../gameLogic/ObjectPool.js"
import GRAPHICS from "../graphics.js"
import Circle from "./Circle.js"

class GameObject {
    constructor(position, velocity, radius){
        if (position.constructor.name !== 'Vector') throw TypeError('position is not an instance of class Vector')
        if (velocity.constructor.name !== 'Vector') throw TypeError('velocity is not an instance of class Vector')
        if (typeof radius !== 'number' || Number.isNaN(radius)) throw TypeError('radius is not of type Number')
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.draw = GameObject.draw
        // this.collided = false
        ObjectPool.add(this)
    }
    move () { 
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

    delete() {
        ObjectPool.delete(this)
    }

    handleCollision(obj) {
        // console.log(`Collided with: ${obj.constructor.name}`)
    }

    update() {
        this.move()
    }

    static draw(position = this.position) {
        GRAPHICS.runDraw(() => Circle(position, this.radius))
    }
}


export default GameObject
