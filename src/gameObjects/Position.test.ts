import { Settings } from "../settings.js";
import Position from "./Position.js"
import Vector from "./Vector.js";
describe('Position static class', () => {
  it('can get "real" position', () => {
    let position = Position.fromVector(Vector.fromComponents(20,20))
    expect(Position.real(position)).toStrictEqual(Vector.fromComponents(20,20))
  });

    it('can get position closest to vector', () => {
      //Mutates global Settings to test. Fair Warning
      Settings.GAME_WIDTH = 500
      Settings.GAME_HEIGHT = 500
      let position = Position.fromVector(Vector.fromComponents(50,50))
      let point = Vector.fromComponents(480,480)
      let expected = Vector.fromComponents(550,550)
      expect(Position.closestTo(position,point)).toStrictEqual(expected)
      position = Position.fromVector(Vector.fromComponents(400,250))
      point = Vector.fromComponents(0,480)
      expected = Vector.fromComponents(-100,250)
      expect(Position.closestTo(position,point)).toStrictEqual(expected)

      
    });
});