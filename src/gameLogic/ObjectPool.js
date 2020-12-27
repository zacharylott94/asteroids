const ObjectPool = new Set()

ObjectPool.count = function(type) {
  let count = 0
  for (const each of ObjectPool.values()){
    if (each.constructor.name === type)
      count++
  }
  return count
}

ObjectPool.get = function(type) {
  for (const each of ObjectPool.values()){
    if (each.constructor.name === type)
      return each
  }
}

export default ObjectPool