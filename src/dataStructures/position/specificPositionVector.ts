export default index => (position: TPosition): TVector => {
  if (!position) return [0, 0]
  return position[index]
}
