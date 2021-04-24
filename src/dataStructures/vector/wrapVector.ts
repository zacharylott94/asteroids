// import zip from "../hof/zip"
import mod from "../../libraries/mod.js"


//this would work if vectors were arrays
// export default (wrapper, vector) => {zip(vector,wrapper).map(([x,m]) => mod(x,m))}


export default (wrapper, vector) => {
  return {
    x: mod(vector.x, wrapper.x),
    y: mod(vector.y, wrapper.y)
  }
}