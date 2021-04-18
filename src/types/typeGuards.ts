export const isMoveable = (object) => "velocity" in object && "position" in object
export const isRotatable = (object) => "rotation" in object
export const hasTTL = (object) => "ttl" in object
export const isPlayer = (object) => object.type === ObjectType.Player
export const isCollidable = (Object) => (Object.type !== ObjectType.Particle) && ("radius" in Object)
export const isProjectile = obj => obj.type === ObjectType.Projectile
export const isAsteroidOrParticle = obj => obj.type === ObjectType.Particle || obj.type === ObjectType.Asteroid