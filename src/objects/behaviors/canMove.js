import Position from "../vector/Position.js";

export const canMove = (state) => {
    return {
        move: _ => { state.position = Position.add(state.position, state.velocity); }
    };
};
