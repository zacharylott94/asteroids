import GRAPHICS from "./graphics.js"
import Player from "./objects/gameObjects/Player.js"
import ObjectList from "./gameLogic/ObjectList.js"
import AsteroidSpawner from "./gameLogic/AsteroidSpawner.js"
import EventCoordinator from "./objects/EventCoordinator.js"
import Settings from "./gameLogic/Settings.js"
import HUD from "./objects/HUD.js"
import Controller from "./objects/Controller.js"
import Sound from "./gameLogic/Sound.js"
import { Particle } from "./objects/Particle.js"
import Vector from "./objects/vector/Vector.js"
import Position from "./objects/vector/Position.js"

//---------------Initialize Game--------------------
let STATE = {
    timer: 0,
    difficulty: Settings.STARTING_DIFFICULTY,
    paused: false
}

let pauseSound = Sound("/asteroids/src/sfx/pause.wav")

// EventCoordinator.registerCallback(EventCoordinator.event.ObjectDeleted, ([args]) => {console.log(`${args.type} was deleted`)})

//The rendering loop here
const renderLoop = () => {
    GRAPHICS.clear()
    if (STATE.paused) {
        HUD.paused()
        return
    }
    ObjectList.forEach(object => GRAPHICS.render (object))
    HUD.draw()
}

//Main game loop here
const physicsLoop = () => {
    if (STATE.paused) return
    let objectIterator = ObjectList.values()
    let objects = new Array()
    for (const each of objectIterator){
        objects.push(each)
    }
    objects.forEach(obj => obj.update())

    objects.forEach((obj1) => {
        objects.forEach((obj2) => {
            obj1.handleCollision?.(obj2)
        })
    })
    
    if (STATE.timer % 100 === 0) AsteroidSpawner.workLoop(STATE.difficulty)
    STATE.timer++
}

EventCoordinator.registerCallback(EventCoordinator.event.ObjectDeleted, ([object]) => {
    if (object.type === "Asteroid"){
        STATE.difficulty+=Settings.DIFFICULTY_RAMPUP
        console.log(`difficulty is: ${STATE.difficulty}`)
    }
})
function resetGame() {
    STATE.difficulty = Settings.STARTING_DIFFICULTY
    ObjectList.reset()
    HUD.reset()
    Player()
    Particle(new Position(10,10), new Vector(1,1))
    STATE.timer = 0
    STATE.paused = false
}

function togglePause() {
    pauseSound.play()
    STATE.paused = !STATE.paused
}







resetGame()
// unpauseGame()
setInterval(renderLoop, 1000/Settings.FRAMERATE)
setInterval(physicsLoop, 1000/Settings.PHYSICS_FRAMERATE)
Controller.registerCallback(Controller.button.reset, resetGame)
Controller.registerCallback(Controller.button.pause, togglePause)
// EventCoordinator.registerCallback(EventCoordinator.event.GameReset, resetGame)
let GAME = {}
export default GAME