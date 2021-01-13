import GRAPHICS from "../graphics.js";
import Canvas from "../objects/Canvas.js";

//Draws a diamond for the projectile
const diamond = (position, rotation, length = 4, width = 2) => {
  const ctx = Canvas.context;
  const { x, y } = position;
  ctx.save();
  GRAPHICS.rotate(position, rotation);
  ctx.beginPath();
  ctx.moveTo(x, y + width);
  ctx.lineTo(x - length, y);
  ctx.lineTo(x, y - width);
  ctx.lineTo(x + length, y);
  ctx.lineTo(x, y + width);
  ctx.stroke();
  ctx.restore();
};

export default diamond
