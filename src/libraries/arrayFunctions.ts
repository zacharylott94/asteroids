export const head = list => list[0]
export const rest = list => list.slice(1, list.length)
export const tail = list => list[list.length]
export const body = list => list.slice(0, list.length - 1)