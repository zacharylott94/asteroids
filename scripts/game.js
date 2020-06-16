import GameObject from "./objects/GameObject.js"
import Constrain from "./gameLogic/constrain.js"
import Vector from "./objects/Vector.js"
import GRAPHICS from "./graphics.js"
import Event from "./gameLogic/Event.js"
import Asteroid from "./objects/Asteroid.js"
import Player from "./objects/Player.js"
import hasCollided from "./gameLogic/hasCollided.js"
import ObjectPool from "./gameLogic/ObjectPool.js"

//---------------Initialize Game--------------------

const canvas = document.getElementById("canvas")
//array of objects

//The main game loop should happen in here
const renderLoop = () => {
    GRAPHICS.clear()
    Object.entries(ObjectPool.objects).forEach(([key,obj]) => {
        GRAPHICS.render  (obj)
    })
}

const physicsLoop = () => {
    let objects = Object.entries(ObjectPool.objects)
    while (objects.length > 0) {
        let obj1 = objects.shift()[1]
        GameObject.move (obj1)
        Constrain.object(obj1)
        objects.forEach(([uuid, obj2]) => {
            let answer = hasCollided(obj1, obj2)
            obj1.collided = answer? 3: obj1.collided
            obj2.collided = answer? 3: obj2.collided
        })
        obj1.collided -= 1
    }
}



// Radius Constants
const largeRadius = 40
const mediumRadius = 25
const smallRadius = 16
const playerRadius = 6


const player = Player.create(Vector.create(canvas.width/2,  canvas.height/2),  Vector.createDM(0,0), playerRadius)
ObjectPool.add(Asteroid.create(Vector.create(5,  5), Vector.createDM(45,   0),  largeRadius))
ObjectPool.add(Asteroid.create(Vector.create(450,  5),  Vector.createDM(270,  .75),  largeRadius))
ObjectPool.add(Asteroid.create(Vector.create(10,  300), Vector.createDM(10,   .2), mediumRadius))
ObjectPool.add(Asteroid.create(Vector.create(200, 300), Vector.createDM(185, 1.5), mediumRadius))
ObjectPool.add(Asteroid.create(Vector.create(150, 150), Vector.createDM(300,   1),  smallRadius))
ObjectPool.add(Asteroid.create(Vector.create(10,   15),  Vector.createDM(34, 1.25),  smallRadius))
ObjectPool.add(player)


const GAME = {
  renderLoop,
  physicsLoop,
}
// Object.entries(ObjectPool.objects).forEach(([key,value]) => console.log(value))

export default GAME