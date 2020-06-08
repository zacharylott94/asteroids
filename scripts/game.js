import GameObject from "./objects/GameObject.js"
import constrain from "./gameLogic/constrain.js"
import Vector from "./objects/Vector.js"
import GRAPHICS from "./graphics.js"

//---------------Initialize Game--------------------

let canvas = document.getElementById("canvas")  //grab our canvas
let ctx    = canvas.getContext("2d")            // create a context for it

//bind canvas dimensions to the context for convenience
ctx.width  = canvas.width
ctx.height = canvas.height

ctx = GRAPHICS.style(ctx)                    //Set our fill and stroke styles
const render = GRAPHICS.CreateRenderer(ctx)  //create a render function with a context bound to it

// Radius Constants
const largeRadius = 40
const mediumRadius = 25
const smallRadius = 16
const playerRadius = 5


//stock images
const largeAsteroidImage  = GRAPHICS.createCircleImage(largeRadius, GRAPHICS.style)
const mediumAsteroidImage = GRAPHICS.createCircleImage(mediumRadius, GRAPHICS.style)
const smallAsteroidImage  = GRAPHICS.createCircleImage(smallRadius, GRAPHICS.style)
const playerImage    = GRAPHICS.createPlayerImage(GRAPHICS.style)

//array of objects
let objects = []
objects.push(GameObject.create(10,  150,  Vector.create(45, .1), largeAsteroidImage, largeRadius))
objects.push(GameObject.create(125, 15,  Vector.create(270, .9),  largeAsteroidImage, largeRadius))
objects.push(GameObject.create(10,  300, Vector.create(10, .2), mediumAsteroidImage, mediumRadius))
objects.push(GameObject.create(200, 300, Vector.create(185, 1.5), mediumAsteroidImage, mediumRadius))
objects.push(GameObject.create(150, 150, Vector.create(300, 1), smallAsteroidImage, smallRadius))
objects.push(GameObject.create(10,  15,  Vector.create(34, 1.25), smallAsteroidImage, smallRadius))
objects.push(GameObject.create(ctx.width/2,  ctx.height/2,  Vector.create(0,0), playerImage, playerRadius))




//The main game loop should happen in here
let loop = () => {
    GRAPHICS.clear(ctx)
    objects.map((obj) => {
        GameObject.move  (obj)
        constrain        (obj,ctx)
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