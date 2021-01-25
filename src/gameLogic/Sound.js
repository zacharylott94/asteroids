const Sound = (url) => {
  let sound = new Audio(url)
  sound.volume = .5

  const play = _ => {
    sound.currentTime = 0
    sound.play()
  }

  const stop = _ => {
    sound.pause()
  }

  const getSrc = _ => sound.src

  return {
    play,
    stop,
    getSrc,
  }

}

export default Sound