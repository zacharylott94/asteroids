import ObjectList from "../../gameLogic/ObjectList.js";
export const canDelete = object => {
  const deleteThis = _ => {
    // object.sound.stop()
    // EventCoordinator.call(EventCoordinator.event.ProjectileDeleted, object)
    ObjectList.delete(object)
  }
  object.delete = deleteThis
}