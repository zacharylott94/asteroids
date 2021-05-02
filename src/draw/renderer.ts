export default function Renderer(renderfunction: RenderFunction<any>) { //can't coax a type that works here
  return function (object: any) {
    object.position.forEach(each => renderfunction(each, object))
    //perform the identity so that this function can be mapped
    return object
  }
}