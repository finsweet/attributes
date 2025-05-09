import type { FinsweetAttributeKey } from '../types';

/**
 * @returns Awaitable promise for waiting X time.
 * @param time
 */
export const wait = (time: number): Promise<unknown> => new Promise((resolve) => setTimeout(resolve, time));

/**
 * Waits for the defined Attribute to be fully loaded.
 * @param key The Attribute key.
 */
export const waitAttributeLoaded = (key: FinsweetAttributeKey) => window.FinsweetAttributes.modules[key]?.loading;

/**
 * @returns A promise that resolves once Webflow has fully loaded.
 */
export const waitWebflowReady = async () => {
  return new Promise((resolve) => {
    window.Webflow ||= [];
    window.Webflow.push(resolve);
  });
};

/**
 * @returns A promise that resolves once the DOM is ready.
 */
export const waitDOMReady = async () => {
  return new Promise((resolve) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', resolve);
    } else {
      resolve(undefined);
    }
  });
};
