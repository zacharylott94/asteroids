import ObjectPool from "../src/gameLogic/ObjectPool.js"

//Stubs
class Asteroid {
  constructor() {

  }
}
class Projectile {
  constructor() {

  }
}
describe('ObjectPool', () => {
  it('should be able to count objects in it', () => {
    let asteroid1 = new Asteroid()
    let asteroid2 = new Asteroid()
    let projectile = new Projectile()
    ObjectPool.add(asteroid1)
    expect(ObjectPool.count("Asteroid")).toBe(1)
    ObjectPool.add(asteroid2)
    expect(ObjectPool.count("Asteroid")).toBe(2)
    ObjectPool.add(projectile)
    expect(ObjectPool.count("Projectile")).toBe(1)
    expect(ObjectPool.count("Asteroid")).toBe(2)
    ObjectPool.delete(asteroid1)
    expect(ObjectPool.count("Projectile")).toBe(1)
    expect(ObjectPool.count("Asteroid")).toBe(1)
    ObjectPool.delete(projectile)
    expect(ObjectPool.count("Projectile")).toBe(0)
    expect(ObjectPool.count("Asteroid")).toBe(1)

  });
});