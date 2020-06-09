import Circle from "./objects/Circle.js"
import Player from "./objects/Player.js"
import GameObject from "./objects/GameObject.js"
import Context from "./objects/Context.js"
import Vector from "./objects/Vector.js"



const ctx = Context.create()

let render = (object) => {
    showObject(object)
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
    drawRay(object.position, Vector.add(object.position, Vector.multiply(object.velocity,object.velocity.magnitude,50)))
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
    let [x,y] = GameObject.getCoordsMinusRadius(object)
    ctx.drawImage(object.image, x + ctx.width, y)               //right clone
    ctx.drawImage(object.image, x, y + ctx.height)              //bottom clone
    ctx.drawImage(object.image, x - ctx.width, y)               //left clone
    ctx.drawImage(object.image, x, y - ctx.height)              //top clone
    ctx.drawImage(object.image, x + ctx.width, y + ctx.height)  //bottom-right clone
    ctx.drawImage(object.image, x - ctx.width, y + ctx.height)  //bottom-left clone
    ctx.drawImage(object.image, x + ctx.width, y - ctx.height)  //top-right clone
    ctx.drawImage(object.image, x - ctx.width, y - ctx.height)  //top-left clone
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