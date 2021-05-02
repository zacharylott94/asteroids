import GenericFactory from "./genericObject.js"

export default radius => (location, velocity): Asteroid => {
  return {
    ...GenericFactory(location, velocity, radius, ObjectType.Asteroid),
    hasCollided: false,
    durability: 3
  }
}