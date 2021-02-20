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

export enum objectType {
  Asteroid,
  Projectile,
  Player,
}
export default objectList