import {assertGuard, cleanRouteParam, stringPopulated} from '../utils/common'
import {RouteBag} from "./routeBag";
import {Guard} from "./guard";

export class Factory {

  static compiled: any[] = []
  static nameSeparator: string = '.'
  static guards: Map<string, Guard> = new Map();
  static childContexts: any[] = []
  static groupContexts: any[] = []
  static previousGroupContexts: any[] = []
  static routeBag?: RouteBag

  static resolver: (component: any) => any = (component) => component;

  static usingResolver(resolver: (component: any) => any): typeof Factory {
    this.resolver = resolver;
    return this;
  }

  static withNameSeparator(separator: string): typeof Factory {
    this.nameSeparator = separator;
    return this;
  }


  static withGuards(guards: Record<string, typeof Guard>): typeof Factory {
    for (const [name, guardClass] of Object.entries(guards)) {
      const guard = new guardClass(name);
      assertGuard(guard, 'guard[]');
      this.guards.set(name, guard);
    }

    return this;
  }

  static resolveComponents(
    view: any,
    additionalViews?: any,
    root = true
  ) {
    const defaultComponent = this.resolver(view);
    const additionalComponents: Record<string, any> = {};

    if (additionalViews) {
      for (const viewName in additionalViews as any) {
        additionalComponents[viewName] = this.resolveComponents(
          additionalViews[viewName ],
          undefined,
          false
        );
      }
    }

    return root
      ? Object.assign({default: defaultComponent}, additionalComponents)
      : defaultComponent;
  }


  static guard(name: string): Guard {
    const guard = this.guards.get(name);
    if (!guard) {
      throw new Error(`Guard with name '${name}' not found.`);
    }
    return guard;
  }


  static cleanPath(path: string): string {
    const separator = '/';

    const routePath = path
      .split(separator)
      .filter(stringPopulated)
      .map(cleanRouteParam)
      .join(separator);

    return this.childContexts.length || this.groupContexts.length
      ? routePath
      : separator + routePath;
  }

  static linkRoute(route: any): void {
    if (!this.routeBag) {
      this.routeBag = new RouteBag();
    }

    if (this.groupContexts.length) {
      const clampableName = this.groupContexts
        .map((options) => options.name)
        .join(this.nameSeparator)
        .trim();

      const clampablePrefix = this.groupContexts
        .map((options) => options.prefix)
        .join('/')
        .trim();

      const clampableGuards = this.groupContexts
        .map((options) => {
          const guards = Array.isArray(options.guard)
            ? options.guard
            : Array.of(options.guard);

          return guards.filter((guard: Guard) => guard !== undefined);
        })
        .flat();

      if (clampableName) route.clampName(clampableName);
      if (clampablePrefix) route.clampPrefix(clampablePrefix);
      if (clampableGuards.length) route.guard(...clampableGuards);
    }

    if (this.childContexts.length) {
      route.clampName(
        this.childContexts.map((childRoute) => childRoute._name).join(this.nameSeparator)
      );
      this.childContexts[this.childContexts.length - 1]._children.push(route);
    } else {
      this.routeBag.pushRoute(route);
    }
  }

  static withChildren(route: any, callable: () => void): any {
    this.childContexts.push(route);

    if (this.groupContexts.length) {
      this.previousGroupContexts = Array.from(this.groupContexts);
      this.groupContexts = this.groupContexts.map(({name, guard}) => ({name, guard}));
    }

    callable();

    if (this.previousGroupContexts.length) {
      this.groupContexts = Array.from(this.previousGroupContexts);
    }

    this.childContexts.pop();

    return route;
  }

  static withinGroup(options: any, callable: Function): void {
    this.groupContexts.push(options);
    callable();
    this.groupContexts.pop();
  }

  static compile(): typeof Factory {
    this.compiled = this.routeBag ? this.routeBag.compiled() : [];
    return this;
  }

  static flush(): any[] {
    if (!this.compiled.length) this.compile();

    const compiled = this.compiled;
    this.routeBag = new RouteBag();
    this.compiled = [];

    return compiled;
  }

  static routes(): any[] {
    return this.flush();
  }

  static dump(): void {
    console.log('Route Bag:');
    console.dir(this.routeBag ? this.routeBag.routes : []);
  }
}
