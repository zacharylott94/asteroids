export default function Renderer(renderfunction: RenderFunction<any>) { //can't coax a type that works here
  return function (state: any) {
    state.position.forEach(each => renderfunction(each, state))
    //perform the identity so that this function can be mapped
    return state
  }
}