

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
    ctx.fillStyle = fill
    ctx.strokeStyle = stroke
    return ctx
}

function clear(ctx){ //clears the canvas
    ctx.fillRect(0,0,ctx.width,ctx.height)
}

const CreateRenderer = (ctx, object) => {
    const Renderer = (object) =>{
        ctx.drawImage(object.image, object.x, object.y)
    }
    return Renderer
}

const CreateObject = (x,y,vector) => {
    const object = {
        x:x,
        y:y,
        vector:vector
    }
    return object
}

const CreateCircleObject = (x,y,v,radius) => {
    let object = CreateObject(x,y,v)
    object.image = createCircleImage(radius)
    return object
}

const WrapperClones = (object) => {

}



//---------------Main--------------------

console.log("Hello World")
const fill = "black"
const stroke = "rgb(0,255,0)"
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
ctx.width = canvas.width   //bind canvas dimensions to the context for convenience
ctx.height = canvas.height
ctx = style(ctx)  //Set our fill and stroke styles
clear(ctx)       //fills the canvas with the fill color
ctx.moveTo(0,0)
ctx.lineTo(200,100)
ctx.stroke()
ctx.moveTo(0,0)
const Render = CreateRenderer(ctx)
let circleObject = CreateCircleObject(10,15,20)
let objects = []
objects.push(CreateCircleObject(10,15,0,20))
objects.push(CreateCircleObject(10,15,0,30))
objects.push(CreateCircleObject(100,150,0,40))
objects.push(CreateCircleObject(200,10,0,10))
objects.push(CreateCircleObject(200,15,0,20))
objects.push(CreateCircleObject(200,20,0,30))
objects.map(Render)
