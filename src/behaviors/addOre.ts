import { isPlayer } from "../hof/conditions.js"

export const addOreSetup = objectList => oreCount => {
  const player = objectList().filter(isPlayer)[0]
  if (!player) return oreCount
  const oreCollidedCount = player.hasCollidedWith.filter(type => type === ObjectType.Ore).length
  return oreCount + oreCollidedCount
}