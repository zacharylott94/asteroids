import GameObject from "./objects/GameObject.js"
import Constrain from "./gameLogic/constrain.js"
import Vector from "./objects/Vector.js"
import GRAPHICS from "./graphics.js"
import Asteroid from "./objects/Asteroid.js"
import Player from "./objects/Player.js"
import hasCollided from "./gameLogic/hasCollided.js"
import ObjectPool from "./gameLogic/ObjectPool.js"
import Canvas from "./objects/Canvas.js"

//---------------Initialize Game--------------------
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
        obj1.update()
        Constrain.object(obj1, Canvas.width, Canvas.height)
        objects.forEach(([uuid, obj2]) => {
            let answer = hasCollided(obj1, obj2, Canvas.width, Canvas.height)
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


new Player(new Vector(Canvas.width/2,  Canvas.height/2),  Vector.fromDegreesAndMagnitude(0,0), playerRadius)
new Asteroid(new Vector(5,  5), Vector.fromDegreesAndMagnitude(45,   0),  largeRadius)
new Asteroid(new Vector(450,  5),  Vector.UP().scale(5),  largeRadius)
new Asteroid(new Vector(10,  300), Vector.fromDegreesAndMagnitude(10,   .2), mediumRadius)
new Asteroid(new Vector(200, 300), Vector.fromDegreesAndMagnitude(185, 1.5), mediumRadius)
new Asteroid(new Vector(150, 150), Vector.fromDegreesAndMagnitude(300,   1),  smallRadius)
new Asteroid(new Vector(10,   15),  Vector.fromDegreesAndMagnitude(34, 1.25),  smallRadius)


const GAME = {
  renderLoop,
  physicsLoop,
}
// Object.entries(ObjectPool.objects).forEach(([key,value]) => console.log(value))

export default GAME