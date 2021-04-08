//stator wraps some state into a state object. 
//Calling the resulting function with another function mutates the state.
//Call the resulting function without a parameter to read the state
//PS, I called it "stator" because it sounds sorta like "state"
//But also, it kinda acts like the stator in a rotary system
//It stays put while the functions you pass to it move the parts

export function stator(state) {
  let wrapper = { state }
  return function (functor?: Function) {
    if (functor === undefined) return wrapper.state
    wrapper.state = functor(wrapper.state)
  }
}