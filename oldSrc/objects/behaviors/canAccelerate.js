import Vector from "../vector/Vector.js";

export const canAccelerate = (object) => {
    const accelerate = () => object.velocity = Vector.add(object.velocity, Vector.fromDegreesAndMagnitude(object.rotation, object.impulse));
    object.accelerate = accelerate
};
