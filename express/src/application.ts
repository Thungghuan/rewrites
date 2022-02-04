import http from 'http'

const createExpress = (): Application => {
  return new Application()
}

type HTTPRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTION' | 'HEAD'
type RequestDataHandler = {
  [K in HTTPRequestMethod]?: any[]
}

class Application {
  app: http.Server | null = null
  requestDataHandlers: RequestDataHandler = {}

  get(path: string, handler: (req: any, res: any) => void) {
    if (!this.requestDataHandlers['GET']) this.requestDataHandlers['GET'] = []

    this.requestDataHandlers['GET'].push({
      path,
      handler
    })
  }

  listen(port: number, ...args: any[]) {
    this.app = http.createServer((req, res) => {
      this.requestDataHandlers[req.method!.toUpperCase() as HTTPRequestMethod]!
        .filter((handler: any) => handler.path === req.url)
        .map((handler: any) => handler.handler())
    })

    this.app.listen(port, ...args)
  }
}

export default createExpress
