interface Route {
    compile: () => any;
}
export declare class RouteBag {
    routes: Route[];
    constructor();
    pushRoute(route: Route): void;
    compiled(): any[];
}
export {};
