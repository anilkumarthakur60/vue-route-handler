import { Guard } from "../route/guard";
export declare function typeAssertionError(context: string, expected: string): TypeError;
export declare function guardError(reason: string): Error;
export declare function assertGuard(instance: any, context: string): Guard;
export declare function cleanRouteParam(string: string): string;
export declare function filterObject(object: Record<string, any>, predicate: (value: any) => boolean): Record<string, any>;
export declare function stringPopulated(string: string): boolean;
export declare function trim(input: string, mask?: string): string;
