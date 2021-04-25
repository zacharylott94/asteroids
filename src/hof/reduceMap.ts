//take a function and reduce a list with that function over each member of the list
export default func => list => list.map(obj => list.reduce(func, obj))