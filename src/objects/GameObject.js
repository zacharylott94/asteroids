//creates a generic game object
const create = (position /*Vector*/, velocity /*Vector*/ , draw /*Function*/, radius /*Number*/) => {
    const object = {
        position,
        velocity,
        draw,
        radius,
        collided: false,
    };
    return object;
};

const move = (obj) => { 
    obj.position.x += obj.velocity.x
    obj.position.y += obj.velocity.y
}

const GameObject = {
    create,
    move,
}
export default GameObject
