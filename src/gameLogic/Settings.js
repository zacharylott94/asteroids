//This is for all game constants for easy reference and tweaking

class Settings {
  //Used in AsteroidSpawner
  static PLAYER_SAFETY_RADIUS = 200
  static MIN_ASTEROID_VELOCITY = .1
  static ASTEROID_DIFFICULTY_VELOCITY_RATIO = .5

  //Used in Asteroid
  static LARGE_ASTEROID_RADIUS = 40
  static MEDIUM_ASTEROID_RADIUS = 25
  static SMALL_ASTEROID_RADIUS = 16

  //Used in Controller
  static BUTTONS = {
    fire: "Enter",
    left: "a",
    right: "d",
    accelerate: "w",
    reset: "o",
    pause: "p"
  }
  //Used in EventCoordinator
  static EVENTS = {
    GamePaused: "pause",
    ProjectileDeleted: "ProjectileDeleted",
    ObjectDeleted: "ObjectDeleted",
    GameReset: "reset"
  }

  //Used in Player
  static PLAYER_RADIUS = 6
  static IMPULSE = .01
  static ROTATION_RATE = 2

  //Used in Projectile
  static PROJECTILE_SPEED = 5
  static PROJECTILE_SIZE = 5
  static PROJECTILE_TIME_TO_LIVE = 100 //in physics frames

  //Used in Game
  static STARTING_DIFFICULTY = 1
  static DIFFICULTY_RAMPUP = .01
  static FRAMERATE = 60
  static PHYSICS_FRAMERATE = 60

  //Used in Graphics
  static RENDER_DEBUG = true
}

export default Settings

