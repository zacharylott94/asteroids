//This function takes a function that acts
//on a single item and turns it into a function that acts on a list

export default <T>(func: Monoid<T>) => (list: Array<T>) => list.map(func)
