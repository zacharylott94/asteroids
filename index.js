console.log("Hello World")
const fill = "black"
const stroke = "rgb(0,255,0)"
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
ctx = style(ctx)
ctx.moveTo(0,0)
ctx.lineTo(200,100)
ctx.stroke()
ctx.moveTo(0,0)
drawCircle(ctx, 30, 5, 5)
drawCircle(ctx, 20, 20, 15)
drawCircle(ctx, 10, 10, 10)
drawCircle(ctx, 10, 60, 60)




function drawCircle(ctx, radius, dx, dy) { //Draws from top left corner
    ctx.drawImage(circle(radius),dx,dy)
}

function circle(radius) {
    let padding = 5
    let circle = document.createElement("canvas")
    circle.width, circle.height = radius*2+padding
    let ctx = circle.getContext("2d")
    ctx = style(ctx)
    ctx.beginPath()
    let xy = radius+padding/2
    ctx.arc(xy, xy, radius, 0, 2 * Math.PI)
    ctx.stroke()
    return circle
}

function style(ctx){
    ctx.translate(0.5,0.5)
    ctx.imageSmoothingEnabled = false
    ctx.fillStyle = fill
    ctx.strokeStyle = stroke
    return ctx
}

