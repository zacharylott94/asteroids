import GameObject from "./objects/GameObject.js"
import constrain from "./gameLogic/constrain.js"
import Vector from "./objects/Vector.js"
import GRAPHICS from "./graphics.js"

//---------------Initialize Game--------------------



const render = GRAPHICS.CreateRenderer()  //create a render function with a context bound to it
const canvas = document.getElementById("canvas")


// Radius Constants
const largeRadius = 40
const mediumRadius = 25
const smallRadius = 16
const playerRadius = 6



//stock images
const largeAsteroidImage  = GRAPHICS.createCircleImage(largeRadius)
const mediumAsteroidImage = GRAPHICS.createCircleImage(mediumRadius)
const smallAsteroidImage  = GRAPHICS.createCircleImage(smallRadius)
const playerImage    = GRAPHICS.createPlayerImage()

//array of objects
let objects = []
objects.push(GameObject.create(10,  150,  Vector.create(45, .1), largeAsteroidImage, largeRadius))
objects.push(GameObject.create(125, 15,  Vector.create(270, .9),  largeAsteroidImage, largeRadius))
objects.push(GameObject.create(10,  300, Vector.create(10, .2), mediumAsteroidImage, mediumRadius))
objects.push(GameObject.create(200, 300, Vector.create(185, 1.5), mediumAsteroidImage, mediumRadius))
objects.push(GameObject.create(150, 150, Vector.create(300, 1), smallAsteroidImage, smallRadius))
objects.push(GameObject.create(10,  15,  Vector.create(34, 1.25), smallAsteroidImage, smallRadius))
objects.push(GameObject.create(canvas.width/2,  canvas.height/2,  Vector.create(0,0), playerImage, playerRadius))




//The main game loop should happen in here
let loop = () => {
    GRAPHICS.clear()
    objects.map((obj) => {
        GameObject.move  (obj)
        constrain        (obj)
        render           (obj)
    })
}

let hash = (thing) => {
    thing = JSON.stringify(thing)
    thing = thing.split("")
    thing = thing.map((x) => x.charCodeAt(0))
    let sum = thing.reduce((acc, cur) => (cur * acc) - (cur + acc))
    return sum % 181
}

const GAME = {
  loop
}

export default GAME