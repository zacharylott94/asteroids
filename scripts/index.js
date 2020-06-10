import GAME from "./game.js"

//Main game loop
let FRAMERATE = 10
setInterval(GAME.loop,1000/FRAMERATE)
