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
    // Object.entries(ObjectPool.objects).forEach(([key,obj]) => {
    //     GRAPHICS.render  (obj)
    // })
    ObjectPool.forEach(object => GRAPHICS.render (object))
}

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
}



// Radius Constants
const largeRadius = 40
const mediumRadius = 25
const smallRadius = 16



new Player()
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