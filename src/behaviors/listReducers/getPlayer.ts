const getPlayer = list => list.filter(obj => obj.type === ObjectType.Player)[0]
export default getPlayer