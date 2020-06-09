import Circle from "./objects/Circle.js"
import Player from "./objects/Player.js"
import GameObject from "./objects/GameObject.js"
import Context from "./objects/Context.js"



const ctx = Context.create()


//binds a context to a function so that it can draw objects in that context
let CreateRenderer = () => { 
    return (object) => {
        showObject(object)
        showCenter(object)

        //draw clones in a box around the object to make screen wrapping appear seamless
        showClones(object)
    }
}


//clears the context
let clear = () => { 
    ctx.fillRect(-10, -10, ctx.width+15, ctx.height+15)
}

let setColor = (color = Color(0,255,0)) => {
    ctx.strokeStyle = color
}

let setFillColor = (color = Color(0,255,0)) => {
    ctx.fillStyle = color
}

let showCenter = (object) => {
    setFillColor("rgb(255,0,0)")
    ctx.fillRect(object.x-object.radius,object.y,object.radius*2,1)
    ctx.fillRect(object.x,object.y-object.radius,1,object.radius*2)
    setFillColor("rgb(0,0,0)")
}

let showObject = (object) => {
    ctx.drawImage(object.image, object.x - object.radius, object.y - object.radius)
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
  CreateRenderer,
  createCircleImage: Circle,
  createPlayerImage: Player,
  clear,
}

let Color = (r = 255, g = 255, b = 255) => {
    return `"rgb(${r},${g},${b})"`
}


export default GRAPHICS