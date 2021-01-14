import Constrain from "./gameLogic/constrain.js"
import GRAPHICS from "./graphics.js"
import Player from "./objects/Player.js"
import hasCollided from "./gameLogic/hasCollided.js"
import ObjectPool from "./gameLogic/ObjectPool.js"
import Canvas from "./objects/Canvas.js"
import AsteroidSpawner from "./gameLogic/AsteroidSpawner.js"
import EventCoordinator from "./objects/EventCoordinator.js"
import Settings from "./gameLogic/Settings.js"
import HUD from "./objects/HUD.js"
import Controller from "./objects/Controller.js"
import Sound from "./gameLogic/Sound.js"

//---------------Initialize Game--------------------
let STATE = {
    timer: 0,
    difficulty: Settings.STARTING_DIFFICULTY,
    paused: false
}

let pauseSound = new Sound("/asteroids/src/sfx/pause.wav")

//The rendering loop here
const renderLoop = () => {
    GRAPHICS.clear()
    if (STATE.paused) {
        HUD.paused()
        return
    }
    ObjectPool.forEach(object => GRAPHICS.render (object))
    HUD.draw()
}

//Main game loop here
const physicsLoop = () => {
    if (STATE.paused) return
    let objectIterator = ObjectPool.values()
    let objects = new Array()
    for (const each of objectIterator){
        objects.push(each)
    }

    while (objects.length > 0) {
        let obj1 = objects.shift()
        obj1.update()
        Constrain.object(obj1, Canvas.width, Canvas.height)
        objects.forEach((obj2) => {
             if (hasCollided(obj1, obj2, Canvas.width, Canvas.height)){
                obj1.handleCollision?.(obj2)
                obj2.handleCollision?.(obj1)
             }
        })
    }
    if (STATE.timer % 100 === 0) AsteroidSpawner.workLoop(STATE.difficulty)
    STATE.timer++
}

EventCoordinator.registerCallback(EventCoordinator.event.ObjectDeleted, ([object]) => {
    if (object.constructor.name === "Asteroid"){
        STATE.difficulty+=Settings.DIFFICULTY_RAMPUP
        console.log(`difficulty is: ${STATE.difficulty}`)
    }
})
function resetGame() {
    STATE.difficulty = Settings.STARTING_DIFFICULTY
    ObjectPool.reset()
    HUD.reset()
    new Player()
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