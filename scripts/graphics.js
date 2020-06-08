import Circle from "./objects/Circle.js"
import Player from "./objects/Player.js"

//binds a context to a function so that it can draw objects in that context
let CreateRenderer = (ctx) => { 
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

let showCenter = (ctx, object) => {
}

const GRAPHICS = {
  CreateRenderer,
  createCircleImage: Circle,
  createPlayerImage: Player,
  style,
  clear,
}


export default GRAPHICS