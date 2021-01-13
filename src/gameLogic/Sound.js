class Sound {
  constructor(url){
    this.media = new Audio(url)
    this.media.volume = .5
  }

  play() {
    this.media.currentTime = 0
    this.media.play()
  }

  stop() {
    this.media.pause()
  }
}

export default Sound