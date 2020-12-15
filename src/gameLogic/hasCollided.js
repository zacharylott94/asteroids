import Vector from "../objects/Vector.js";
import elasticCollision from "./elasticCollision.js"
const hasCollided = (obj, obj2, width, height) => {
    if (obj === obj2) {
        // console.log("same boi");
        return false;
    }
    const squaredDistanceBetweenObjects = Vector.distanceSquared(obj.position, obj2.position, width, height);
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