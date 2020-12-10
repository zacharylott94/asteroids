import GameObject from "../src/objects/GameObject.js"
describe('GameObject', () => {
  it('should move', () => {
    let position = {x:0, y:0}
    let velocity = {x:1, y:1}
    let obj = GameObject.create(position,velocity)
    GameObject.move(obj)
    expect(obj.position.x).toBe(1)
    expect(obj.position.y).toBe(1)

  });
});