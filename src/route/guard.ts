import { RouteType } from '../types/main';

export class Guard {
  static guards: Map<string, Guard> = new Map();
  name: string;
  logPromiseOutcomes?: () => boolean;

  constructor(name: string) {
    this.name = name;
  }

  get canLog(): boolean {
    return !!(this.logPromiseOutcomes && typeof this.logPromiseOutcomes === 'function' && this.logPromiseOutcomes());
  }

  getName(): string {
    return this.name;
  }

  promise(context: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.handle(resolve, reject, context);
    });
  }

  logResolution({ from, to }: { from: RouteType; to: RouteType }): void {
    if (this.canLog) {
      console.info(`${this.name}.resolved: ${from.path} → ${to.path}`);
    }
  }

  logRejection({ from, to }: { from: RouteType; to: RouteType }, rejection: any): void {
    if (this.canLog) {
      console.warn(`${this.name}.rejected: ${from.path} → ${to.path} with:`, rejection);
    }
  }

  handle(resolve: () => void, reject: (reason?: any) => void, context: any): void {
    try {
      if (context.isValid) {
        this.logResolution(context.route);
        resolve();
      } else {
        const error = new Error('Invalid context');
        this.logRejection(context.route, error);
        reject(error);
      }
    } catch (error) {
      this.logRejection(context.route, error);
      reject(error);
    }
  }
}
