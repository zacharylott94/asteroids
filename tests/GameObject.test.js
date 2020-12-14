import GameObject from "../src/objects/GameObject.js"
import Vector from "../src/objects/Vector.js"
describe('GameObject', () => {
  it('should move', () => {
    let position = new Vector()
    let velocity = new Vector(1,1)
    let obj = new GameObject(position,velocity,() =>{}, 0)
    GameObject.move(obj)
    expect(obj.position.x).toBe(1)
    expect(obj.position.y).toBe(1)

  });
  test('GameObject throws error for incorrect parameters', () => {
    expect(() => {new GameObject()}).toThrow(TypeError)
    expect(() => {new GameObject(1,1,1,NaN)}).toThrow(TypeError)
  });
});