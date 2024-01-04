import { Guard } from "../route/guard";

export function typeAssertionError(context: string, expected: string) {
  return new TypeError(`${context} must be of type ${expected}`);
}
export function guardError(reason: string): Error {
  return new Error(`GuardError: ${reason}`);
}

export function assertGuard(instance: any, context: string) {
  if (!(instance instanceof Guard)) throw typeAssertionError(context, "Guard");

  return instance;
}

export function cleanRouteParam(string: string): string {
  return string
    .replace(/\}\{/, "}/{")
    .replace(/\{all\}/, "(.*)")
    .replace(/\(number\)/, "(\\d+)")
    .replace(/\(string\)/, "(\\w+)")
    .replace(/\{(\w+)\}/, ":$1")
    .trim();
}

export function filterObject(object: Record<string, any>, predicate: (value: any) => boolean) {
  let key;
  let filteredObject: Record<string, any> = {};
  for (key in object) {
    if (object.hasOwnProperty(key) && !predicate(object[key])) {
      filteredObject[key] = object[key];
    }
  }

  return filteredObject;
}

export function stringPopulated(string: string): boolean {
  return string.trim() !== "";
}

export function trim(input: string, mask: string = "/") {
  while (~mask.indexOf(input[0])) input = input.slice(1);
  while (~mask.indexOf(input[input.length - 1])) input = input.slice(0, -1);

  return input;
}
