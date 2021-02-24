export default function Renderer(renderfunction: TRenderFunction<any>) { //can't coax a type that works here
  return function (state: IRotatableRenderable | ICircleRenderable) {
    state.position.forEach(each => renderfunction(each, state))
  }
}