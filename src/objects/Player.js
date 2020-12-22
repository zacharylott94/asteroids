import Canvas from "./Canvas.js"
import GameObject from "./GameObject.js"
import Projectile from "./Projectile.js"
import Vector from "./Vector.js";

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
        this.rotation = 0
    }
    static create (position, velocity, radius) {
        return new Player(position, velocity, radius)
    }

    handleCollision(obj) {
        super.handleCollision(obj)
        if (obj.constructor.name === "Asteroid") this.delete()
    }

    fireProjectile() {
        new Projectile(this.position, Vector.fromDegreesAndMagnitude(this.rotation,1))
    }
}

export default Player