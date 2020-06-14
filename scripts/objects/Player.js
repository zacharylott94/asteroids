//Draws a triangle for the player. Will eventually need rotation
const Player = (ctx, position, ...trash) => {
    let origin = position
    ctx.beginPath();
    ctx.moveTo(origin.x-7, origin.y+7);
    ctx.lineTo(origin.x, origin.y-7);
    ctx.lineTo(origin.x+7, origin.y+7);
    ctx.lineTo(origin.x-7, origin.y+7);
    ctx.stroke();
};

export default Player