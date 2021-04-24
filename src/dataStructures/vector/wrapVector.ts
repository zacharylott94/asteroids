import mod from "../../libraries/mod.js"

export default (wrapper, vector): TVector => {
  return [
    mod(vector[0], wrapper[0]),
    mod(vector[1], wrapper[1])
  ]
}