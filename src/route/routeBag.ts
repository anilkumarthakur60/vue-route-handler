interface Route {
  compile: () => any
}

export class RouteBag {
  public routes: Route[]

  constructor() {
    this.routes = []
  }

  pushRoute(route: Route) {
    this.routes.push(route)
  }

  compiled() {
    return this.routes.map(route => route.compile())
  }
}
