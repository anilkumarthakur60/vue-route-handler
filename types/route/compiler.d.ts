import { Route, RouteMeta, RouteProps } from "./route";
type ContextType = {
    [key: string]: any;
};
type CompilerContext = {
    from: ContextType;
    to: ContextType;
};
type Compiled = {
    components: Record<string, unknown>;
    path: string;
    redirect: string | undefined;
    children: Compiler[];
    name: string | undefined;
    alias: string | undefined;
    meta: RouteMeta | undefined;
    props: RouteProps | undefined;
};
export declare class Compiler {
    route: Route;
    current: any;
    constructor(route: Route);
    compile(nested?: boolean): Record<string, any>;
    components(compiled: Compiled): void;
    compilePath(nested: any): string;
    compileName(): string;
    beforeEnter(compiled: any): void;
    guardChain({ from, to }: CompilerContext): (chain: any, current: any) => any;
    guardResolver(context: CompilerContext, next: Function): Function;
    guardRejector(context: CompilerContext, next: Function): Function;
    compileRejection(rejection: string | (() => string)): string;
}
export {};
