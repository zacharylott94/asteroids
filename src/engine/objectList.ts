export function deleteObject(objectList: Array<any>, object: any) {
  return objectList.filter(each => each != object)
}

export default function ObjectList() {
  return new Array<any>()
}

export function getObjects(objectList: Array<any>, type: ObjectType) {
  return objectList.filter(each => each.type === type)
}
