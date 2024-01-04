import { trim } from "../utils/common";
import { Factory } from "./factory";
import { Compiler } from "./compiler";
import { Guard } from "./guard";
import type { Component } from 'vue'


export interface RouteMeta {
  [key: string]: any;
}

export interface RouteProps {
  [key: string]: any;
}

export class Route {
  public _path?: string;
  public _components: Record<string, unknown> = {};
  public _redirect?: string;
  public _nameClamp?: string;
  public _prefixClamp?: string;
  public _name?: string;
  public _children: Route[] = [];
  public _guards: Set<Guard> = new Set();
  public _alias?: string;
  public _meta: RouteMeta = {};
  public _props: RouteProps = {};

  constructor(
    path: string,
    view?: string | Component,
    additionalViews?: string,
    redirectTo?: string
  ) {
    this.setDefaults()
    Factory.linkRoute(this)
    this._path = Factory.cleanPath(path)

    if (view) this._components = Factory.resolveComponents(view, additionalViews)
    else this._redirect = redirectTo
  }

  static view(
    {
      path,
      view,
      additionalViews
    }: {
      path: string,
      view: string | Component,
      additionalViews?: string
    }
  ): Route {
    return new this(path, view, additionalViews);
  }

  static redirect(source: string, destination: string): Route {
    return new this(source, destination);
  }

  static dump(): void {
    console.log("Compiled Routes:");
    console.dir(Factory.compile().compiled);
  }

  static group(options: any, callable: () => void): void {
    if (callable) {
      Factory.withinGroup(options, callable || options);
    } else {
      Factory.withinGroup({}, callable || options);
    }
  }

  name(name: string): this {
    this._name = trim(name, Factory.nameSeparator);
    return this;
  }

  alias(alias: string): this {
    this._alias = Factory.cleanPath(alias);
    return this;
  }

  meta(key: string, value: any): this {
    return this.setObject(this._meta, "meta", key, value);
  }

  props(key: string, value: any): this {
    return this.setObject(this._props, "props", key, value);
  }

  prop(key: string, value: any): this {
    return this.props(key, value);
  }

  guard(...guards: string[]): this {
    for (const guard of guards) {
      this._guards.add(Factory.guard(guard));
    }

    return this;
  }

  children(callable: () => void): this {
    return Factory.withChildren(this, callable);
  }

  setDefaults() {
    this._path = undefined;
    this._components = {};
    this._redirect = undefined;
    this._nameClamp = undefined;
    this._prefixClamp = undefined;
    this._name = undefined;
    this._children = [];
    this._guards = new Set();
    this._alias = undefined;
    this._meta = {};
    this._props = {};
  }

  clampName(clampName: string): this {
    const separator = Factory.nameSeparator;

    this._nameClamp = trim(
      [this._nameClamp || undefined, this._name || undefined, clampName]
        .filter((clamp) => clamp !== undefined)
        .join(separator),
      separator
    );

    return this;
  }

  clampPrefix(clampPrefix: string): this {
    this._prefixClamp = Factory.cleanPath(
      [this._prefixClamp || undefined, this._path || undefined, clampPrefix]
        .filter((clamp) => clamp !== undefined)
        .join("/")
    );

    return this;
  }

  compile(nested: boolean): Compiler {
    return <Compiler>new Compiler(this).compile(nested);
  }

  private setObject(
    on: Record<string, any>,
    context: string,
    key: string | Record<string, any>,
    value?: any
  ): this {
    if (key instanceof Object) {
      Object.assign(on, key);
    } else if (value) {
      on[key] = value;
    } else {
      throw `${context} must be passed as key,value or a key-value object.`;
    }

    return this;
  }
}
