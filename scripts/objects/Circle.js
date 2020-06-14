import Context from "./Context.js"
//strokes a circle
let Circle = (ctx, position, radius) => {
    ctx.moveTo(position.x, position.y)
    ctx.beginPath();
    ctx.arc(position.x,position.y, radius, 0, 2 * Math.PI)
    ctx.stroke()
    /*
    begin path
    move to center
    trace arc to make circle
    stroke the circle
    */
}


export default Circle