import mapper from "../../hof/mapper.js"
import checkCollision from "../checkCollision.js"

export default list => list.map(obj => list.reduce(checkCollision, obj))
const resetObject = <T>(obj: T & ICollidable): T & ICollidable => ({ ...obj, hasCollided: false })

export const resetCollision = mapper(resetObject)
