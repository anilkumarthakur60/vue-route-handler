import { Guard } from '../route/guard'

export interface RouteType {
  path: string
}

export interface RouteMeta {
  [key: string]: any
}

export interface RouteProps {
  [key: string]: any
}

export interface GuardContext {
  from: RouteType
  to: RouteType
  isValid: boolean
  route: { from: RouteType; to: RouteType }
}

export interface RouteType {
  name: string
  path: string
}

export interface Compiled {
  components: Record<string, unknown>
  path: string
  redirect?: string
  children: Compiled[]
  name?: string
  alias?: string
  meta?: RouteMeta
  props?: RouteProps
  beforeEnter?: (to: any, from: any, next: any) => void
}

export interface CompilerContext {
  from: RouteType
  to: RouteType
}

export interface RouteOptions {
  name?: string
  prefix?: string
  guard?: Guard | Guard[]
}

export interface RouteGroupCallable {
  (): void
}

export interface RouteComponent {
  [key: string]: any
}
