export function isMoveable(object:any):boolean {
  if ("velocity" in object && "position" in object) return true
  return false
}

export function isRotatable(object:any):boolean {
  if ("rotation" in object) return true
  return false
}