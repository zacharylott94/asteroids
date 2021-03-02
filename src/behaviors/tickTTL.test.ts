import tickTTL from "./tickTTL"

describe('tickTTL', () => {
  it('mutates an object by subtracting 1 from its ttl property', () => {
    let obj = { ttl: 10 }
    tickTTL(obj)
    let expected = { ttl: 9 }
    expect(obj).toStrictEqual(expected)
  })
})