import tickTTL from "./tickTTL"

describe('tickTTL', () => {
  it('returns a bew object by subtracting 1 from the old ttl property', () => {
    let obj = { ttl: 10, delete: false }
    obj = tickTTL(obj)
    let expected = { ttl: 9, delete: false }
    expect(obj).toStrictEqual(expected)
  })
  it('sets an object\'s delete property to true if ttl is less than 1', () => {
    let obj = { ttl: 1, delete: false }
    obj = tickTTL(obj)
    expect(obj.delete).toBe(true)
    obj = { ttl: 2, delete: false }
    obj = tickTTL(obj)
    expect(obj.delete).toBe(false)
    obj = { ttl: 0, delete: false }
    obj = tickTTL(obj)
    expect(obj.delete).toBe(true)
  })
})