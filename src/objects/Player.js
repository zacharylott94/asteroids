import Canvas from "./Canvas.js"
import GameObject from "./GameObject.js"
import Vector from "./vector/Vector.js";
import Controller from "./Controller.js"
import EventCoordinator from "./EventCoordinator.js";
import Settings from "../gameLogic/Settings.js"
import triangle from "../draw/Triangle.js";
import Sound from "../gameLogic/Sound.js";
import Position from "./vector/Position.js";
import ColliderComponent from "./components/colliderComponent.js"
import { canAccelerate } from "./behaviors/canAccelerate.js";
import { canRender } from "./canRender.js";
import { canFireProjectile } from "./behaviors/canFireProjectile.js";
import { canRotate } from "./behaviors/canRotate.js";
import { State } from "./State.js";
import ObjectList from "../gameLogic/ObjectList.js"
import { canMove } from "./behaviors/canMove.js"


class Player {
    handleCollision(obj) {
        if(!this.collider.collidedWith(obj)) return
        if (obj.constructor.name === "Asteroid") this.delete()
    }

}
const destructionSound = new Sound("/asteroids/src/sfx/player_kill.wav")


const canDelete = (player, playerData) => {
    const deleteThis =  _ => {
        Controller.unregisterCallback(Controller.button.accelerate, playerData.state.accelerating.on, playerData.state.accelerating.off)
        Controller.unregisterCallback(Controller.button.left, playerData.state.rotatingLeft.on, playerData.state.rotatingLeft.off)
        Controller.unregisterCallback(Controller.button.right, playerData.state.rotatingRight.on, playerData.state.rotatingRight.off)
        Controller.unregisterCallback(Controller.button.fire, playerData.state.firing.on, playerData.state.firing.off)
        EventCoordinator.unregisterCallback(EventCoordinator.event.ProjectileDeleted, player.decrementActiveProjectiles)
        destructionSound.play()
        ObjectList.delete(player)
    }

    return {delete:deleteThis}
}
const canUpdate = (object, objectData) => {
    const update = _ => {
        object.move()
        if (objectData.state.accelerating.get()) object.accelerate()
        if (objectData.state.rotatingRight.get()) object.rotate(Settings.ROTATION_RATE)
        if (objectData.state.rotatingLeft.get()) object.rotate(-Settings.ROTATION_RATE)
        if (objectData.state.firing.get() && !objectData.state.fired.get()){
            objectData.state.fired.on()
            object.fireProjectile()
        } else if (!objectData.state.firing.get()) {
            objectData.state.fired.off()
        }    
    }
    return {update}
}

const registerController = playerData => {
    const accelerating = playerData.state.accelerating
    const rotatingLeft = playerData.state.rotatingLeft
    const rotatingRight = playerData.state.rotatingRight
    const firing = playerData.state.firing
    Controller.registerCallback(Controller.button.accelerate, accelerating.on, accelerating.off)
    Controller.registerCallback(Controller.button.left, rotatingLeft.on, rotatingLeft.off)
    Controller.registerCallback(Controller.button.right, rotatingRight.on, rotatingRight.off)
    Controller.registerCallback(Controller.button.fire, firing.on, firing.off)
}

const registerEvents = player => {
    EventCoordinator.registerCallback(EventCoordinator.event.ProjectileDeleted, player.decrementActiveProjectiles)
}

const playerFactory = (position = new Position(Canvas.width/2, Canvas.height/2), velocity = new Vector(), radius = Settings.PLAYER_RADIUS) => {
    if (position.constructor.name !== 'Position') throw TypeError('position is not an instance of class Vector')
        if (velocity.constructor.name !== 'Vector') throw TypeError('velocity is not an instance of class Vector')
        if (typeof radius !== 'number' || Number.isNaN(radius)) throw TypeError('radius is not of type Number')

        let playerData = {
            position,
            velocity,
            radius,
            rotation: 0,
            impulse: Settings.IMPULSE,
            state: {
                accelerating:  State(),
                rotatingLeft:  State(),
                rotatingRight: State(),
                fired:         State(),
                firing:        State(),
            },
            collider: "Broken",
            activeProjectiles: new Set(),
        }

        let player = {}
        Object.assign(
            player,
            canAccelerate(playerData),
            canRotate(playerData),
            canFireProjectile(playerData),
            canRender(playerData, triangle),
            canMove(playerData),
            canUpdate(player, playerData),
            canDelete(player, playerData),
        )
        registerController(playerData)
        registerEvents(player)
        ObjectList.add(player)
        
        const handleCollision = (obj) => {
            if(!this.collider.collidedWith(obj)) return
            if (obj.constructor.name === "Asteroid") this.delete()
        }

        return player
}

export default playerFactory