import Circle from "./objects/Circle.js"
import Player from "./objects/Player.js"
import Context from "./objects/Context.js"
import Vector from "./objects/Vector.js"



const ctx = Context.create()

const render = (object) => {
    //Assumption: All objects' draw functions will take or ignore these specific parameters
    //            So, all object draw functions should take a context, then have their position passed in, etc.
    //            If a draw function ever doesn't follow this, rendering will break
    object.draw(ctx, object.position,object.radius)

    showCenter(object)
    showVelocity(object)

    //The above assumption exists in this function as well
    showClones(object)
}


//clears the context
const clear = () => { 
    ctx.fillRect(-10, -10, ctx.width+15, ctx.height+15)
}

const setColor = (color = Color(0,255,0)) => {
    ctx.strokeStyle = color
}

const setFillColor = (color = Color(0,0,0)) => {
    ctx.fillStyle = color
}

const showCenter = (object) => {
    setFillColor(Color(255))
    ctx.fillRect(object.position.x-object.radius,object.position.y,object.radius*2,1)
    ctx.fillRect(object.position.x,object.position.y-object.radius,1,object.radius*2)
    setFillColor()
}

const showVelocity = (object) => {
    drawRay(object.position, Vector.add(object.position, Vector.multiply(object.velocity,50)))
}

const drawRay = (start, end) => {
    setColor(Color(255,255))
    ctx.beginPath()
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke()
    setColor()
}

//This draws screen-wrap clones for a seamless appearance
const showClones = (object) => {
    const x = object.position.x
    const y = object.position.y
    object.draw(ctx,Vector.create(x + ctx.width, y), object.radius)               //right clone
    object.draw(ctx,Vector.create(x, y + ctx.height), object.radius)              //bottom clone
    object.draw(ctx,Vector.create(x - ctx.width, y), object.radius)               //left clone
    object.draw(ctx,Vector.create(x, y - ctx.height), object.radius)              //top clone
    object.draw(ctx,Vector.create(x + ctx.width, y + ctx.height), object.radius)  //bottom-right clone
    object.draw(ctx,Vector.create(x - ctx.width, y + ctx.height), object.radius)  //bottom-left clone
    object.draw(ctx,Vector.create(x + ctx.width, y - ctx.height), object.radius)  //top-right clone
    object.draw(ctx,Vector.create(x - ctx.width, y - ctx.height), object.radius)  //top-left clone
}

const GRAPHICS = {
  Circle,
  Player,
  clear,
  render,
}

const Color = (r = 0, g = 0, b = 0) => {
    return `rgb(${r},${g},${b})`
}


export default GRAPHICS