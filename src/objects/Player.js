import Canvas from "./Canvas.js"
import GameObject from "./GameObject.js"

//Draws a triangle for the player. Will eventually need rotation
const draw = (position, ...trash) => {
    let ctx = Canvas.context
    let origin = position
    ctx.beginPath();
    ctx.moveTo(origin.x-7, origin.y+7);
    ctx.lineTo(origin.x, origin.y-7);
    ctx.lineTo(origin.x+7, origin.y+7);
    ctx.lineTo(origin.x-7, origin.y+7);
    ctx.stroke();
};

class Player extends GameObject {
    constructor(position, velocity, radius) {
        super(position, velocity, draw, radius)
    }
    static create (position, velocity, radius) {
        return new Player(position, velocity, radius)
    }

    handleCollision(obj) {
    // if (obj.constructor.name === 'Asteroid')
        console.log('Hit Asteroid')
    }
}

export default Player