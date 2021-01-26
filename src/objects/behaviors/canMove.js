import Position from "../vector/Position.js";

export const canMove = (object) => {
    const move = _ => { object.position = Position.add(object.position, object.velocity); }
    object.updateCallbacks.push(move)
};
