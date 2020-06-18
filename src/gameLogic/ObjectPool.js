import uuid from "./uuid.js"
const objects = {}
const add = (object) => {
  objects[uuid()] = object
}
const remove= (object) => {
  Object.entries(objects).forEach(([key, value]) => {value === object? delete objects[key]: false });
}
const id = (object) => {
  return Object.entries(objects).find(([key,value]) => value === object)[0]
}

const ObjectPool = {
  add,
  remove,
  objects,
  id
}
export default ObjectPool