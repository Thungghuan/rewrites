import { MyPromise } from '..'

let p1 = new Promise<number>((resolve, reject) => {
  resolve(10)
})

p1.then((res) => {
  console.log('fulfilled', res)
  return 2 * res
}).then((res) => {
  console.log('fulfilled', res)
})
