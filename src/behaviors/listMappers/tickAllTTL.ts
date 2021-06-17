import { conditional } from "../../hof/conditional.js"
import { hasTTL } from "../../hof/conditions.js"
import mapper from "../../hof/mapper.js"
import tickTTL from "../objectMappers/tickTTL.js"


const tickAllTTL = mapper(conditional(hasTTL, tickTTL))

export default tickAllTTL