const curry = (fn: Function, ...args: any[]) => {
  return function (...restArgs: any[]) {
    const allArgs = args.concat(...restArgs)

    if (allArgs.length >= fn.length) {
      return fn(...allArgs)
    } else {
      return curry(fn, ...allArgs)
    }
  }
}

const add = (a: number, b: number) => a + b
const addCurry = curry(add, 1)

console.log(addCurry(1, 2))
console.log(addCurry(2))

interface Person {
  name: string
  gender?: string
}

const person: Person[] = [{ name: 'kevin' }, { name: 'daisy' }]

const map = <T>(key: keyof T, obj: T) => {
  return obj[key]
}
const prop = curry(map)

console.log(person.map(prop('name')))

const fn = (a: any, b: any, c: any) => [a, b, c]
const curryFn = curry(fn)

console.log(curryFn('a', 'b', 'c'))
console.log(curryFn('a', 'b')('c'))
console.log(curryFn('a')('b')('c'))
