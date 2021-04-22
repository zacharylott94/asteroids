import GenericFactory from "./genericObject.js"

export default radius => (location, velocity, rotation) => {
  return {
    ...GenericFactory(location, velocity, radius, ObjectType.Player),
    rotation,
    acceleration: .05,
  }
}