import Context from "./Context.js"
//creates a circle image
let createImage = (radius) => {
    let padding = 2; //for padding the image canvas
    let circle = document.createElement("canvas"); //instantiate a canvas object
    circle.width  =  radius * 2 + padding
    circle.height =  radius * 2 + padding; //give the canvas a width and height
    let ctx = Context.create(circle); //get a context for the circle canvas
    //draw the circle
    ctx.beginPath();
    let xy = radius ;
    ctx.arc(xy, xy, radius, 0, 2 * Math.PI);
    ctx.stroke();
    return circle;
};

let stroke = (ctx, position, radius) => {
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

const Circle = {
    createImage,
    stroke
}


export default Circle