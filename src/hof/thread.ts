//Inspired by clojure threading macros, but less powerful
export default function thread(thing, ...functions) {
  let result = thing
  for (let func of functions) {
    result = func(result)
  }
  return result
}