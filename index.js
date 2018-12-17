const GRAPHICS = {}

//binds a context to a function so that it can draw objects in that context
GRAPHICS.CreateRenderer = (ctx) => { 
    return (object) => {
        ctx.drawImage(object.image, object.x, object.y) //draw the object at its position

        //draw clones in a box around the object to make screen wrapping appear seamless
        ctx.drawImage(object.image, object.x + ctx.width, object.y)               //right clone
        ctx.drawImage(object.image, object.x, object.y + ctx.height)              //bottom clone
        ctx.drawImage(object.image, object.x - ctx.width, object.y)               //left clone
        ctx.drawImage(object.image, object.x, object.y - ctx.height)              //top clone
        ctx.drawImage(object.image, object.x + ctx.width, object.y + ctx.height)  //bottom-right clone
        ctx.drawImage(object.image, object.x - ctx.width, object.y + ctx.height)  //bottom-left clone
        ctx.drawImage(object.image, object.x + ctx.width, object.y - ctx.height)  //top-right clone
        ctx.drawImage(object.image, object.x - ctx.width, object.y - ctx.height)  //top-left clone
    }
}

//creates a circle image
GRAPHICS.createCircleImage = (radius, style) => {                 
    let padding = 5                                     //for padding the image canvas
    let circle  = document.createElement("canvas")      //instantiate a canvas object
    circle.width, circle.height = radius * 2 + padding  //give the canvas a width and height
    let ctx = circle.getContext("2d")                   //get a context for the circle canvas
    ctx = style(ctx)                                    //give it the global style
    
    //draw the circle
    ctx.beginPath()
    let xy = radius + padding / 2
    ctx.arc(xy, xy, radius, 0, 2 * Math.PI)
    ctx.stroke()
    
    return circle
}

GRAPHICS.createPlayerImage = (style) => {
    let player  = document.createElement("canvas")      //instantiate a canvas object
    player.width, player.height = 12                    //give the canvas a width and height
    let ctx = player.getContext("2d")                   //get a context for the circle canvas
    ctx = style(ctx)                                    //give it the global style

    //draw the player
    ctx.beginPath()
    ctx.moveTo(5,1)
    ctx.moveTo(6,1)
    ctx.lineTo(11,11)
    ctx.lineTo(1,11)
    ctx.lineTo(6,1)
    ctx.stroke()

    return player
}

//sets canvas fill and stroke styles
GRAPHICS.style = (ctx) => { 
    ctx.translate(0.5, 0.5)            //an attempt to remove anti-aliasing
    ctx.imageSmoothingEnabled = false  //an attempt to remove anti-aliasing
    ctx.fillStyle = "black"            //space is black
    ctx.strokeStyle = "rgb(0,255,0)"   //lines are green

    return ctx
}

//clears the context
GRAPHICS.clear = (ctx) => { 
    ctx.fillRect(0, 0, ctx.width, ctx.height)
}

const GAME = {}
//creates a generic game object
GAME.CreateObject = (x, y, vector, image, radius) => { 
    const object = {
        x,        //x position
        y,        //y position
        vector,   //velocity vector
        image,     //rendering image
        radius
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

GAME.VectorToDegrees = (vector) => {
    let rad = Math.asin(vector.y)
    let deg = rad * 360 / 2 / Math.PI
    return deg
}

GAME.distance = (x, y, x2, y2) => {
    let dx = x - x2
    let dy = y - y2
    dx *= dx
    dy *= dy
    let sum = dx + dy
    return Math.sqrt(sum)
}

GAME.collide = (obj, obj2) => {
    let x = obj.x + 2*(obj.vector.x * obj.vector.magnitude)
    let y = obj.y + 2*(obj.vector.y * obj.vector.magnitude)
    let x2 = obj2.x + 2*(obj2.vector.x * obj2.vector.magnitude)
    let y2 = obj2.y + 2*(obj2.vector.y * obj2.vector.magnitude)

    let distance = GAME.distance(x + obj.radius, y + obj.radius, x2 + obj2.radius, y2 + obj2.radius)
    if (distance <= obj.radius + obj2.radius) {
        return [true, obj, obj2]
    } else {
        return [false]
    }
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
    // console.log(objects[0].x, objects[0].y, objects[1].x, objects[1].y)
    // console.log(objects[0], objects[1])
    {
        let tail = objects.slice(1)
        for (let each of objects) {
            for (let other of tail) {
                let [result, obj, obj2] = GAME.collide(each, other)
                if (result) {
                    let vector = {x:obj2.x - obj.x, y:obj2.y - obj.y} // get our vector between objects
                    let distance = GAME.distance(obj.x, obj.y, obj2.x, obj2.y) //get the distance between objects
                    let normalVector = {x:vector.x/distance, y:vector.y/distance} //normalize the vector
                    let angle = GAME.VectorToDegrees(normalVector) //get angle between objects
                    // let radii = obj.radius + obj2.radius //sum of radii for minimum distance between objects
                    // obj2.x = obj.x + (normalVector.x * radii) 
                    // obj2.y = obj.y + (normalVector.y * radii)
                    // obj.x = obj2.x + (normalVector.x * radii) 
                    // obj.y = obj2.y + (normalVector.y * radii)

                    let deg1 = GAME.VectorToDegrees(obj.vector)
                    let deg2 = GAME.VectorToDegrees(obj2.vector)
                    let angleSum = (deg1 + deg2) / 2
                    let objMag = obj.vector.magnitude
                    obj.vector = GAME.Vector(-angle, obj2.vector.magnitude)
                    obj2.vector = GAME.Vector(angle, objMag)
                    console.log("collision")
                }
            }

            GAME.move      (each)
            GAME.constrain (each)
            render    (each)
            tail = tail.slice(1)
        }
        
    }
    //console.log(objects.length)



    // objects.map(  (object) => {

    //     GAME.move      (object)
    //     GAME.constrain (object)
    //     render    (object)
    // })
},1000/60)
