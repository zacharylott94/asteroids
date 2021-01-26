export const hasTimeToLive = (object, ttl) => {
  const tickTTL = _ => {
    if (object.timeToLive < 1)
      object.delete();
    object.timeToLive--;
  };
  object.timeToLive = ttl
  object.updateCallbacks.push(tickTTL)
}
