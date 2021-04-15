//conditional takes a function that returns a boolean and a function to conditionally execute
//Assumptions: 
//condition and map TAKE THE SAME ONE ARGUMENT

export function conditional<T>(condition: Condition, monoid: Monoid<T>) {
  return function (argument: T) {
    if (condition(argument)) return monoid(argument)
    return argument
  }
}