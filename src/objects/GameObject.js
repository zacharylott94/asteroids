//creates a generic game object

import ObjectList from "../gameLogic/ObjectList.js"
import Circle from "../draw/Circle.js"
import RenderComponent from "./components/renderComponent.js"
import Position from "./vector/Position.js"

class GameObject {
    constructor(position, velocity, radius){
        if (position.constructor.name !== 'Position') throw TypeError('position is not an instance of class Vector')
        if (velocity.constructor.name !== 'Vector') throw TypeError('velocity is not an instance of class Vector')
        if (typeof radius !== 'number' || Number.isNaN(radius)) throw TypeError('radius is not of type Number')
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.renderComponent = new RenderComponent(Circle, this)
        ObjectList.add(this)
    }
    move () { 
        this.position = Position.add(this.position, this.velocity)
        
    }

    delete() {
        ObjectList.delete(this)
    }

    handleCollision(obj) {
        throw("This method must be overridden.")
    }

    update() {
        this.move()
    }
}


export default GameObject
