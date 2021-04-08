//conditional takes a function that returns a boolean and a function to conditionally execute
//Assumptions: 
//condition and functor TAKE THE SAME ONE ARGUMENT

export function conditional(condition, functor){
  return function(argument){
    if (condition(argument)) return functor(argument)
    return argument
  }
}