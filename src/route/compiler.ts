import { RouteInterface, RouteMeta, RouteProps } from '../types/main'
import { filterObject, guardError, trim } from '../utils/general'
import { Factory } from './factory'

type ContextType = {
  [key: string]: any
}

type CompilerContext = {
  from: ContextType
  to: ContextType
}

type Compiled = {
  components: Record<string, unknown>
  path: string
  redirect: string | undefined
  children: Compiler[]
  name: string | undefined
  alias: string | undefined
  meta: RouteMeta | undefined
  props: RouteProps | undefined
}

export class Compiler {
  route: RouteInterface
  current: any

  constructor(route: RouteInterface) {
    this.route = route
  }

  compile(nested = false) {
    const children = this.route._children
    const hasChildren = children.length > 0

    const compiled: Compiled = {
      components: {},
      path: this.compilePath(nested),
      redirect: this.route._redirect,
      children: children.map(child => child.compile(true)),
      name: hasChildren ? undefined : this.compileName(),
      alias: hasChildren ? undefined : this.route._alias,
      meta: hasChildren ? undefined : this.route._meta,
      props: hasChildren ? undefined : this.route._props
    }

    this.components(compiled)

    if (this.route._guards.size > 0) {
      this.beforeEnter(compiled)
    }

    return filterObject(compiled, item =>
      item instanceof Function
        ? false
        : item === undefined || (item instanceof Object && !Object.keys(item).length)
    )
  }

  components(compiled: Compiled) {
    for (const [name, component] of Object.entries(this.route._components)) {
      compiled.components[name] = component
    }
  }

  compilePath(nested: any) {
    const cleanedPath = trim([this.route._prefixClamp, this.route._path].join('/')) || ''
    return nested ? cleanedPath : `/${cleanedPath}`
  }

  compileName() {
    const separator = Factory.nameSeparator
    const compiledName = [this.route._nameClamp, this.route._name].join(separator)

    return trim(compiledName, separator)
  }

  beforeEnter(compiled: any) {
    compiled.beforeEnter = (to: any, from: any, next: any) => {
      Array.from(this.route._guards)
        .reduce(this.guardChain({ from, to }), Promise.resolve())
        .then(this.guardResolver({ from, to }, next))
        .catch(this.guardRejector({ from, to }, next))
    }
  }

  guardChain({ from, to }: CompilerContext) {
    return (chain: any, current: any) => {
      this.current = current
      return chain.then(() => current.promise({ from, to }))
    }
  }

  guardResolver(context: CompilerContext, next: Function): Function {
    return () => {
      this.current.logResolution(context)
      next()
    }
  }

  guardRejector(context: CompilerContext, next: Function): Function {
    return (rejection: any) => {
      this.current.logRejection(context, rejection)

      if (context.to.name == rejection.name || context.to.path === rejection.path) {
        throw guardError('rejection loop detected.')
      }

      rejection =
        rejection === undefined
          ? guardError('rejection handler missing.')
          : this.compileRejection(rejection)

      next(rejection)
    }
  }

  compileRejection(rejection: string | (() => string)) {
    return rejection instanceof Function ? rejection() : rejection
  }
}
