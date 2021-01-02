const ObjectPool = new Set()

ObjectPool.count = function(type) {
  let count = 0
  for (const each of this.values()){
    if (each.constructor.name === type)
      count++
  }
  return count
}

//Returns first object only. Used to get Player
ObjectPool.getPlayer = function() {
  for (const each of this.values()){
    if (each.constructor.name === "Player")
      return each
  }
}

ObjectPool.reset = function() {
  for (const each of this.values()) this.delete(each)
}

export default ObjectPool