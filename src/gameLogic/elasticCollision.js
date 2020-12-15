import Vector from "../objects/Vector.js"
function elasticCollision(obj1, obj2) {
  //get unit normal between objects. As in, find the magnitude, then normalize
  const unitNormalVector = Vector.subtract(obj1.position, obj2.position).normalize()
  const unitTangentVector = Vector.tangent(unitNormalVector)
  const vel1Normal = Vector.dotProduct(unitNormalVector,obj1.velocity)
  const vel1Tangent = Vector.dotProduct(unitTangentVector,obj1.velocity)
  const vel2Normal = Vector.dotProduct(unitNormalVector,obj2.velocity)
  const vel2Tangent = Vector.dotProduct(unitTangentVector,obj2.velocity)
  const vel1NormalPost = oneDimensionalCollision(vel1Normal,vel2Normal, obj1.radius, obj2.radius)
  const vel2NormalPost = oneDimensionalCollision(vel2Normal,vel1Normal, obj2.radius, obj1.radius)
  const vel1NormalVector = unitNormalVector.scale(vel1NormalPost)
  const vel2NormalVector = unitNormalVector.scale(vel2NormalPost)
  const vel1TangentVector = unitTangentVector.scale(vel1Tangent)
  const vel2TangentVector = unitTangentVector.scale(vel2Tangent)
  const finalVel1 = Vector.add(vel1NormalVector,vel1TangentVector)
  const finalVel2 = Vector.add(vel2NormalVector,vel2TangentVector)
  obj1.velocity = finalVel1
  obj2.velocity = finalVel2
  
}


function oneDimensionalCollision(v1, v2, m1, m2) {
  const sumMass = m1 + m2
  const diffMass = m1 - m2
  return ((v1*diffMass + 2*m2*v2)/sumMass)
}

export default elasticCollision