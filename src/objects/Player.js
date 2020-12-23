import Canvas from "./Canvas.js"
import GameObject from "./GameObject.js"
import Projectile from "./Projectile.js"
import Vector from "./Vector.js";

//Draws a triangle for the player. Will eventually need rotation
const draw = (position, rotation) => {
    let ctx = Canvas.context
    let center = {
        x: position.x,
        y: position.y
    }
    // center.y = center.y -3
    ctx.save()
    ctx.translate(position.x,position.y)
    ctx.rotate(Math.PI * 2 / 360 * rotation)
    ctx.translate(-position.x,-position.y)
    ctx.beginPath();
    ctx.moveTo(center.x-4, center.y+7);
    ctx.lineTo(center.x-4, center.y-7);
    ctx.lineTo(center.x+10, center.y);
    ctx.lineTo(center.x-4, center.y+7);
    ctx.stroke();
    ctx.restore()
};

class Player extends GameObject {
    constructor(position, velocity, radius) {
        let boundDraw = (position, ...trash) =>{
            draw(position, this.rotation)
        }
        super(position, velocity, boundDraw, radius)
        this.rotation = 0
    }
    static create (position, velocity, radius) {
        return new Player(position, velocity, radius)
    }

    handleCollision(obj) {
        super.handleCollision(obj)
        // if (obj.constructor.name === "Asteroid") this.delete()
    }

    fireProjectile() {
        new Projectile(this.position, Vector.fromDegreesAndMagnitude(this.rotation,1))
    }

    update() {
        super.update()
        this.rotation++
    }
}

export default Player