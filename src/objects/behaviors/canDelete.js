import ObjectList from "../../gameLogic/ObjectList.js";
import EventCoordinator from "../EventCoordinator.js"
export const canDelete = object => {
  const deleteThis = _ => {
    // object.sound.stop()
    EventCoordinator.call(EventCoordinator.event.ObjectDeleted, object)
    ObjectList.delete(object)
  }
  object.delete = deleteThis
}