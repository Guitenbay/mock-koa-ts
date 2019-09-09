interface ServerInterface {
  app: any,
  listen(port: number): any,
  mountRouter(): void
}

interface MockServerInterface extends ServerInterface {
  createRouterMap(): void
}

declare let mockServer: MockServerInterface