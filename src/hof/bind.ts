export default (func1, func2) => (...args) => (func2(func1(...args)))