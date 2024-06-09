import { Compiler } from '../route/compiler'
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

export interface RouteInterface {
  _path?: string
  _components: Record<string, unknown>
  _redirect?: string
  _nameClamp?: string
  _prefixClamp?: string
  _name?: string
  _children: RouteInterface[]
  _guards: Set<Guard>
  _alias?: string
  _meta: RouteMeta
  _props: RouteProps
  name(name: string): this
  alias(alias: string): this
  meta(key: string, value: any): this
  props(key: string, value: any): this
  prop(key: string, value: any): this
  guard(...guards: string[]): this
  children(callable: () => void): this
  setDefaults(): void
  clampName(clampName: string): this
  clampPrefix(clampPrefix: string): this
  compile(nested: boolean): Compiler
}
