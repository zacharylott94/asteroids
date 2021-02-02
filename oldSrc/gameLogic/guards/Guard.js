export const objectGuard = (object, expectedType) => {
  if (object.type !== expectedType) throw new TypeError(`Object did not have type property of ${expectedType}.`)
}

export const classGuard = (object, expectedClass) => {
  if (object.constructor.name !== expectedClass) 
    throw new TypeError(`Object did not have class name of ${expectedClass}. Had class name of ${object.constructor.name}.`)
}

export const typeofGuard = (variable, expectedType) => {
  if (typeof variable !== expectedType) throw new TypeError(`${variable} is not of type ${expectedType}. Was type of ${typeof variable}.`)
}