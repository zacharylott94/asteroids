import Context from "./Context.js"
let Player = () => {
    let player = document.createElement("canvas"); //instantiate a canvas object
    player.width, player.height = 12; //give the canvas a width and height
    let ctx = Context.create(player) //get a context for the circle canvas
    //draw the player
    ctx.beginPath();
    ctx.moveTo(6, 1);
    ctx.lineTo(11, 11);
    ctx.lineTo(1, 11);
    ctx.lineTo(6, 1);
    ctx.stroke();
    return player;
};

export default Player