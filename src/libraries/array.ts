const limit = limit => array => {
  let newArray = Array.from(array)
  while (newArray.length > limit) newArray.shift()
  return newArray
}
//This function takes an item and a list and concatenates them
const concat = <T>(item: T, list: T[]) => list.concat(item)

export default {
  limit,
  concat,
}
