import tickTTL from "./tickTTL"

describe('tickTTL', () => {
  it('mutates an object by subtracting 1 from its ttl property', () => {
    let obj = { ttl: 10, delete: false }
    tickTTL(obj)
    let expected = { ttl: 9, delete: false }
    expect(obj).toStrictEqual(expected)
  })
  it('sets an object\'s delete property to true if ttl is less than 1', () => {
    let obj = { ttl: 1, delete: false }
    tickTTL(obj)
    expect(obj.delete).toBe(true)
    obj = { ttl: 2, delete: false }
    tickTTL(obj)
    expect(obj.delete).toBe(false)
    obj = { ttl: 0, delete: false }
    tickTTL(obj)
    expect(obj.delete).toBe(true)
  })
})