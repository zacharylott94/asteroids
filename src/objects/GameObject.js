//creates a generic game object

import ObjectPool from "../gameLogic/ObjectPool.js"
import Circle from "../draw/Circle.js"
import RenderComponent from "./components/renderComponent.js"

class GameObject {
    constructor(position, velocity, radius){
        if (position.constructor.name !== 'Vector') throw TypeError('position is not an instance of class Vector')
        if (velocity.constructor.name !== 'Vector') throw TypeError('velocity is not an instance of class Vector')
        if (typeof radius !== 'number' || Number.isNaN(radius)) throw TypeError('radius is not of type Number')
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.renderComponent = new RenderComponent(Circle, this)
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
}


export default GameObject
