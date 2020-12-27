import Canvas from "./Canvas.js"
import GameObject from "./GameObject.js"
import Projectile from "./Projectile.js"
import Vector from "./Vector.js";
import Controller from "./Controller.js"
import EventCoordinator from "./EventCoordinator.js";

const playerRadius = 6
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

const IMPULSE = .01
const ROTATION_RATE = 2

class Player extends GameObject {
    constructor(position = new Vector(Canvas.width/2, Canvas.height/2), velocity = new Vector(), radius = playerRadius) {
        let boundDraw = (position, ...trash) =>{
            draw(position, this.rotation)
        }
        super(position, velocity, boundDraw, radius)
        this.rotation = 0
        this.impulse = IMPULSE
        this.accelerating = false
        this.rotating = 0
        this.fired = false
        this.firing = false
        this.activeMissiles = 0

        Controller.registerCallback(Controller.button.accelerate, this.acceleratePressed.bind(this), this.accelerateReleased.bind(this))
        Controller.registerCallback(Controller.button.left, this.rotateLeftPressed.bind(this), this.rotateReleased.bind(this))
        Controller.registerCallback(Controller.button.right, this.rotateRightPressed.bind(this), this.rotateReleased.bind(this))
        Controller.registerCallback(Controller.button.fire, this.firePressed.bind(this), this.fireReleased.bind(this))
        EventCoordinator.registerCallback(EventCoordinator.event.MissileDeleted, this.decrementActiveMissile.bind(this))

    }
    static create (position, velocity, radius) {
        return new Player(position, velocity, radius)
    }

    handleCollision(obj) {
        super.handleCollision(obj)
        if (obj.constructor.name === "Asteroid") this.delete()
    }

    fireProjectile() {
        if (this.activeMissiles < 3) {
            new Projectile(this.position, Vector.fromDegreesAndMagnitude(this.rotation,1))
            this.activeMissiles++
        }
    }

    update() {
        super.update()
        // this.rotate(1)
        if (this.accelerating) this.accelerate()
        if (this.rotating == 1) this.rotate(ROTATION_RATE)
        if (this.rotating == -1) this.rotate(-ROTATION_RATE)
        if (this.firing && !this.fired){
            this.fired = true
            this.fireProjectile()
        } else if (!this.firing) {
            this.fired = false
        }

        
    }
    delete () {
        Controller.unregisterCallback("w", this.acceleratePressed, this.accelerateReleased)
        Controller.unregisterCallback("a", this.rotateLeftPressed.bind(this), this.rotateReleased.bind(this))
        Controller.unregisterCallback("d", this.rotateRightPressed.bind(this), this.rotateReleased.bind(this))
        Controller.unregisterCallback("Enter", this.firePressed.bind(this), this.fireReleased.bind(this))
        super.delete()
    }

    accelerate() {
        this.velocity = Vector.add(this.velocity,Vector.fromDegreesAndMagnitude(this.rotation, this.impulse))
    }

    rotate(angle) {
        this.rotation+=angle
    }

    acceleratePressed() {
        this.accelerating = true
    }
    accelerateReleased() {
        this.accelerating = false
    }
    rotateLeftPressed() {
        this.rotating = -1
    }
    rotateRightPressed() {
        this.rotating = 1
    }
    rotateReleased() {
        this.rotating = 0
    }
    firePressed() {
        this.firing = true
    }
    fireReleased() {
        this.firing = false
    }
    decrementActiveMissile () {
        this.activeMissiles--
    }
}

export default Player