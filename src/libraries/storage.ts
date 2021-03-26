export function resetStorage() {
  localStorage.clear()
}

export function getControllerMapping(keys) {
  let mappings
  for (let each of keys)
    mappings.push([each, getButtonMapping(each)])
  return mappings
}

export function getButtonMapping(button: string): [string, string] | null {
  let mapping = localStorage.getItem(button)
  return mapping === null ? null : [button, mapping]
}

export function setButtonMapping([button, mapping]: [string, string]): void {
  localStorage.setItem(button, mapping)
}

export function setControllerMapping(mapping: [string, string][]): void {
  for (let [key, value] of mapping)
    setButtonMapping([key, value])
}
