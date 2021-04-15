export function isMoveable(object: any): boolean {
  return ("velocity" in object && "position" in object)
}

export function isRotatable(object: any): boolean {
  return ("rotation" in object)
}

export function isUpdateable(object: any): boolean {
  return ("update" in object)
}

export function hasTTL(object: any): boolean {
  return ("ttl" in object)
}

export function isPlayer(object: any): boolean {
  return (object.type === ObjectType.Player)
}

export function isCollidable(Object: any): boolean {
  return (Object.type !== ObjectType.Particle)
}

export let isNotPlayer = obj => !isPlayer(obj)

export let isProjectile = obj => obj.type === ObjectType.Projectile

export let isAsteroidOrParticle = obj => obj.type === ObjectType.Particle || obj.type === ObjectType.Asteroid