import GenericFactory from "./genericObject.js"

export default radius => (location: TVector, velocity: TVector, rotation: Degrees): Player => {
  return {
    ...GenericFactory(location, velocity, radius, ObjectType.Player),
    rotation,
    acceleration: .05,
    hasCollided: false,
  }
}