export interface IVector {
  x:number
  y:number
}

// export function Vector(x:number, y:number): IVector {
//   return {x,y}
// }

export default class Vector {

  static fromComponents(x:number, y:number):IVector {
    return {x,y}
  }
  static fromDegreesAndMagnitude(degrees:number, magnitude:number) :IVector {
    const angle:number = Math.PI * 2 / 360 * degrees
    const x:number = Math.cos(angle)
    const y:number = Math.sin(angle)
    return Vector.fromComponents(x * magnitude, y * magnitude)
  }
  static add(vec1:IVector, vec2:IVector): IVector{
    return Vector.fromComponents(vec1.x + vec2.x, vec1.y + vec2.y)
  }
  static subtract(vec1:IVector, vec2:IVector):IVector {
    return Vector.fromComponents(vec1.x - vec2.x, vec1.y - vec2.y)
  }

  static scale(vector: IVector, ...scalars: number[]): IVector{
    const scalar:number = scalars.reduce((acc, next) => {return acc * next})
    return Vector.fromComponents(vector.x*scalar, vector.y*scalar)
  }
  static degrees(vector: IVector): number {
    const rad:number = Vector.radians(vector)
    let deg:number = rad * 360 / 2 / Math.PI
    deg = deg < 0 ? deg + 360: deg
    return deg
  }
  static radians(vector: IVector): number {
    return Math.atan2(Vector.normalize(vector).y, Vector.normalize(vector).x)
  }
  static normalize(vector: IVector): IVector {
    return Vector.fromComponents(vector.x/Vector.magnitude(vector), vector.y/Vector.magnitude(vector))
  }
  static magnitude(vector: IVector): number {
    return Math.sqrt(Vector.squaredMagnitude(vector))
  }
  static squaredMagnitude(vector: IVector): number {
    const x = vector.x
    const y = vector.y
    return (x*x + y*y)
  }
  static distanceSquared(vector1: IVector, vector2:IVector): number {
    let difference: IVector = Vector.subtract(vector1,vector2)
    let squaredMagnitude: number = Vector.squaredMagnitude(difference)
    return squaredMagnitude
  }
  static distance(vector1: IVector, vector2:IVector): number {
    return Math.sqrt(Vector.distanceSquared(vector1,vector2))
  }
  static dotProduct(vector1:IVector, vector2:IVector):number{
    return ((vector1.x * vector2.x) + (vector1.y * vector2.y))
  }

  static UP = Vector.fromComponents(0,-1)
  static DOWN = Vector.fromComponents(0,1)
  static LEFT = Vector.fromComponents(-1,0)
  static RIGHT = Vector.fromComponents(1,0)
  static ZERO = Vector.fromComponents(0,0)

} 

