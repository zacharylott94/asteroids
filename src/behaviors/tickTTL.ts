export default function tickTTL<T>(obj: T & ITimeToLive): void {
  obj.ttl--
}