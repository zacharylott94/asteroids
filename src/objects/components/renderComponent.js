import Canvas from "../Canvas.js";
import Vector from "../Vector.js";

class RenderComponent {
  constructor(drawingFunction, boundObject) {
    this.drawingFunction = drawingFunction
    this.render = RenderComponent.render.bind(this)
    this.boundObject = boundObject
  }

  static render() {
    renderOffsets.map(offsetVector => {
      let offsetPosition = Vector.add(this.boundObject.position, offsetVector)
      this.drawingFunction({...this.boundObject, position: offsetPosition})
    })
  }
}

const renderOffsets = [
  new Vector(-Canvas.width, -Canvas.height), //top-left
  new Vector(0, -Canvas.height),             //top
  new Vector(Canvas.width, -Canvas.height),  //top-right
  new Vector(-Canvas.width, 0),              //left
  new Vector(0, 0),                          //center
  new Vector(Canvas.width, 0),               //right
  new Vector(-Canvas.width, Canvas.height), //bottom-left
  new Vector(0, Canvas.height),             //bottom
  new Vector(Canvas.width, Canvas.height),  //bottom-right
]

export default RenderComponent