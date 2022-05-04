export const debounce = (fn: Function, ms = 1000, immediate = true) => {
  let timer: ReturnType<typeof setTimeout>

  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer)
    }

    if (immediate) {
      fn.apply(this, args)
      immediate = false
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, ms)
  }
}

export const throttle = (fn: Function, ms = 1000, immediate = true) => {
  let invoke = true

  return (...args: any[]) => {
    if (!invoke) return

    if (immediate) {
      fn.apply(this, args)
      immediate = false
    }

    invoke = false
    setTimeout(() => {
      fn.apply(this, args)
      invoke = true
    }, ms)
  }
}

const clickHandler = () => {
  console.log('handled!')
}

document
  .getElementsByClassName('debounce')[0]
  .addEventListener('click', debounce(clickHandler, 1000, false))

document
  .getElementsByClassName('throttle')[0]
  .addEventListener('click', throttle(clickHandler, 1000))
