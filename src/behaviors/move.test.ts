import Position from "../dataStructures/Position.js"
import move from "./move.js"

describe('move', () => {
  it('takes an object and mutates its position by adding its velocity', () => {
    let obj = {
      position: Position.fromComponents(10, 10),
      velocity: {
        x: 10,
        y: 10,
      },
      dummy: "dummy data" //just to prove an object can have more properties than required
    }
    let expected = {
      position: Position.fromComponents(20, 20),
      velocity: {
        x: 10,
        y: 10,
      },
      dummy: "dummy data"
    }
    move(obj)
    expect(obj).toStrictEqual(expected)
  })
})