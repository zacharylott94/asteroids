export const isMoveable = (object) => "velocity" in object && "position" in object
export const isRotatable = (object) => "rotation" in object
export const hasTTL = (object) => "ttl" in object
export const isPlayer = (object) => object.type === ObjectType.Player
export const isCollidable = (Object) => ("hasCollided" in Object) && ("radius" in Object)
export const isProjectile = obj => obj.type === ObjectType.Projectile
export const isAsteroidOrParticle = obj => obj.type === ObjectType.Particle || obj.type === ObjectType.Asteroid
export const isAsteroid = obj => obj.type === ObjectType.Asteroid
export const hasCollided = obj => obj.hasCollided
export const hasDurability = obj => "durability" in obj
export const isCollidedProjectile = obj => isProjectile(obj) && hasCollided(obj)
export const durabilityZero = obj => obj?.durability < 1
