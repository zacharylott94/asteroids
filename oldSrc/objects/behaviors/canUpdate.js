export const canUpdate = (object) => {
  object.update = _ => {
    // projectile.move()
    object.updateCallbacks.forEach(callback => callback());
  };
};
