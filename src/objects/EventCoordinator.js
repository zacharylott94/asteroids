const callbacks = {}
const event = {
  GamePaused: "pause",
  ProjectileDeleted: "ProjectileDeleted",
  ObjectDeleted: "ObjectDeleted"
}

class EventCoordinator {
  static registerCallback(event, callback){
    if(callbacks[event]?.constructor.name != "Set")
      callbacks[event] = new Set([callback]) 

    if (typeof callback == "function")
      callbacks[event].add(callback)
  }
  static unregisterCallback(event, callback){
    if (callbacks[event]?.constructor.name === "Set") callbacks[event].delete(callback)
  }
  static call(event, ...args){
    callbacks[event]?.forEach?.((each) => each(args))
  }
}
EventCoordinator.event = event

export default EventCoordinator