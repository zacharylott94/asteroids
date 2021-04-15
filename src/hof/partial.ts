//Partially applies arguments to a function.
//Yes, this can be done with function.bind, but I think that is ugly.
//Plus, you have to bind undefined to the first argument to skip
//binding 'this'.
export const partial = (func, ...args) => (...moreArgs) => func(...args, ...moreArgs)
