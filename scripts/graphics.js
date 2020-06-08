import Circle from "./objects/Circle.js"
import Player from "./objects/Player.js"

//binds a context to a function so that it can draw objects in that context
let CreateRenderer = (ctx) => { 
    return (object) => {
        showObject(ctx, object)
        showCenter(ctx, object)

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


//sets canvas fill and stroke styles
let style = (ctx) => { 
    ctx.translate(0.5, 0.5)            //an attempt to remove anti-aliasing
    ctx.imageSmoothingEnabled = false  //an attempt to remove anti-aliasing
    ctx.fillStyle = "black"            //space is black
    ctx.strokeStyle = "rgb(0,255,0)"   //lines are green

    return ctx
}

//clears the context
let clear = (ctx) => { 
    ctx.fillRect(0, 0, ctx.width, ctx.height)
}

let setColor = (ctx, color = Color(0,255,0)) => {
    ctx.strokeStyle = color
    return ctx
}

let setFillColor = (ctx, color = Color(0,255,0)) => {
    ctx.fillStyle = color
    return ctx
}

let showCenter = (ctx, object) => {
    ctx = setFillColor(ctx, "rgb(255,0,0)")
    ctx.fillRect(object.x-object.radius,object.y,object.radius*2,1)
    ctx.fillRect(object.x,object.y-object.radius,1,object.radius*2)
    ctx = setFillColor(ctx, "rgb(0,0,0)")
}

let showObject = (ctx, object) => {
    ctx.drawImage(object.image, object.x - object.radius, object.y - object.radius)
}

const GRAPHICS = {
  CreateRenderer,
  createCircleImage: Circle,
  createPlayerImage: Player,
  style,
  clear,
}

let Color = (r = 255, g = 255, b = 255) => {
    return `"rgb(${r},${g},${b})"`
}


export default GRAPHICS