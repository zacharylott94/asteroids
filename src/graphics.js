import Settings from "./gameLogic/Settings.js"
import Canvas from "./objects/Canvas.js"
import Vector from "./objects/Vector.js"

const render = (object) => {
    //Assumption: All objects' draw functions will take or ignore these specific parameters
    //            So, all object draw functions should take a position and radius
    //            If a draw function ever doesn't follow this, rendering will break
    object.draw(object.position,object.radius)

    //The above assumption exists in this function as well
    showClones(object)

    // Everything below is for debugging
    if (Settings.RENDER_DEBUG){
        showCenter(object)
        showVelocity(object)
        //Rotation Viewer Hack
        if(object.rotation != undefined) drawRay(object.position, Vector.add(object.position, Vector.fromDegreesAndMagnitude(object.rotation, 20)), "aqua")
    }


}


//clears the context
const clear = () => { 
    let ctx = Canvas.context
    ctx.fillRect(-10, -10, Canvas.width+15, Canvas.height+15)
}

//debug
const showCenter = (object) => {
    drawCross(object.position, object.radius*2, "rgb(255,0,0)")
}

//debug
const showVelocity = (object) => {
    drawRay(object.position, Vector.add(object.position, object.velocity.scale(50)))
}

//debug
const drawCross = (position, size, color) => {
    let ctx = Canvas.context
    ctx.save()
    ctx.fillStyle = color
    ctx.fillRect(position.x-size/2,position.y,size,1)
    ctx.fillRect(position.x,position.y-size/2,1,size)
    ctx.restore()
}

//debug
const drawRay = (start, end, color = "rgb(255,255,0)") => {
    let ctx = Canvas.context
    ctx.save()
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke()
    ctx.restore()
}

//This draws screen-wrap clones for a seamless appearance
const showClones = (object) => {

    const x = object.position.x
    const y = object.position.y
    object.draw(new Vector(x + Canvas.width, y), object.radius)               //right clone
    object.draw(new Vector(x, y + Canvas.height), object.radius)              //bottom clone
    object.draw(new Vector(x - Canvas.width, y), object.radius)               //left clone
    object.draw(new Vector(x, y - Canvas.height), object.radius)              //top clone
    object.draw(new Vector(x + Canvas.width, y + Canvas.height), object.radius)  //bottom-right clone
    object.draw(new Vector(x - Canvas.width, y + Canvas.height), object.radius)  //bottom-left clone
    object.draw(new Vector(x + Canvas.width, y - Canvas.height), object.radius)  //top-right clone
    object.draw(new Vector(x - Canvas.width, y - Canvas.height), object.radius)  //top-left clone
}

function drawText (text, x, y, {color = "rgb(0,255,0)", size = "1em"} = {}) {
    let ctx = Canvas.context
    ctx.save()
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.font = `${size} sans-serif`
    ctx.fillStyle = color
    ctx.fillText(text,x,y)

    ctx.restore()
}

const GRAPHICS = {
  clear,
  render,
  drawText
}



export default GRAPHICS