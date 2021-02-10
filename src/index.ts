import circle from "./draw/circle.js"
import Graphics from "./engine/graphics.js"
import Position from "./gameObjects/Position.js"




let x = () => {
  console.log("Looping")
  Graphics.clear()
}
setInterval(x, 1000)