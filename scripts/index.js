import GRAPHICS from "./graphics.js"

const GAME = {}
//creates a generic game object
GAME.CreateObject = (x, y, vector, image, radius) => { 
    const object = {
        x,        //x position
        y,        //y position
        vector,   //velocity vector
        image,     //rendering image
        radius,
        cooldown: 5
    }
    return object
}

//makes sure the object stays in the playing field
GAME.constrain = (object) => {  
    if (object.x > ctx.width){            //if object is past the right edge of the screen
        object.x = object.x - ctx.width   //subtract the width of the screen to wrap it to the left
    }
    if (object.y > ctx.height){           //if object is past the bottom edge of the screen
        object.y = object.y - ctx.height  //subtract the height of the screen to wrap it to the top
    }
    if (object.x < 0){                    //if the object is past the left edge of the screen
        object.x = object.x + ctx.width   //add the width of the screen to wrap it to the right
    }
    if (object.y < 0){                    //if the object is past the top of the screen
        object.y = object.y + ctx.height  //add the height of the screen to wrap it to the bottom
    }
}


//applies an object's vector to its position
GAME.move = (obj) => { 
    obj.x = obj.x + obj.vector.x * obj.vector.magnitude
    obj.y = obj.y + obj.vector.y * obj.vector.magnitude
}

//Takes an angle in degrees and creates a unit vector with a magnitude
GAME.Vector = (degrees,magnitude) => {
    let angle = Math.PI * 2 / 360 * degrees
    let x = Math.cos(angle)
    let y = Math.sin(angle)
    return {
        x,
        y,
        magnitude
    }
}

GAME.vectorToDegrees = (vector) => {
    let rad = Math.asin(vector.y)
    let deg = rad * 360 / 2 / Math.PI
    return deg
}

GAME.distanceSquared = (x, y, x2, y2) => {
    let dx = x2 - x
    let dy = y2 - y
    dx *= dx
    dy *= dy
    let sum = dx + dy
    return sum
}

GAME.collide = (obj, obj2) => {
    //hash the objects to see if they are the same object
    let hash1 = GAME.hash(obj)
    let hash2 = GAME.hash(obj2)
    if (hash1 === hash2) return false
    if (obj.cooldown > 0) return false
    if (obj2.cooldown > 0) return false

    // Get the two objects' positions two frames before the current
    // This is an attempt to prevent overlapping
    let x = obj.x + 2*(obj.vector.x * obj.vector.magnitude)
    let y = obj.y + 2*(obj.vector.y * obj.vector.magnitude)
    let x2 = obj2.x + 2*(obj2.vector.x * obj2.vector.magnitude)
    let y2 = obj2.y + 2*(obj2.vector.y * obj2.vector.magnitude)

    let distance = GAME.distanceSquared(x + obj.radius,    //Get Squared distance between objects, correcting for the center
                                 y + obj.radius,
                                 x2 + obj2.radius,
                                 y2 + obj2.radius)  
    let radii = obj.radius + obj2.radius
    radii *= radii
    if (distance <= radii) {     // If Squared distance is less than the squared sum of radii, the objects have "collided"
        obj.cooldown, obj2.cooldown = 5            //prevent objects from detecting collisions for five frames
        return true
    } else {
        return false
    }
}

GAME.hash = (thing) => {
    thing = JSON.stringify(thing)
    thing = thing.split("")
    thing = thing.map((x) => x.charCodeAt(0))
    let sum = thing.reduce((acc, cur) => (cur * acc) - (cur + acc))
    return sum % 181
}

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
objects.push(GAME.CreateObject(10,  150,  GAME.Vector(45, .1), largeAsteroidImage, largeRadius))
objects.push(GAME.CreateObject(125, 15,  GAME.Vector(270, .9),  largeAsteroidImage, largeRadius))
objects.push(GAME.CreateObject(10,  300, GAME.Vector(10, .2), mediumAsteroidImage, mediumRadius))
objects.push(GAME.CreateObject(200, 300, GAME.Vector(185, 1.5), mediumAsteroidImage, mediumRadius))
objects.push(GAME.CreateObject(150, 150, GAME.Vector(300, 1), smallAsteroidImage, smallRadius))
objects.push(GAME.CreateObject(10,  15,  GAME.Vector(34, 1.25), smallAsteroidImage, smallRadius))
objects.push(GAME.CreateObject(ctx.width/2,  ctx.height/2,  GAME.Vector(0,0), playerImage, playerRadius))



//Main game loop
setInterval(() => {
    GRAPHICS.clear(ctx)
        objects.map((obj) => {
            objects.map((obj2) => {
                let result = GAME.collide(obj, obj2)
                if (result) {
                    let vector = {x:obj2.x - obj.x, y:obj2.y - obj.y}              //get our vector between objects
                    let distance = GAME.distanceSquared(obj.x, obj.y, obj2.x, obj2.y)     //get the distance between objects
                    let normalVector = {x:vector.x/distance, y:vector.y/distance}  //normalize the vector
                    let angle = GAME.vectorToDegrees(normalVector)                 //get angle between objects


                    let objMag = obj.vector.magnitude                          //store one objects' velocity magnitude to switch them later
                    obj.vector = GAME.Vector(angle+180, obj2.vector.magnitude) //update velocity angle and switch magnitude
                    obj2.vector = GAME.Vector(angle, objMag)                   //update velocity angle and switch magnitude

                    console.log("collision")
                }
            })
            obj.cooldown -= 1
            GAME.move      (obj)
            GAME.constrain (obj)
            render    (obj)
        })

},1000/60)
