import { canDelete } from "./canDelete.js"
import { canMove } from "./canMove.js"
import { canUpdate } from "./canUpdate.js"

export const commonBehaviors = object => {
  canUpdate(object)
  canMove(object)
  canDelete(object)
}