export default function rotate(object:IRotatable, rotationAmount:number):IRotatable {
  let newObject: IRotatable = {
    ...object,
    rotation: object.rotation + rotationAmount
  }
  return newObject
}