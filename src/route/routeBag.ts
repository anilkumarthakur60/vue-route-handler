import { Route } from "./route"

export class RouteBag {
  public routes: Route[]

  constructor() {
    this.routes = []
  }

  pushRoute(route: Route) {
    this.routes.push(route)
  }

  compiled() {
    return this.routes.map(route => route.compile(true))
  }
}
