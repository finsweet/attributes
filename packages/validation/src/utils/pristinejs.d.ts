declare module 'pristinejs' {
  export default class Pristine {
    constructor(form: HTMLElement);
    addValidator(element: HTMLElement, fn: (value: string) => boolean, msg: string): void;
    validate(): boolean;
    getErrors(element: HTMLElement): string[];
    destroy(): void;
  }
}
