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
GAME.CreateObject = (x, y, vector, image) => { 
    const object = {
        x     : x,        //x position
        y     : y,        //y position
        vector: vector,   //velocity vector
        image : image     //rendering image
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
    obj.x = obj.x + obj.vector.x
    obj.y = obj.y + obj.vector.y
}



//---------------Main--------------------

let canvas = document.getElementById("canvas")  //grab our canvas
let ctx    = canvas.getContext("2d")            // create a context for it

//bind canvas dimensions to the context for convenience
ctx.width  = canvas.width
ctx.height = canvas.height

ctx = GRAPHICS.style(ctx)                    //Set our fill and stroke styles
const render = GRAPHICS.CreateRenderer(ctx)  //create a render function with a context bound to it

//stock images
const largeAsteroid  = GRAPHICS.createCircleImage(40, GRAPHICS.style)
const mediumAsteroid = GRAPHICS.createCircleImage(20, GRAPHICS.style)
const smallAsteroid  = GRAPHICS.createCircleImage(10, GRAPHICS.style)
const player    = GRAPHICS.createPlayerImage(GRAPHICS.style)

//array of objects
let objects = []
objects.push(GAME.CreateObject(10,  15,  {x:1,y:2.5}, largeAsteroid))
objects.push(GAME.CreateObject(125, 15,  {x:-1,y:2},  largeAsteroid))
objects.push(GAME.CreateObject(10,  200, {x:2.5,y:1}, mediumAsteroid))
objects.push(GAME.CreateObject(200, 300, {x:-2,y:.5}, mediumAsteroid))
objects.push(GAME.CreateObject(150, 150, {x:.5,y:.5}, smallAsteroid))
objects.push(GAME.CreateObject(10,  15,  {x:-.5,y:1}, smallAsteroid))
objects.push(GAME.CreateObject(ctx.width/2,  ctx.height/2,  {x:0,y:0}, player))



//Main game loop
setInterval(() => {
    GRAPHICS.clear(ctx)
    objects.map(  (object) => {
        GAME.move      (object)
        GAME.constrain (object)
        render    (object)
    })
},1000/60)
