import ObjectList from "../src/gameLogic/ObjectList.js"

//Stubs
class Asteroid {
  constructor() {

  }
}
class Projectile {
  constructor() {

  }
}
describe('ObjectList', () => {
  it('should be able to count objects in it', () => {
    let asteroid1 = new Asteroid()
    let asteroid2 = new Asteroid()
    let projectile = new Projectile()
    ObjectList.add(asteroid1)
    expect(ObjectList.count("Asteroid")).toBe(1)
    ObjectList.add(asteroid2)
    expect(ObjectList.count("Asteroid")).toBe(2)
    ObjectList.add(projectile)
    expect(ObjectList.count("Projectile")).toBe(1)
    expect(ObjectList.count("Asteroid")).toBe(2)
    ObjectList.delete(asteroid1)
    expect(ObjectList.count("Projectile")).toBe(1)
    expect(ObjectList.count("Asteroid")).toBe(1)
    ObjectList.delete(projectile)
    expect(ObjectList.count("Projectile")).toBe(0)
    expect(ObjectList.count("Asteroid")).toBe(1)

  });
});