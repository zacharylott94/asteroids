import GRAPHICS from "./graphics.js"
import GAME from "./game.js"
import Vector from "./objects/Vector.js"
import GameObject from "./objects/GameObject.js"


//---------------Main--------------------

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



//Main game loop
setInterval(() => {
    GRAPHICS.clear(ctx)
        objects.map((obj) => {
            GameObject.move  (obj)
            GAME.constrain   (obj,ctx)
            render           (obj)
        })

},1000/60)
