export default function mapIf(conditional: Function, mapper: Function, list: any[]): any[] {
  function testThenMap(value: any) {
    if (conditional(value))
      return mapper(value)
    return value
  }
  return list.map(testThenMap)
}