import compose from "../../hof/compose.js"
import { addOreSetup } from "../addOre.js"

export const updateOreSetup = objectList => {
  return [
    addOreSetup(objectList)
  ].reduce(compose)
}