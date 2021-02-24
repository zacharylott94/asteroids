let objectList: Array<(IAsteroid | IRotatableObject)>[] = [ //had weird type hangups
  new Array<IAsteroid>(),
  new Array<IRotatableObject>(),
  new Array<IRotatableObject>(),
]
// let objectList = {
//   asteroids: new Array<IAsteroid>(),
//   projectiles: new Array<IProjectile>(),
//   players: new Array<IPlayer>(),
// }

export function deleteObject(list: Array<(IAsteroid | IRotatableObject)>, object: any) {
  return list.filter(each => each != object)
}

export enum objectType {
  Asteroid,
  Projectile,
  Player,
}
export default objectList