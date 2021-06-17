export default function tickTTL<T>(obj: T & ITimeToLive): T & ITimeToLive {
  const ttl = obj.ttl - 1
  if (ttl < 1) return { ...obj, ttl, delete: true }
  return { ...obj, ttl, delete: false }
}