import GAME from "./game.js"

//Main game loop
let FRAMERATE = 60
setInterval(GAME.renderLoop,1000/FRAMERATE)

let PHYSICSFRAMERATE = 60
setInterval(GAME.physicsLoop,1000/PHYSICSFRAMERATE)