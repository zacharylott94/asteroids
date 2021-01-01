import Canvas from "./Canvas.js"
import GameObject from "./GameObject.js"
import Projectile from "./Projectile.js"
import Vector from "./Vector.js";
import Controller from "./Controller.js"
import EventCoordinator from "./EventCoordinator.js";

//Draws a triangle for the player.
const draw = (position, rotation) => {
    const ctx = Canvas.context
    const {x,y} = position
    ctx.save()
    ctx.translate(x,y)
    ctx.rotate(Math.PI * 2 / 360 * rotation)
    ctx.translate(-x,-y)
    ctx.beginPath();
    ctx.moveTo(x-4, y+7);
    ctx.lineTo(x-4, y-7);
    ctx.lineTo(x+10, y);
    ctx.lineTo(x-4, y+7);
    ctx.stroke();
    ctx.restore()
};

const PLAYER_RADIUS = 6
const IMPULSE = .01
const ROTATION_RATE = 2

class State {
    constructor(defaultState = false) {
        this.state = defaultState
        this.get = State.get.bind(this)
        this.off = State.off.bind(this)
        this.on = State.on.bind(this)
    }
    static get() {
        return this.state
    }
    static off() {
        this.state = false
    }
    static on() {
        this.state = true
    }
}

class Player extends GameObject {
    constructor(position = new Vector(Canvas.width/2, Canvas.height/2), velocity = new Vector(), radius = PLAYER_RADIUS) {
        let boundDraw = (position, ...trash) =>{
            draw(position, this.rotation)
        }
        super(position, velocity, boundDraw, radius)
        this.rotation = 0
        this.impulse = IMPULSE
        this.state = {
            accelerating:  new State,
            rotatingLeft:  new State,
            rotatingRight: new State,
            fired:         new State,
            firing:        new State
        }
        this.activeMissiles = new Set()
        this.decrementActiveMissile = Player.decrementActiveMissile.bind(this)

        {   //I did this so that the below lines wouldn't be insanely long due to long-winded property indexing
            //I.E. this.state.accelerating.on.bind(this.state.accelerating)
            const accelerating = this.state.accelerating
            const rotatingLeft = this.state.rotatingLeft
            const rotatingRight = this.state.rotatingRight
            const firing = this.state.firing
            Controller.registerCallback(Controller.button.accelerate, accelerating.on, accelerating.off)
            Controller.registerCallback(Controller.button.left, rotatingLeft.on, rotatingLeft.off)
            Controller.registerCallback(Controller.button.right, rotatingRight.on, rotatingRight.off)
            Controller.registerCallback(Controller.button.fire, firing.on, firing.off)
            EventCoordinator.registerCallback(EventCoordinator.event.ProjectileDeleted, this.decrementActiveMissile)
        }


    }

    handleCollision(obj) {
        super.handleCollision(obj)
        if (obj.constructor.name === "Asteroid") this.delete()
    }

    fireProjectile() {
        if (this.activeMissiles.size < 3) {
            this.activeMissiles.add(new Projectile(this.position, Vector.fromDegreesAndMagnitude(this.rotation,1)))
        }
    }

    update() {
        super.update()
        if (this.state.accelerating.get()) this.accelerate()
        if (this.state.rotatingRight.get()) this.rotate(ROTATION_RATE)
        if (this.state.rotatingLeft.get()) this.rotate(-ROTATION_RATE)
        if (this.state.firing.get() && !this.state.fired.get()){
            this.state.fired.on()
            this.fireProjectile()
        } else if (!this.state.firing.get()) {
            this.state.fired.off()
        }

        
    }
    delete () {
        Controller.unregisterCallback(Controller.button.accelerate, this.state.accelerating.on, this.state.accelerating.off)
        Controller.unregisterCallback(Controller.button.left, this.state.rotatingLeft.on, this.state.rotatingLeft.off)
        Controller.unregisterCallback(Controller.button.right, this.state.rotatingRight.on, this.state.rotatingRight.off)
        Controller.unregisterCallback(Controller.button.fire, this.state.firing.on, this.state.firing.off)
        EventCoordinator.unregisterCallback(EventCoordinator.event.ProjectileDeleted, this.decrementActiveMissile)
        super.delete()
    }

    accelerate() {
        this.velocity = Vector.add(this.velocity,Vector.fromDegreesAndMagnitude(this.rotation, this.impulse))
    }

    rotate(angle) {
        this.rotation+=angle
    }

    //must be explicitly bound to objects
    static decrementActiveMissile ([projectile]) {
        this.activeMissiles.delete(projectile)
    }
}

export default Player