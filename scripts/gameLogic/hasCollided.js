import Vector from "../objects/Vector.js";
import ObjectPool from "./ObjectPool.js";
const hasCollided = (obj, obj2) => {
    //hash the objects to see if they are the same object
    const hash1 = ObjectPool.id(obj);
    const hash2 = ObjectPool.id(obj2);
    if (hash1 === hash2)
        return false;
    const squaredDistanceBetweenObjects = Vector.distanceSquared(obj.position, obj2.position);
    const summedRadiiOfObjects = obj.radius + obj2.radius;
    const squaredRadiiOfObjects = summedRadiiOfObjects * summedRadiiOfObjects;
    if (squaredDistanceBetweenObjects <= squaredRadiiOfObjects) {
        return true;
    }
    else {
        return false;
    }
};

export default hasCollided