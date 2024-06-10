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
  _guards: Set<GuardInterface>
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



export interface GuardInterface {
  promise(context: { from: RouteType; to: RouteType }): Promise<void>;
  logResolution(context: { from: RouteType; to: RouteType }): void;
  logRejection(context: { from: RouteType; to: RouteType }, rejection: any): void;

}

export interface GuardInterface {
  promise(context: GuardContext): Promise<void>;
  logResolution(context: GuardRouteContext): void;
  logRejection(context: GuardRouteContext, rejection: any): void;
}

export interface RouteType {
  path: string;
  name?: string;
  [key: string]: any;
}


export interface GuardRouteContext {
  from: RouteType;
  to: RouteType;
}


export interface RouteInterface {
  _path?: string;
  _components: Record<string, unknown>;
  _redirect?: string;
  _nameClamp?: string;
  _prefixClamp?: string;
  _name?: string;
  _children: RouteInterface[];
  _guards: Set<Guard>;
  _alias?: string;
  _meta: RouteMeta;
  _props: RouteProps;
  name(name: string): this;
  alias(alias: string): this;
  meta(key: string, value: any): this;
  props(key: string, value: any): this;
  prop(key: string, value: any): this;
  guard(...guards: Guard[]): this;
  children(callable: () => void): this;
  setDefaults(): void;
  clampName(clampName: string): this;
  clampPrefix(clampPrefix: string): this;
  compile(nested: boolean): Compiler;
}

export type ContextType = {
  [key: string]: any;
};

export type CompilerContext = {
  from: ContextType;
  to: ContextType;
};

export type Compiled = {
  components: Record<string, unknown>;
  path: string;
  redirect: string | undefined;
  children: Compiler[];
  name: string | undefined;
  alias: string | undefined;
  meta: RouteMeta | undefined;
  props: RouteProps | undefined;
};

export interface GuardInterface {
  promise(context: GuardContext): Promise<void>;
  logResolution(context: GuardRouteContext): void;
  logRejection(context: GuardRouteContext, rejection: any): void;
}

export interface GuardContext {
  from: RouteType;
  to: RouteType;
  isValid?: boolean;
  route: { from: RouteType; to: RouteType };
}

export interface GuardRouteContext {
  from: RouteType;
  to: RouteType;
}