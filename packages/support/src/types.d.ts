/**
 * Defines the module to enable svg support
 */
declare module '*.svg' {
  const content: string;
  export default content;
}

declare namespace svelte.JSX {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface HTMLAttributes<T> {
    onclick_outside?: () => void;
  }
}

declare const global = any;
