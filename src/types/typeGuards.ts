export const isCollidedProjectile = obj => isProjectile(obj) && hasCollided(obj)
export const durabilityLT1 = obj => obj?.durability < 1
export const hasCollided = obj => obj.hasCollided


//property checks

export const hasProperties = (...props: string[]) => obj => props.reduce((l, r) => l && r in obj, true)
export const isCollidable = hasProperties("hasCollided", "radius")
export const isMoveable = hasProperties("velocity", "position")
export const hasDurability = hasProperties("durability")
export const isRotatable = hasProperties("rotation")
export const hasTTL = hasProperties("ttl")


//object type checks

export const isObject = (...types: ObjectType[]) => obj => types.reduce((l, r) => l || obj.type === r, false)
export const isProjectile = isObject(ObjectType.Projectile)
export const isPlayer = isObject(ObjectType.Player)
export const isAsteroid = isObject(ObjectType.Asteroid)
