import Canvas from "../objects/Canvas.js";
import GRAPHICS from "../graphics.js";

const triangle = (position, rotation) => {
    const ctx = Canvas.context;
    const { x, y } = position;
    ctx.save();
    GRAPHICS.rotate(position, rotation);
    ctx.beginPath();
    ctx.moveTo(x - 4, y + 7);
    ctx.lineTo(x - 4, y - 7);
    ctx.lineTo(x + 10, y);
    ctx.lineTo(x - 4, y + 7);
    ctx.stroke();
    ctx.restore();
};

export default triangle
