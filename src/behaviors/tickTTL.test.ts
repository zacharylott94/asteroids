import tickTTL from "./tickTTL"

describe('tickTTL', () => {
  it('returns a new object with a ttl property one less than the object it was passed', () => {
    let obj = { ttl: 10 }
    let result = tickTTL(obj)
    let expected = { ttl: 9 }
    expect(result).toStrictEqual(expected)
  })
})