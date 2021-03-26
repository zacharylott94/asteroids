export function resetStorage() {
  localStorage.clear()
}

export function getControllerMapping(keys) {
  let mappings: any[] = []
  for (let each of keys)
    mappings.push(getButtonMapping(each))
  return mappings
}

export function getButtonMapping(action: string) {
  let mapping = localStorage.getItem(action)
  return mapping === null ? null : [action, JSON.parse(mapping)]
}

export function setButtonMapping([button, mapping]: [string, any]): void {
  localStorage.setItem(button, JSON.stringify(mapping))
}

export function setControllerMapping(mapping: [string, string][]): void {
  for (let [key, value] of mapping)
    setButtonMapping([key, value])
}
