import GenericFactory from "./genericObject.js"

export default radius => (location, velocity) => GenericFactory(location, velocity, radius, ObjectType.Asteroid)