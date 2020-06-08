import GameObject from "./objects/GameObject.js"
//makes sure the object stays in the playing field
let constrain = (object, ctx) => {  
    if (object.x > ctx.width){            //if object is past the right edge of the screen
        object.x = object.x - ctx.width   //subtract the width of the screen to wrap it to the left
    }
    if (object.y > ctx.height){           //if object is past the bottom edge of the screen
        object.y = object.y - ctx.height  //subtract the height of the screen to wrap it to the top
    }
    if (object.x < 0){                    //if the object is past the left edge of the screen
        object.x = object.x + ctx.width   //add the width of the screen to wrap it to the right
    }
    if (object.y < 0){                    //if the object is past the top of the screen
        object.y = object.y + ctx.height  //add the height of the screen to wrap it to the bottom
    }
}



//applies an object's vector to its position
let move = (obj) => { 
    obj.x = obj.x + obj.vector.x * obj.vector.magnitude
    obj.y = obj.y + obj.vector.y * obj.vector.magnitude
}

//Takes an angle in degrees and creates a unit vector with a magnitude
let Vector = (degrees,magnitude) => {
    let angle = Math.PI * 2 / 360 * degrees
    let x = Math.cos(angle)
    let y = Math.sin(angle)
    return {
        x,
        y,
        magnitude
    }
}

let vectorToDegrees = (vector) => {
    let rad = Math.asin(vector.y)
    let deg = rad * 360 / 2 / Math.PI
    return deg
}

let distanceSquared = (x, y, x2, y2) => {
    let dx = x2 - x
    let dy = y2 - y
    dx *= dx
    dy *= dy
    let sum = dx + dy
    return sum
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

let hash = (thing) => {
    thing = JSON.stringify(thing)
    thing = thing.split("")
    thing = thing.map((x) => x.charCodeAt(0))
    let sum = thing.reduce((acc, cur) => (cur * acc) - (cur + acc))
    return sum % 181
}

const GAME = {
  CreateObject: GameObject,
  constrain,
  move,
  Vector,
  vectorToDegrees,
  distanceSquared,
  collide,
  hash,
}

export default GAME