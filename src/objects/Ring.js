class Ring extends Array {
  constructor(...args) {
    super(...args)
    this.currentIndex = 0
  }

  next() {
    this.currentIndex++
    if (this.currentIndex === this.length)
      this.currentIndex = 0
    return this.current()
  }

  current() {
    return this[this.currentIndex]
  }

  previous() {
    this.currentIndex--
    if (this.currentIndex < 0)
      this.currentIndex = this.length - 1
    return this.current()
  }
}
export default Ring
