import { hasCollided, isPlayer, isProjectile } from "../types/typeGuards.js"

export const getPlayer = (stator: Stator<GameObject[]>) => () => stator().filter(isPlayer)[0]

export const getDeletedAsteroids = (stator: Stator<GameObject[]>) => () => {
  let deletedObjects = stator()
    .filter(obj => obj.delete)
    .filter(obj => obj.type === ObjectType.Asteroid)
  return deletedObjects
}

export const getProjectiles = (stator: Stator<GameObject[]>) => () => {
  return stator().filter(isProjectile)
}
export const getCollidedProjectiles = (stator: Stator<GameObject[]>) => () => {
  return stator().filter(isProjectile).filter(hasCollided)
}