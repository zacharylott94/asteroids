import Position from "../dataStructures/position/Position.js"
import Vector from "../dataStructures/Vector.js"
import { hasTTL, isAsteroidOrParticle, isCollidable, isMoveable, isPlayer, isProjectile, isRotatable } from "./typeGuards.js"

describe('Typeguards', () => {
  it('isMoveable', () => {
    let object = {
      velocity: Vector.fromComponents(2, 2),
      position: Position.fromComponents(2, 2)
    }
    let object2 = {}
    let object3 = {
      velocity: Vector.ZERO
    }
    expect(isMoveable(object)).toBe(true)
    expect(isMoveable(object2)).toBe(false)
    expect(isMoveable(object3)).toBe(false)
  })

  it('isRotatable', () => {
    let object = {
      rotation: 10
    }
    expect(isRotatable(object)).toBe(true)
    let object2 = {}
    expect(isRotatable(object2)).toBe(false)
  })
  it('hassTTL', () => {
    const obj = {
      ttl: 100
    }
    const noTTL = {
      noTTL: true
    }
    expect(hasTTL(obj)).toBe(true)
    expect(hasTTL(noTTL)).toBe(false)
  })

  it('isPlayer', () => {
    const obj1 = {
      type: ObjectType.Player
    }
    const obj2 = {
      type: ObjectType.Asteroid
    }
    const obj3 = {}
    expect(isPlayer(obj1)).toBe(true)
    expect(isPlayer(obj2)).toBe(false)
    expect(isPlayer(obj3)).toBe(false)
  })

  it('isCollidable', () => {
    const obj1 = {
      type: ObjectType.Particle,
    }
    const obj2 = {
      type: ObjectType.Player,
      radius: 1
    }
    const obj3 = {}
    expect(isCollidable(obj1)).toBe(false)
    expect(isCollidable(obj2)).toBe(true)
    expect(isCollidable(obj3)).toBe(false)
  })
  it('isProjectile', () => {
    const obj = { type: ObjectType.Projectile }
    const obj2 = { type: ObjectType.Player }
    const obj3 = {}
    expect(isProjectile(obj)).toBe(true)
    expect(isProjectile(obj2)).toBe(false)
    expect(isProjectile(obj3)).toBe(false)
  })
  it('isAsteroidOrParticle', () => {
    const obj = { type: ObjectType.Asteroid }
    const obj2 = { type: ObjectType.Particle }
    const obj3 = { type: ObjectType.Player }
    const obj4 = {}
    expect(isAsteroidOrParticle(obj)).toBe(true)
    expect(isAsteroidOrParticle(obj2)).toBe(true)
    expect(isAsteroidOrParticle(obj3)).toBe(false)
    expect(isAsteroidOrParticle(obj4)).toBe(false)
  })
})