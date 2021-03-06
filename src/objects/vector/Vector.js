import Settings from "../../gameLogic/Settings.js"

class Vector{
  
  constructor(x, y) {
    if (y === undefined && x !== undefined) throw new TypeError('y is undefined')
    if (y !== undefined && x === undefined) throw new TypeError('x is undefined')
    x = x === undefined? 0 : x
    y = y === undefined? 0 : y
    if (typeof x != "number" || 
        typeof y != "number" || 
        Number.isNaN(x)      || 
        Number.isNaN(y)){
      throw new TypeError('Passed parameters were not of type Number')
    } else {
      this.x = x
      this.y = y
    }
    
  }
  
  static fromDegreesAndMagnitude(degrees, magnitude) {
    const angle = Math.PI * 2 / 360 * degrees
    const x = Math.cos(angle)
    const y = Math.sin(angle)
    return new Vector(x * magnitude, y * magnitude)
  }
  static add(vec1,vec2){
    return new Vector(vec1.x + vec2.x, vec1.y + vec2.y)
  }
  static subtract(vec1, vec2) {
    return new Vector(vec1.x - vec2.x, vec1.y - vec2.y)
  }
  
  scale(...scalars){
    const scalar = scalars.reduce((acc, next) => {return acc * next})
    return new Vector(this.x*scalar, this.y*scalar)
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
    return Math.atan2(this.normalize().y, this.normalize().x)
  }
  magnitude() {
    return Math.sqrt(this.squaredMagnitude())
  }
  squaredMagnitude() {
    const x = this.x
    const y = this.y
    return (x*x + y*y)
  }
  static distanceSquared(vector1, vector2){
    let gameWidth = Settings.GAME_WIDTH
    let gameHeight = Settings.GAME_HEIGHT
    let dx = Math.abs(vector2.x - vector1.x)
    let dy = Math.abs(vector2.y - vector1.y)
    let cx = gameWidth - dx //the c stands for complimentary, lol
    let cy = gameHeight - dy
    dx =  dx <= cx? dx: cx  //if dx is smaller than cx, use dx, otherwise cx
    dy =  dy <= cy? dy: cy //if dy is smaller than cy, use dy, otherwise cy
    
    // console.log(`dx:${dx},dy:${dy},cx:${cx},cy:${cy}`)
    dx *= dx
    dy *= dy
    const sum = dx + dy
    return sum
  }
  static distance(vector1, vector2, height, width){
    return Math.sqrt(Vector.distanceSquared(vector1, vector2, height, width))
  }
  static dotProduct(vector1, vector2){
    return ((vector1.x * vector2.x) + (vector1.y * vector2.y))
  }
  static tangent(vector) {
    return new Vector(vector.y*-1, vector.x)
  }
  
  static UP()    {return new Vector(0,-1)}
  static DOWN()  {return new Vector(0,1) }
  static LEFT()  {return new Vector(-1,0)}
  static RIGHT() {return new Vector(1,0) }
}

export default Vector