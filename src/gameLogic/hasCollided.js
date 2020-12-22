import Vector from "../objects/Vector.js";
const hasCollided = (obj, obj2, width, height) => {
    if (obj === obj2) {
        // console.log("same boi");
        return false;
    }
    const squaredDistanceBetweenObjects = Vector.distanceSquared(obj.position, obj2.position, width, height);
    const summedRadiiOfObjects = obj.radius + obj2.radius;
    const squaredRadiiOfObjects = summedRadiiOfObjects * summedRadiiOfObjects;
    if (squaredDistanceBetweenObjects <= squaredRadiiOfObjects) {
        obj.handleCollision?.(obj2)
        obj2.handleCollision?.(obj)
        return true;
    }
    else {
        return false;
    }
};

export default hasCollided