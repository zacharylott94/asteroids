import Ring from "../src/objects/Ring.js"


describe('Ring', () => {
  it('should  be able to cycle through all values', () => {
    let ring = new Ring(1,2,3,4)
    expect(ring.current()).toBe(1)
    expect(ring.next()).toBe(2)
    expect(ring.next()).toBe(3)
    expect(ring.next()).toBe(4)
    expect(ring.next()).toBe(1)
  });
});