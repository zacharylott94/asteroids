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
  it('should be able to cycle backwards through all values', () => {
    let ring = new Ring(1,2,3,4)
    expect(ring.current()).toBe(1)
    expect(ring.previous()).toBe(4)
    expect(ring.previous()).toBe(3)
    expect(ring.previous()).toBe(2)
    expect(ring.previous()).toBe(1)
  });
  it('should expose map', () => {
    let ring = new Ring(1,2,3,4)
    ring.map(e => e+1)
    expect(ring.array).toStrictEqual([2,3,4,5])
  });
});