/*
  Call
  Register
*/


const call = (callbackList, ...params) => {
  callbackList.map((callback) => {callback(...params)})
}

const register = (callbackListName, callback) => {
  Event[callbackListName] = Event[callbackListName] || []
  Event[callbackListName].push(callback)
}
let Event = {
  call,
  register
}
export default Event