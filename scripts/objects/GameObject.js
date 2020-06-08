//creates a generic game object
let create = (x, y, vector, image, radius) => {
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

let move = (obj) => { 
    obj.x = obj.x + obj.vector.x * obj.vector.magnitude
    obj.y = obj.y + obj.vector.y * obj.vector.magnitude
}

let collide = (obj, obj2) => {
    //hash the objects to see if they are the same object
    let hash1 = hash(obj)
    let hash2 = hash(obj2)
    if (hash1 === hash2) return false
    if (obj.cooldown > 0) return false
    if (obj2.cooldown > 0) return false

    // Get the two objects' positions two frames before the current
    // This is an attempt to prevent overlapping
    let x = obj.x + 2*(obj.vector.x * obj.vector.magnitude)
    let y = obj.y + 2*(obj.vector.y * obj.vector.magnitude)
    let x2 = obj2.x + 2*(obj2.vector.x * obj2.vector.magnitude)
    let y2 = obj2.y + 2*(obj2.vector.y * obj2.vector.magnitude)

    let distance = distanceSquared(x + obj.radius,    //Get Squared distance between objects, correcting for the center
                                 y + obj.radius,
                                 x2 + obj2.radius,
                                 y2 + obj2.radius)  
    let radii = obj.radius + obj2.radius
    radii *= radii
    if (distance <= radii) {     // If Squared distance is less than the squared sum of radii, the objects have "collided"
        obj.cooldown, obj2.cooldown = 5            //prevent objects from detecting collisions for five frames
        return true
    } else {
        return false
    }
}

const GameObject = {
    create,
    move,
    collide
}
export default GameObject
