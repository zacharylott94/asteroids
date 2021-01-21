import Canvas from "./Canvas.js"
import GameObject from "./GameObject.js"
import Projectile from "./Projectile.js"
import Vector from "./vector/Vector.js";
import Controller from "./Controller.js"
import EventCoordinator from "./EventCoordinator.js";
import Settings from "../gameLogic/Settings.js"
import triangle from "../draw/Triangle.js";
import Sound from "../gameLogic/Sound.js";
import RenderComponent from "./components/renderComponent.js";
import Position from "./vector/Position.js";
import ColliderComponent from "./components/colliderComponent.js"

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
    constructor(position = new Position(Canvas.width/2, Canvas.height/2), velocity = new Vector(), radius = Settings.PLAYER_RADIUS) {
        super(position, velocity, radius)
        this.rotation = 0
        this.impulse = Settings.IMPULSE
        this.state = {
            accelerating:  new State,
            rotatingLeft:  new State,
            rotatingRight: new State,
            fired:         new State,
            firing:        new State
        }
        this.collider = new ColliderComponent(this)
        this.activeProjectiles = new Set()
        this.decrementActiveProjectiles = Player.decrementActiveProjectiles.bind(this)
        this.renderComponent = new RenderComponent(triangle, this)

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
            EventCoordinator.registerCallback(EventCoordinator.event.ProjectileDeleted, this.decrementActiveProjectiles)
        }
        Object.assign(this, canAccelerate(this), canRotate(this))


    }

    handleCollision(obj) {
        if(!this.collider.collidedWith(obj)) return
        if (obj.constructor.name === "Asteroid") this.delete()
    }

    fireProjectile() {
        if (this.activeProjectiles.size < 3) {
            this.activeProjectiles.add(new Projectile(this.position, Vector.fromDegreesAndMagnitude(this.rotation,1)))
        }
    }

    update() {
        super.update()
        if (this.state.accelerating.get()) this.accelerate()
        if (this.state.rotatingRight.get()) this.rotate(Settings.ROTATION_RATE)
        if (this.state.rotatingLeft.get()) this.rotate(-Settings.ROTATION_RATE)
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
        EventCoordinator.unregisterCallback(EventCoordinator.event.ProjectileDeleted, this.decrementActiveProjectiles)
        Player.destructionSound.play()
        super.delete()
    }

    //must be explicitly bound to objects
    static decrementActiveProjectiles ([projectile]) {
        this.activeProjectiles.delete(projectile)
    }

    static destructionSound = new Sound("/asteroids/src/sfx/player_kill.wav")
}

const canAccelerate = (object) =>  {
    const accelerate = () => object.velocity = Vector.add(object.velocity,Vector.fromDegreesAndMagnitude(object.rotation, object.impulse))
    return {accelerate}
}

const canRotate = (object) => {
    const rotate = (angle) => {
        object.rotation+=angle
    }
    return {rotate}
}

const playerFactory = () => new Player

export default playerFactory