

export default function ObjectList() {
  return {
    asteroids: <any>[],
    player: <any>[],
    particles: <any>[],
    projectiles: <any>[],
  }
}


export function removeDeleted(objectList) {
  let newList = ObjectList()
  for (let [k, v] of Object.entries(objectList)) {
    //@ts-ignore
    newList[k] = v.filter((obj) => !obj.delete)
  }
  return newList
}
