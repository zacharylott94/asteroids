const callbacks = {}
const event = {
  GamePaused: "pause",
  MissileDeleted: "missileDeleted"
}

class EventCoordinator {
  static registerCallback(event, callback){
    if (typeof callback == "function" && callbacks[event]?.constructor.name === "Set" )
      callbacks[event].add(callback)
    else 
      callbacks[event] = new Set([callback])
  }
  static unregisterCallback(event, callback){
    callbacks[event].constructor.name === "Set" ? callbacks[event].delete(callback): false
  }
  static call(event, ...args){
    callbacks[event]?.forEach?.((each, args) => each(args))
  }
}
EventCoordinator.event = event

export default EventCoordinator