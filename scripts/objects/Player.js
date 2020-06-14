import Canvas from "./Canvas.js"
import GameObject from "./GameObject.js"
import Event from "../gameLogic/Event.js"

//Draws a triangle for the player. Will eventually need rotation
const draw = (position, ...trash) => {
    let ctx = Canvas.context
    let origin = position
    ctx.beginPath();
    ctx.moveTo(origin.x-7, origin.y+7);
    ctx.lineTo(origin.x, origin.y-7);
    ctx.lineTo(origin.x+7, origin.y+7);
    ctx.lineTo(origin.x-7, origin.y+7);
    ctx.stroke();
};

const create = (position, velocity, radius) => {
    const player = GameObject.create(position, velocity, draw, radius)
    Event.register("collision", (obj) => {
        obj === player? console.log("Player hit!"): false
    })
    return player
}



const Player = {
    create,
    draw
}
export default Player