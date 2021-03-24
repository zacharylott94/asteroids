export default function apply(funcToApply: Function, list: Array<any>): Array<any> {
  return funcToApply(...list)
}