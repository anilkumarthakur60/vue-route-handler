import { Compiler } from "./compiler";
import { Guard } from "./guard";
import type { Component } from 'vue';
export interface RouteMeta {
    [key: string]: any;
}
export interface RouteProps {
    [key: string]: any;
}
export declare class Route {
    _path?: string;
    _components: Record<string, unknown>;
    _redirect?: string;
    _nameClamp?: string;
    _prefixClamp?: string;
    _name?: string;
    _children: Route[];
    _guards: Set<Guard>;
    _alias?: string;
    _meta: RouteMeta;
    _props: RouteProps;
    constructor(path: string, view?: string | Component, additionalViews?: string, redirectTo?: string);
    static view({ path, view, additionalViews }: {
        path: string;
        view: string | Component;
        additionalViews?: string;
    }): Route;
    static redirect(source: string, destination: string): Route;
    static dump(): void;
    static group(options: any, callable: () => void): void;
    name(name: string): this;
    alias(alias: string): this;
    meta(key: string, value: any): this;
    props(key: string, value: any): this;
    prop(key: string, value: any): this;
    guard(...guards: string[]): this;
    children(callable: () => void): this;
    setDefaults(): void;
    clampName(clampName: string): this;
    clampPrefix(clampPrefix: string): this;
    compile(nested: boolean): Compiler;
    private setObject;
}
