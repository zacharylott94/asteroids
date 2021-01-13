import Canvas from "../objects/Canvas.js"
//strokes a circle
const Circle = (position, radius, color = Canvas.context.strokeStyle) => {
    let ctx = Canvas.context
    ctx.save()
    ctx.strokeStyle = color
    ctx.moveTo(position.x, position.y)
    ctx.beginPath();
    ctx.arc(position.x,position.y, radius, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.restore()
}


export default Circle