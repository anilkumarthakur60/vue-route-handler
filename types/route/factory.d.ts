import { RouteBag } from "./routeBag";
import { Guard } from "./guard";
export declare class Factory {
    static compiled: any[];
    static nameSeparator: string;
    static guards: Map<string, Guard>;
    static childContexts: any[];
    static groupContexts: any[];
    static previousGroupContexts: any[];
    static routeBag?: RouteBag;
    static resolver: (component: any) => any;
    static usingResolver(resolver: (component: any) => any): typeof Factory;
    static withNameSeparator(separator: string): typeof Factory;
    static withGuards(guards: Record<string, typeof Guard>): typeof Factory;
    static resolveComponents(view: any, additionalViews?: any, root?: boolean): any;
    static guard(name: string): Guard;
    static cleanPath(path: string): string;
    static linkRoute(route: any): void;
    static withChildren(route: any, callable: () => void): any;
    static withinGroup(options: any, callable: Function): void;
    static compile(): typeof Factory;
    static flush(): any[];
    static routes(): any[];
    static dump(): void;
}
