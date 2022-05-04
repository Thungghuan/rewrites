import { throttle } from './utils'

const progressRange: HTMLInputElement =
  document.querySelector('.progress-range')!
const progressNum: HTMLDivElement = document.querySelector('.progress-num')!

const leftHalf: HTMLDivElement = document.querySelector(
  '.ring-progress .left-half'
)!
const rightHalf: HTMLDivElement = document.querySelector(
  '.ring-progress .right-half'
)!
const ringMask: HTMLDivElement = document.querySelector('.ring-progress .mask')!

const inputHandelr = (e: InputEvent) => {
  const target = e.target as HTMLInputElement
  progressNum.textContent = target.value

  const value = +target.value

  if (value <= 50) {
    rightHalf.style.transform = `rotate(${value * 3.6 - 135}deg)`
    ringMask.style.transform = 'translateY(0%)'
    leftHalf.style.transform = `rotate(${value * 3.6 - 135}deg)`
  } else {
    rightHalf.style.transform = 'rotate(45deg)'
    ringMask.style.transform = `translateY(-${value * 2 - 100}%)`
    leftHalf.style.transform = `rotate(${value * 3.6 - 135}deg)`
  }
}

progressRange.addEventListener('input', throttle(inputHandelr, 100, true))
