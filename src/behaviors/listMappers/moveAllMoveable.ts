import { conditional } from "../../hof/conditional.js"
import { isMoveable } from "../../hof/conditions.js"
import mapper from "../../hof/mapper.js"
import move from "../objectMappers/move.js"


const moveAllMoveable = mapper(conditional(isMoveable, move))
export default moveAllMoveable