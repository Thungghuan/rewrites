import { PromiseExecutor, PromiseStatus } from './types'

export class MyPromise<T = unknown> {
  static PENDING: PromiseStatus = 'pending'
  static FUFFILED: PromiseStatus = 'fulfilled'
  static REJECTED: PromiseStatus = 'rejected'

  onFulfilledCallbacks: ((result: T) => void)[] = []
  onRejectedCallbacks: ((reason: any) => void)[] = []

  private status = MyPromise.PENDING
  result: T | null = null

  constructor(executor: PromiseExecutor<T>) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
      this.reject(e)
    }
  }

  resolve(value?: T) {
    setTimeout(() => {
      if (this.status === MyPromise.PENDING) {
        this.status = MyPromise.FUFFILED
        this.result = value || null

        this.onFulfilledCallbacks.forEach((cb) => cb(this.result!))
      }
    })
  }

  reject(reason?: any) {
    setTimeout(() => {
      if (this.status === MyPromise.PENDING) {
        this.status = MyPromise.REJECTED
        this.result = reason || null

        this.onRejectedCallbacks.forEach((cb) => cb(this.result))
      }
    })
  }

  then(onFulfilled: (result: T) => void, onRejected?: (reason: any) => void) {
    onFulfilled =
      typeof onFulfilled === 'function'
        ? onFulfilled
        : (value) => {
            return value
          }
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }
    if (this.status === MyPromise.PENDING) {
      this.onFulfilledCallbacks.push(onFulfilled)
      this.onRejectedCallbacks.push(onRejected)
    }

    if (this.status === MyPromise.FUFFILED) {
      setTimeout(() => onFulfilled(this.result!))
    }

    if (this.status === MyPromise.REJECTED) {
      setTimeout(() => onRejected!(this.result))
    }
  }
}
