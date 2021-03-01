function Updater<T>(type: ObjectType, func: Function) {
  function update(obj: T & ITypeable) {
    if (obj.type === type)
      return func(obj)
  }
  return update
}

export default Updater