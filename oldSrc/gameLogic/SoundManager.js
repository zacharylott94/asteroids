import Ring from "../objects/Ring.js"
import Random from "./random.js"
import Sound from "./Sound.js"
class SoundPool extends Ring {
  constructor(url, count){
    super(count)
    this.fill("dummy")
    this.map(() => new Sound(url))
  }
}
class SoundManager {
  static dict ={
    shoot = [ 
      new SoundPool("/asteroids/src/sfx/shoot.wav",3),
      new SoundPool("/asteroids/src/sfx/shoot2.wav",3),
      new SoundPool("/asteroids/src/sfx/shoot3.wav",3),
    ],
    shatter = [
      new SoundPool("/asteroids/src/sfx/asteroid_shatter.wav",20),
      new SoundPool("/asteroids/src/sfx/asteroid_shatter2.wav",20),
      new SoundPool("/asteroids/src/sfx/asteroid_shatter3.wav",20),
    ],
    hit = [
      new SoundPool("/asteroids/src/sfx/asteroid_hit.wav",20),
      new SoundPool("/asteroids/src/sfx/asteroid_hit2.wav",20),
      new SoundPool("/asteroids/src/sfx/asteroid_hit3.wav",20),
    ],
    kill = [
      new SoundPool("/asteroids/src/sfx/player_kill.wav",1)
    ]
  }
  


  static getRandomSound(sound) {
    const soundVariants = SoundManager.dict[sound]
    return SoundManager.getSound(sound,Random.int(soundVariants.length-1))
  }
  static getSound(sound,variant=0){
    const soundVariants = SoundManager.dict[sound]
    const soundVariantPool = soundVariants[variant]
    const soundVariantChannel = soundVariantPool.next()
    return soundVariantChannel
  }
}

