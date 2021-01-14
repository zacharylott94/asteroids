class Sound extends Audio{
  constructor(url){
    super(url)
    this.volume = .5
  }

  play() {
    this.currentTime = 0
    super.play()
  }

  stop() {
    super.pause()
  }

  getSrc() {
    return this.src
  }
}

export default Sound