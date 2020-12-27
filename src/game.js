import Constrain from "./gameLogic/constrain.js"
import GRAPHICS from "./graphics.js"
import Player from "./objects/Player.js"
import hasCollided from "./gameLogic/hasCollided.js"
import ObjectPool from "./gameLogic/ObjectPool.js"
import Canvas from "./objects/Canvas.js"
import AsteroidSpawner from "./gameLogic/AsteroidSpawner.js"
import EventCoordinator from "./objects/EventCoordinator.js"

//---------------Initialize Game--------------------
let difficulty = 1
const DIFFICULTY_RAMPUP = .01

//The main game loop should happen in here
const renderLoop = () => {
    GRAPHICS.clear()
    ObjectPool.forEach(object => GRAPHICS.render (object))
}
let timer = 0
const physicsLoop = () => {
    let objectIterator = ObjectPool.values()
    let objects = []
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
    if (timer % 100 === 0) AsteroidSpawner.workLoop(difficulty)
    timer++
}

EventCoordinator.registerCallback(EventCoordinator.event.ObjectDeleted, ([object]) => {
    if (object.constructor.name === "Asteroid"){
        difficulty+=DIFFICULTY_RAMPUP
        console.log(`difficulty is: ${difficulty}`)
    }
})







new Player()
const GAME = {
  renderLoop,
  physicsLoop,
}
// Object.entries(ObjectPool.objects).forEach(([key,value]) => console.log(value))

export default GAME