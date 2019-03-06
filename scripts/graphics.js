
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

//creates a circle image
let createCircleImage = (radius, style) => {                 
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

let createPlayerImage = (style) => {
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

const GRAPHICS = {
  CreateRenderer,
  createCircleImage,
  createPlayerImage,
  style,
  clear,
}

export default GRAPHICS