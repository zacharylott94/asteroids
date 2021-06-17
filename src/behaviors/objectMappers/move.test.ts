import Position from "../../dataStructures/position/Position.js"
import move from "./move.js"

describe('move', () => {
  it('takes an object and returns a new object with its old position plus velocity', () => {
    let obj = {
      position: Position.fromComponents(10, 10),
      velocity: <TVector>[10, 10],
      dummy: "dummy data" //just to prove an object can have more properties than required
    }
    let expected = {
      position: Position.fromComponents(20, 20),
      velocity: <TVector>[10, 10],
      dummy: "dummy data"
    }
    obj = move(obj)
    expect(obj).toStrictEqual(expected)
  })
})