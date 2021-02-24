export default function rotate(object: IRotation, rotationAmount: number): IRotation {
  let newObject: IRotation = {
    ...object,
    rotation: object.rotation + rotationAmount
  }
  return newObject
}