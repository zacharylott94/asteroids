import { body } from "../libraries/arrayFunctions"

export default (list, map) => {
  let result = <any>[]
  let workingList = [...list]
  for (const each of list) {
    result.push(workingList.reduce(map))
    workingList = body(workingList)
  }
  return result.reverse()
}

