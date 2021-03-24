import mapIf from "./mapIf"

describe('mapIf', () => {
  it('maps over a list, but only maps a value if it meets the given condition', () => {
    let objects = [
      { type: "shiny", name: "knife" },
      { type: "dull", name: "ball" },
      { type: "shiny", name: "coin" }
    ]
    function isShiny(obj: any): boolean {
      if (obj.type === "shiny") return true
      return false
    }
    function makeGlow(obj: any): any {
      return { ...obj, type: "glowing" }
    }

    let answer = [
      { type: "glowing", name: "knife" },
      { type: "dull", name: "ball" },
      { type: "glowing", name: "coin" }
    ]
    let result = mapIf(isShiny, makeGlow, objects)
    expect(result).toStrictEqual(answer)
  })
})