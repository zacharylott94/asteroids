class Ring {
  constructor(...args) {
    this.currentIndex = 0
    if (args.length === 1) this.array = new Array(args[0])
    else this.array = new Array(...args)
  }

  next() {
    this.currentIndex++
    if (this.currentIndex === this.array.length)
      this.currentIndex = 0
    return this.current()
  }

  current() {
    return this.array[this.currentIndex]
  }

  previous() {
    this.currentIndex--
    if (this.currentIndex < 0)
      this.currentIndex = this.array.length - 1
    return this.current()
  }
  map(func) {
    console.log(this.array)
    this.array = this.array.map(func)
    console.log(this.array)
  }
}
export default Ring
