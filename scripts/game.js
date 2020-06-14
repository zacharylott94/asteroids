import GameObject from "./objects/GameObject.js"
import constrain from "./gameLogic/constrain.js"
import Vector from "./objects/Vector.js"
import GRAPHICS from "./graphics.js"

//---------------Initialize Game--------------------

const canvas = document.getElementById("canvas")


// Radius Constants
const largeRadius = 40
const mediumRadius = 25
const smallRadius = 16
const playerRadius = 6




//array of objects
let objects = []
objects.push(GameObject.create(Vector.create(10,  150), Vector.createDM(45,   1), GRAPHICS.Circle,  largeRadius))
objects.push(GameObject.create(Vector.create(125,  15),  Vector.createDM(270,  .9), GRAPHICS.Circle,  largeRadius))
objects.push(GameObject.create(Vector.create(10,  300), Vector.createDM(10,   .2), GRAPHICS.Circle, mediumRadius))
objects.push(GameObject.create(Vector.create(200, 300), Vector.createDM(185, 1.5), GRAPHICS.Circle, mediumRadius))
objects.push(GameObject.create(Vector.create(150, 150), Vector.createDM(300,   1), GRAPHICS.Circle,  smallRadius))
objects.push(GameObject.create(Vector.create(10,   15),  Vector.createDM(34, 1.25), GRAPHICS.Circle,  smallRadius))
objects.push(GameObject.create(Vector.create(canvas.width/2,  canvas.height/2),  Vector.createDM(0,0),  GRAPHICS.Player, playerRadius))




//The main game loop should happen in here
const renderLoop = () => {
    GRAPHICS.clear()
    objects.map((obj) => {
        GRAPHICS.render  (obj)
    })
}

const physicsLoop = () => {
    objects.map((obj) => {
        GameObject.move  (obj)
        constrain        (obj)
        objects.map((obj2) => {
            GameObject.hasCollided(obj, obj2)? console.log("collision"): false
        })
    })
}


const GAME = {
  renderLoop,
  physicsLoop
}

export default GAME