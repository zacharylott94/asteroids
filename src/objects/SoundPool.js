import Sound from "../gameLogic/Sound.js";
import { Ring } from "./Ring";

class SoundPool {
  constructor(sound, count) {
    this.pool = new Ring(count).map(() => new Sound(sound.getSrc()))
  }
  play() {
    this.pool.current().play()
    this.pool.next()
  }
  stopAll() {
    this.pool.forEach(sound => sound.stop())
  }

}



