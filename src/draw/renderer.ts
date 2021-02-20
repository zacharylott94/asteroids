export default function Renderer(renderfunction: Function) {
  return function (state: IPosition) {
    state.position.forEach(each => renderfunction(each, state))
  }
}