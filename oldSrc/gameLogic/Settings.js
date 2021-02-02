//This is for all game constants for easy reference and tweaking

const Settings  = {

  GAME_WIDTH:  700,
  GAME_HEIGHT:  500,

  //Used in AsteroidSpawner
  PLAYER_SAFETY_RADIUS:  200,
  MIN_ASTEROID_VELOCITY:  .1,
  ASTEROID_DIFFICULTY_VELOCITY_RATIO:  .5,

  //Used in Asteroid
  SPREAD:  45,
  LARGE_ASTEROID_RADIUS:  40,
  MEDIUM_ASTEROID_RADIUS:  25,
  SMALL_ASTEROID_RADIUS:  16,
  ASTEROID_DURABILITY:  3,

  //Used in Controller
  BUTTONS:  {
    fire: "Enter",
    left: "a",
    right: "d",
    accelerate: "w",
    reset: "o",
    pause: "p"
  },


  //Used in Player
  PLAYER_RADIUS:  6,
  IMPULSE:  .01,
  ROTATION_RATE:  2,

  //Used in Projectile
  PROJECTILE_SPEED:  5,
  PROJECTILE_SIZE:  2,
  PROJECTILE_TIME_TO_LIVE:  100, //in physics frames

  //Used in Game
  STARTING_DIFFICULTY:  1,
  DIFFICULTY_RAMPUP:  .01,
  FRAMERATE:  60,
  PHYSICS_FRAMERATE:  60,

  //Used in Graphics
  RENDER_DEBUG:  false,
}

export default Settings

