export default index => (position: TPosition): TVector => {
  if (!position) return { x: 0, y: 0 }
  return position[index]
}
