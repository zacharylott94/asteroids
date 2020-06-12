import Vector from "./Vector.js"
//creates a generic game object
let create = (position, velocity, image, radius) => {
    const object = {
        position,
        velocity,
        image,
        radius,
        collided: false
    };
    return object;
};

let move = (obj) => { 
    obj.position.x += obj.velocity.x
    obj.position.y += obj.velocity.y
}

let hasCollided = (obj, obj2) => {
    //hash the objects to see if they are the same object
    let hash1 = hash(obj)
    let hash2 = hash(obj2)
    if (hash1 === hash2) return false

    // Get the two objects' positions two frames before the current
    // This is an attempt to prevent overlapping
    let x = obj.position.x
    let y = obj.position.y
    let x2 = obj2.position.x
    let y2 = obj2.position.y

    let distance = Vector.distanceSquared(Vector.create(x, y),
                                          Vector.create(x2, y2))  
    let radii = obj.radius + obj2.radius
    radii *= radii
    if (distance <= radii) {     // If Squared distance is less than the squared sum of radii, the objects have "collided"
        return true
    } else {
        return false
    }
}

let getCoordsMinusRadius = (object) => {
    let coords =  [object.position.x - object.radius, object.position.y - object.radius]
    return coords
}

let hash = (thing) => {
    thing = JSON.stringify(thing)
    thing = thing.split("")
    thing = thing.map((x) => x.charCodeAt(0))
    let sum = thing.reduce((acc, cur) => (cur * acc) - (cur + acc))
    return sum % 181
}

const GameObject = {
    create,
    move,
    hasCollided,
    getCoordsMinusRadius,
}
export default GameObject
