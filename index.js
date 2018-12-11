

const createCircleImage = (radius) => { //creates a circle image
    let padding = 5
    let circle = document.createElement("canvas")
    circle.width, circle.height = radius*2+padding
    let ctx = circle.getContext("2d")
    ctx = style(ctx)
    ctx.beginPath()
    let xy = radius+padding/2
    ctx.arc(xy, xy, radius, 0, 2 * Math.PI)
    ctx.stroke()
    return circle
}

const style = (ctx) => { //sets canvas fill and stroke styles
    ctx.translate(0.5,0.5)
    ctx.imageSmoothingEnabled = false
    ctx.fillStyle = "black"
    ctx.strokeStyle = "rgb(0,255,0)"
    return ctx
}

const clear = (ctx) => { //clears the canvas
    ctx.fillRect(0,0,ctx.width,ctx.height)
}

const CreateObject = (x,y,vector, image) => { //creates a generic game object
    const object = {
        x:x,
        y:y,
        vector:vector,
        image: image

    }
    return object
}

const constrain = (object) => { //makes sure the object stays in the playing field
    if (object.x > ctx.width){
        object.x = object.x - ctx.width
    }
    if (object.y > ctx.height){
        object.y = object.y - ctx.height
    }
    if (object.x < 0){
        object.x = object.x + ctx.width
    }
    if (object.y < 0){
        object.y = object.y + ctx.height
    }
}

const CreateRenderer = (ctx) => { //binds a context to a function so that it can draw objects in that context
    return (object) => {
        ctx.drawImage(object.image, object.x, object.y)
        ctx.drawImage(object.image, object.x + ctx.width, object.y)
        ctx.drawImage(object.image, object.x - ctx.width, object.y)
        ctx.drawImage(object.image, object.x, object.y + ctx.height)
        ctx.drawImage(object.image, object.x, object.y - ctx.height)
        ctx.drawImage(object.image, object.x - ctx.width, object.y - ctx.height)
        ctx.drawImage(object.image, object.x + ctx.width, object.y - ctx.height)
        ctx.drawImage(object.image, object.x - ctx.width, object.y + ctx.height)
        ctx.drawImage(object.image, object.x + ctx.width, object.y + ctx.height)
    }
}

const moveObject = (obj) => { //applies an object's vector to its position
    obj.x = obj.x + obj.vector.x
    obj.y = obj.y + obj.vector.y
}



//---------------Main--------------------

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
ctx.width = canvas.width   //bind canvas dimensions to the context for convenience
ctx.height = canvas.height
ctx = style(ctx)  //Set our fill and stroke styles
const render = CreateRenderer(ctx) //create a render function with a context bound to it

//stock images
const largeAsteroid = createCircleImage(40)
const mediumAsteroid = createCircleImage(20)
const smallAsteroid = createCircleImage(10)

//array of objects
let objects = []
objects.push(CreateObject(10, 15, {x:1,y:2.5}, largeAsteroid))
objects.push(CreateObject(125, 15, {x:-1,y:2}, largeAsteroid))
objects.push(CreateObject(10, 200, {x:2.5,y:1}, mediumAsteroid))
objects.push(CreateObject(200, 300, {x:-2,y:.5}, mediumAsteroid))
objects.push(CreateObject(150, 150, {x:.5,y:.5}, smallAsteroid))
objects.push(CreateObject(10, 15, {x:-.5,y:1}, smallAsteroid))



//Main game loop
setInterval(() => {
    clear(ctx)
    objects.map((object)=>{
        moveObject(object)
        constrain(object)
        render(object)
    })
},1000/60)
