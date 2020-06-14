import Circle from "./objects/Circle.js"
import Player from "./objects/Player.js"
import GameObject from "./objects/GameObject.js"
import Context from "./objects/Context.js"
import Vector from "./objects/Vector.js"



const ctx = Context.create()

let render = (object) => {
    object.draw(ctx, object.position,object.radius)
    // showObject(object)


    showCenter(object)
    showVelocity(object)


    //draw clones in a box around the object to make screen wrapping appear seamless
    showClones(object)
}


//clears the context
let clear = () => { 
    ctx.fillRect(-10, -10, ctx.width+15, ctx.height+15)
}

let setColor = (color = Color(0,255,0)) => {
    ctx.strokeStyle = color
}

let setFillColor = (color = Color(0,0,0)) => {
    ctx.fillStyle = color
}

let showCenter = (object) => {
    setFillColor(Color(255))
    ctx.fillRect(object.position.x-object.radius,object.position.y,object.radius*2,1)
    ctx.fillRect(object.position.x,object.position.y-object.radius,1,object.radius*2)
    setFillColor()
}

let showObject = (object) => {
    ctx.drawImage(object.image, object.position.x - object.radius, object.position.y - object.radius)
}

let showVelocity = (object) => {
    drawRay(object.position, Vector.add(object.position, Vector.multiply(object.velocity,50)))
}

let drawRay = (start, end) => {
    setColor(Color(255,255))
    ctx.beginPath()
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke()
    setColor()
}

let showClones = (object) => {
    let x = object.position.x
    let y = object.position.y
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

let Color = (r = 0, g = 0, b = 0) => {
    return `rgb(${r},${g},${b})`
}


export default GRAPHICS