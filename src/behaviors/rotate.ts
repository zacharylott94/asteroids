export default function rotate(object: IRotation, rotationAmount: number): IRotation {
  return { ...object, rotation: object.rotation + rotationAmount }
}