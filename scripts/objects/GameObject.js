//creates a generic game object
let GameObject = (x, y, vector, image, radius) => {
    const object = {
        x,
        y,
        vector,
        image,
        radius,
        cooldown: 5
    };
    return object;
};

export default GameObject
