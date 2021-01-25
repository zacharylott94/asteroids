const ObjectList = new Set()

ObjectList.count = function(type) {
  let count = 0
  for (const each of this.values()){
    if (each.type === type)
      count++
  }
  return count
}

//Returns first object only
ObjectList.getPlayer = function() {
  for (const each of this.values()){
    if (each.type === "Player")
      return each
  }
}

ObjectList.reset = function() {
  for (const each of this.values()) this.delete(each)
}

export default ObjectList