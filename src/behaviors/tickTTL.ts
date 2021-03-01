export default function tickTTL<T>(obj: T & ITimeToLive): T & ITimeToLive {
  return {
    ...obj,
    ttl: obj.ttl - 1
  }
}