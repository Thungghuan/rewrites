import http from 'http'

const createExpress = (): Application => {
  return new Application()
}

class Application {
  app: http.Server

  listen(port: number, ...args: any[]) {
    this.app = http.createServer()

    this.app.listen(port, ...args)
  }
}

export default createExpress
