/**
 * @returns An element's computed height.
 * @param content
 */
export const getElementHeight = (content: HTMLElement) => `${getComputedStyle(content).height}`;
