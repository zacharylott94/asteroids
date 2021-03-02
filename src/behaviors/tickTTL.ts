export default function tickTTL(obj: IDeleteable & ITimeToLive): void {
  obj.ttl--
  if (obj.ttl < 1)
    obj.delete = true
}