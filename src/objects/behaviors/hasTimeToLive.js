export const hasTimeToLive = (object, ttl) => {
  const tickTTL = _ => {
    if (object.timeToLive < 1)
      object.delete();
    object.timeToLive--;
  };
  let timeToLive = {
    timeToLive: ttl,
    updateCallbacks: [...object.updateCallbacks ?? [], tickTTL]
  };
  return timeToLive;
};
