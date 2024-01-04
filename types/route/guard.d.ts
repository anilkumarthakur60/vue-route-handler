import { RouteType } from "../utils/types";
export declare class Guard {
    static guards: Map<string, Guard>;
    name: string;
    logPromiseOutcomes?: () => boolean;
    constructor(name: string);
    get canLog(): boolean;
    getName(): string;
    promise(context: any): Promise<void>;
    logResolution({ from, to }: {
        from: RouteType;
        to: RouteType;
    }): void;
    logRejection({ from, to }: {
        from: RouteType;
        to: RouteType;
    }, rejection: any): void;
    handle(resolve: () => void, reject: (reason?: any) => void, context: any): void;
}
