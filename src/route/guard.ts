import {RouteType} from "../utils/types";

export class Guard {

  static guards: Map<string, Guard> = new Map();
  name: string;
  logPromiseOutcomes?: () => boolean;

  constructor(name: string) {
    this.name = name;
  }

  get canLog(): boolean {
    const logMethod = 'logPromiseOutcomes';
    return !!(this[logMethod] && typeof this[logMethod] === 'function' && this[logMethod]());
  }

  getName(): string {
    return this.name;
  }

  promise(context: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.handle(resolve, reject, context);
    });
  }

  logResolution({from, to}: { from: RouteType, to: RouteType }): void {
    this.canLog && console.info(`${this.name}.resolved: ${from.path} → ${to.path}`);
  }

  logRejection({from, to}: { from: RouteType, to: RouteType }, rejection: any): void {
    this.canLog && console.warn(`${this.name}.rejected: ${from.path} → ${to.path} with:`, rejection);
  }


  handle(resolve: () => void, reject: (reason?: any) => void, context: any): void {
    if (this === undefined) {
      console.warn('Guard is undefined. Guards must implement the handle() method.');
      resolve();
    } else {
      console.warn('Guards must implement the handle() method.');
      resolve();
    }
  }

}
