import GameObject from "./objects/GameObject.js"
import constrain from "./gameLogic/constrain.js"
import Vector from "./objects/Vector.js"
import GRAPHICS from "./graphics.js"

//---------------Initialize Game--------------------

const canvas = document.getElementById("canvas")


// Radius Constants
const largeRadius = 40
const mediumRadius = 25
const smallRadius = 16
const playerRadius = 6



//stock images
const largeAsteroidImage  = GRAPHICS.Circle(largeRadius)
const mediumAsteroidImage = GRAPHICS.Circle(mediumRadius)
const smallAsteroidImage  = GRAPHICS.Circle(smallRadius)
const playerImage    = GRAPHICS.Player()

//array of objects
let objects = []
objects.push(GameObject.create({x:10,  y:150}, Vector.create(45,   .1), largeAsteroidImage,  largeRadius))
objects.push(GameObject.create({x:125, y:15},  Vector.create(270,  .9), largeAsteroidImage,  largeRadius))
objects.push(GameObject.create({x:10,  y:300}, Vector.create(10,   .2), mediumAsteroidImage, mediumRadius))
objects.push(GameObject.create({x:200, y:300}, Vector.create(185, 1.5), mediumAsteroidImage, mediumRadius))
objects.push(GameObject.create({x:150, y:150}, Vector.create(300,   1), smallAsteroidImage,  smallRadius))
objects.push(GameObject.create({x:10,  y:15},  Vector.create(34, 1.25), smallAsteroidImage,  smallRadius))
objects.push(GameObject.create({x:canvas.width/2,  y:canvas.height/2},  Vector.create(0,0),  playerImage, playerRadius))




//The main game loop should happen in here
let loop = () => {
    GRAPHICS.clear()
    objects.map((obj) => {
        GameObject.move  (obj)
        constrain        (obj)
        GRAPHICS.render  (obj)
        // objects.map((obj2) => {
        //     GameObject.hasCollided(obj, obj2)? console.log("collision"): false
        // })
    })
}



const GAME = {
  loop
}

export default GAME