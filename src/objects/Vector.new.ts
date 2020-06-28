class Vector{
  x: number
  y: number
  constructor(x?: number, y?: number) {
    this.x = x || 0
    this.y = y || 0
  }
  static fromDegreesAndMagnitude(degrees: number, magnitude: number) {
    const angle = Math.PI * 2 / 360 * degrees
    const x = Math.cos(angle)
    const y = Math.sin(angle)
    return new Vector(x * magnitude, y * magnitude)
  }
  static add(vec1:Vector,vec2:Vector){
    return new Vector(vec1.x + vec2.x, vec1.y + vec2.y)
  }
  degrees() {
    const rad = this.radians()
    const deg = rad * 360 / 2 / Math.PI
    return deg
  }
  normalize() {
    return new Vector(this.x/this.magnitude(), this.y/this.magnitude())
  }
  radians() {
    return Math.asin(this.normalize().y)
  }
  magnitude() {
    const x: number = this.x
    const y: number = this.y
    return Math.sqrt(x*x + y*y)
  }
}

export default Vector