import uuid from "./uuid.js"
const objects = {}
const add = (object) => {
  objects[uuid()] = object
}
const remove= (object) => {
  Object.entries(objects).forEach(([key, value]) => {value === object? delete objects[key]: false });
}

const ObjectPool = {
  add,
  remove,
  objects
}
export default ObjectPool