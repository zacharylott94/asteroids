import Canvas from "../Canvas.js"
import Vector from "../vector/Vector.js";
import Controller from "../Controller.js"
import EventCoordinator from "../EventCoordinator.js";
import Settings from "../../gameLogic/Settings.js"
import triangle from "../../draw/Triangle.js";
import Sound from "../../gameLogic/Sound.js";
import Position from "../vector/Position.js";
import { canAccelerate } from "../behaviors/canAccelerate.js";
import { canRender } from "../behaviors/canRender.js";
import { canFireProjectile } from "../behaviors/canFireProjectile.js";
import { canRotate } from "../behaviors/canRotate.js";
import { State } from "../State.js";
import ObjectList from "../../gameLogic/ObjectList.js"
import { canHandleCollision } from "../behaviors/canHandleCollision.js";
import { classGuard, typeofGuard } from "../../gameLogic/guards/Guard.js";
import { commonBehaviors } from "../behaviors/commonBehavior.js";
import { ParticleSpawnerBuilder } from "../ParticleSpawner.js";

const destructionSound = Sound("/asteroids/src/sfx/player_kill.wav")


const canDelete = (player) => {
    const deleteThis =  _ => {
        Controller.unregisterCallback(Controller.button.accelerate, player.state.accelerating.on, player.state.accelerating.off)
        Controller.unregisterCallback(Controller.button.left, player.state.rotatingLeft.on, player.state.rotatingLeft.off)
        Controller.unregisterCallback(Controller.button.right, player.state.rotatingRight.on, player.state.rotatingRight.off)
        Controller.unregisterCallback(Controller.button.fire, player.state.firing.on, player.state.firing.off)
        EventCoordinator.unregisterCallback(EventCoordinator.event.ProjectileDeleted, player.decrementActiveProjectiles)
        // player.particleSpawner.emit(player.position)
        destructionSound.play()
        ObjectList.delete(player)
    }

    player.delete = deleteThis
}

const handleDeathParticles = player => {
    const deathParticles = obj => {
        let vectorBetween = Vector.subtract(player.position, obj.position)
        let angle = vectorBetween.degrees()
        let particleSpawner = ParticleSpawnerBuilder()
            .atAngle(angle)
            .withSpread(45)
            .withPosition(player.position)
            .build()
        particleSpawner.emit()
    }
    player.deathParticles = deathParticles
}
const playerUpdate = (player) => {
    const update = _ => {
        // player.move()
        if (player.state.accelerating.get()) player.accelerate()
        if (player.state.rotatingRight.get()) player.rotate(Settings.ROTATION_RATE)
        if (player.state.rotatingLeft.get()) player.rotate(-Settings.ROTATION_RATE)
        if (player.state.firing.get() && !player.state.fired.get()){
            player.state.fired.on()
            player.fireProjectile()
        } else if (!player.state.firing.get()) {
            player.state.fired.off()
        }    
    }
    player.updateCallbacks.push(update)
    // return {update}
}
const canCollide = player => {
    const onCollide = obj => {
        if (obj.type === "Asteroid") {
            player.deathParticles(obj)
            player.delete()
        }
    }
    player.onCollide = onCollide
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
    EventCoordinator.registerCallback(EventCoordinator.event.ObjectDeleted, player.decrementActiveProjectiles)
}

const Player = (position = new Position(Canvas.width/2, Canvas.height/2), velocity = new Vector(), radius = Settings.PLAYER_RADIUS) => {
    classGuard(position, "Position")
    classGuard(velocity, "Vector")
    typeofGuard(radius, 'number')

    let player = {
        type: "Player",
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
        activeProjectiles: new Set(),
        updateCallbacks: [],
    }

    //compose player object via mutation functions
    commonBehaviors(player)
    playerUpdate(player)
    canAccelerate(player)
    canRotate(player)
    canFireProjectile(player)
    canRender(player, triangle)
    canHandleCollision(player)
    canCollide(player)
    canDelete(player)
    handleDeathParticles(player)
    
    registerController(player)
    registerEvents(player)
    ObjectList.add(player)

    return player
}

export default Player