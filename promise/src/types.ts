export type PromiseStatus = 'pending' | 'fulfilled' | 'rejected'

export interface PromiseExecutor<T = unknown> {
  (resolve: (value?: T) => void, reject: (reason?: any) => void): void
}
