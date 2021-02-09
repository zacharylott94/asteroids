// import Circle from "./draw/circle.js"
import { Canvas } from "./engine/canvas.js"
import Graphics from "./engine/graphics.js"
// import Position from "./gameObjects/Position.js"
console.log("Hello World", Canvas)




let x = () => {
  console.log("Looping")
  Graphics.clear()
}
setInterval(x, 1000)