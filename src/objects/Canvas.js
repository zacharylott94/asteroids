import Settings from "../gameLogic/Settings.js"

/* 
  All contexts are exactly the same. It doesn't matter if you grab a new reference or pass the same reference around.
  This means that there will always be context state to worry about. A good practice is to always restore the context
  after you change it in a function. A good way to do this is to use context.save() before mutating state, then using
  context.restore() after you have used the context
*/
let Canvas = document.getElementById("canvas")
Canvas.context = Canvas.getContext("2d")

Canvas.width = Settings.GAME_WIDTH
Canvas.height = Settings.GAME_HEIGHT

let ctx = Canvas.context
ctx.translate(0.5, 0.5)            //an attempt to remove anti-aliasing
ctx.imageSmoothingEnabled = false  //an attempt to remove anti-aliasing
ctx.fillColor = "black"
ctx.strokeStyle = "rgb(0,255,0)"

export default Canvas