import GameObject from "./objects/GameObject.js"
import constrain from "./gameLogic/constrain.js"
import Vector from "./objects/Vector.js"


//The main game loop should happen in here




let hash = (thing) => {
    thing = JSON.stringify(thing)
    thing = thing.split("")
    thing = thing.map((x) => x.charCodeAt(0))
    let sum = thing.reduce((acc, cur) => (cur * acc) - (cur + acc))
    return sum % 181
}

const GAME = {
  constrain,
  hash,
}

export default GAME