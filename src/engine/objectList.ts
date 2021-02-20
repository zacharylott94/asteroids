let objectList: any[][] = [ //had weird type hangups
  new Array<IAsteroid>(),
  new Array<IProjectile>(),
  new Array<IPlayer>(),
]
// let objectList = {
//   asteroids: new Array<IAsteroid>(),
//   projectiles: new Array<IProjectile>(),
//   players: new Array<IPlayer>(),
// }

export function deleteObject(list: Array<(IAsteroid | IProjectile)>, object: any) {
  return list.filter(each => each != object)
}

export enum objectType {
  Asteroid,
  Projectile,
  Player,
}
export default objectList