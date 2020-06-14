import Vector from "./Vector.js"
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

const hasCollided = (obj, obj2) => {
    //hash the objects to see if they are the same object
    const hash1 = hash(obj)
    const hash2 = hash(obj2)
    if (hash1 === hash2) return false

    const squaredDistanceBetweenObjects = Vector.distanceSquared(obj.position,
                                          obj2.position)  
    const summedRadiiOfObjects = obj.radius + obj2.radius
    const squaredRadiiOfObjects = summedRadiiOfObjects * summedRadiiOfObjects
    if (squaredDistanceBetweenObjects <= squaredRadiiOfObjects) {
        return true
    } else {
        return false
    }
}

const hash = (thing) => {
    thing = JSON.stringify(thing)
    thing = thing.split("")
    thing = thing.map((x) => x.charCodeAt(0))
    const sum = thing.reduce((acc, cur) => (cur * acc) - (cur + acc))
    return sum % 181
}

const GameObject = {
    create,
    move,
    hasCollided,
}
export default GameObject
