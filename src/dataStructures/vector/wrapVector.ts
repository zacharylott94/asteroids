// import zip from "../hof/zip"
import mod from "../../libraries/mod.js"


//this would work if vectors were arrays
// export default (wrapper, vector) => {zip(vector,wrapper).map(([x,m]) => mod(x,m))}


export default (wrapper, vector): TVector => {
  return [
    mod(vector[0], wrapper[0]),
    mod(vector[1], wrapper[1])
  ]
}