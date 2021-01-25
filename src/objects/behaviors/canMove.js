import Position from "../vector/Position.js";

export const canMove = (object) => {
    return {
        move: _ => { object.position = Position.add(object.position, object.velocity); }
    };
};
