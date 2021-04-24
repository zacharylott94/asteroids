export default (list1, list2) => {
  if (list1.length > list2.length) return list1.map((val, index) => [val, list2[index]])
  return list2.map((val, index) => [list1[index], val])
}