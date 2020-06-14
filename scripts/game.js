import GameObject from "./objects/GameObject.js"
import constrain from "./gameLogic/constrain.js"
import Vector from "./objects/Vector.js"
import GRAPHICS from "./graphics.js"
import Event from "./gameLogic/Event.js"
import Asteroid from "./objects/Asteroid.js"
import Player from "./objects/Player.js"

//---------------Initialize Game--------------------

const canvas = document.getElementById("canvas")


// Radius Constants
const largeRadius = 40
const mediumRadius = 25
const smallRadius = 16
const playerRadius = 6

const collisionCallback = (obj1, obj2) => {
    console.log(`${obj1} has collided with ${obj2}`)
}
Event.register("collision", collisionCallback)


//array of objects
let objects = []
objects.push(Asteroid.create(Vector.create(10,  150), Vector.createDM(45,   1),  largeRadius))
objects.push(Asteroid.create(Vector.create(125,  15),  Vector.createDM(270,  .9),  largeRadius))
objects.push(Asteroid.create(Vector.create(10,  300), Vector.createDM(10,   .2), mediumRadius))
objects.push(Asteroid.create(Vector.create(200, 300), Vector.createDM(185, 1.5), mediumRadius))
objects.push(Asteroid.create(Vector.create(150, 150), Vector.createDM(300,   1),  smallRadius))
objects.push(Asteroid.create(Vector.create(10,   15),  Vector.createDM(34, 1.25),  smallRadius))
objects.push(Player.create(Vector.create(canvas.width/2,  canvas.height/2),  Vector.createDM(0,0), playerRadius))

// 


//The main game loop should happen in here
const renderLoop = () => {
    GRAPHICS.clear()
    objects.map((obj) => {
        GRAPHICS.render  (obj)
    })
}

const physicsLoop = () => {
    objects.map((obj) => {
        GameObject.move  (obj)
        constrain        (obj)
        objects.map((obj2) => {
            GameObject.hasCollided(obj, obj2)? Event.call(Event.collision, obj, obj2): false
        })
    })
}


const GAME = {
  renderLoop,
  physicsLoop
}

export default GAME