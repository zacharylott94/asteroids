export default function tickTTL(obj: IDeleteable & ITimeToLive): IDeleteable & ITimeToLive {
  let deleteIt = false
  let ttl = obj.ttl - 1
  if (ttl < 1)
    deleteIt = true
  return { ...obj, ttl, delete: deleteIt }
}