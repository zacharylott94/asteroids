import { context } from "../engine/canvas.js";
import Graphics from "../engine/graphics.js";

let playerShipGraphic: TRenderFunction
  

playerShipGraphic = (location: TVector, object: any) => {
    const { x, y } = location;
    context.save();
    Graphics.rotate(location, object.rotation);
    context.beginPath();
    context.moveTo(x - 4, y + 7);
    context.lineTo(x - 4, y - 7);
    context.lineTo(x + 10, y);
    context.lineTo(x - 4, y + 7);
    context.stroke();
    context.restore();
};

export default playerShipGraphic

