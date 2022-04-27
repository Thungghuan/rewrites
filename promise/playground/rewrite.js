Promise.MyAll = (promises) => {
  let count = 0
  const results = []

  return new Promise((resolve, reject) => {
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((res) => {
          results[i] = res
          count++

          if (count === promises.length) resolve(results)
        })
        .catch(reject)
    })
  })
}

Promise.MyRace = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      Promise.resolve(p).then(resolve, reject)
    })
  })
}

Promise.MyAny = (promises) => {
  let count = 0
  const reasons = []

  return new Promise((resolve, reject) => {
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(resolve)
        .catch((e) => {
          reasons[i] = e
          count++

          if (count === promises.length) reject(reasons)
        })
    })
  })
}

Promise.MyAllSettled = (promises) => {
  let count = 0
  const results = []

  return new Promise((resolve, reject) => {
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((res) => {
          results[i] = {
            status: 'fulfilled',
            value: res
          }
          count++

          if (count === promises.length) {
            resolve(results)
          }
        })
        .catch((res) => {
          results[i] = {
            status: 'rejected',
            value: res
          }
          count++

          if (count === promises.length) {
            resolve(results)
          }
        })
    })
  })
}
